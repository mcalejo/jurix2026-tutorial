#!/usr/bin/env node
/* md2pptx.cjs — an editable PowerPoint from a deck of the theory part.
 *
 *     node tools/md2pptx.cjs slides-underground.md slides-underground-editable.pptx
 *
 * Marp's own PowerPoint export makes one picture for each slide. This script
 * makes real text boxes, so that the speaker can change the words in
 * PowerPoint. It reads only the Markdown that the two decks use:
 *
 *   ---                        a new slide
 *   <!-- _class: title -->     the kind of slide: title, divider
 *   # heading   ### label      the title of the slide; a small label
 *   a paragraph, - a bullet, 1. a numbered step, with **bold**, *italic*, `code`
 *   ``` … ```                  program text
 *   > quoted text              the source text, in a box
 *   | a | table |
 *   ![w:1100](images/x.svg)    a picture
 *   <div class="cols"><div> … </div><div> … </div></div>    two columns
 *   <div class="big">, <div class="code18">                 a size for what is inside
 *   <!-- the last comment of a slide -->                    the speaker notes
 *
 * The look follows theme/jurix-theory.css, with fonts that every computer has.
 * The positions are computed from the length of the text, so check the result
 * in PowerPoint after a large change to a slide.
 */
const fs = require('fs');
const path = require('path');
const pptxgen = require('pptxgenjs');
const sharp = require('sharp');

const NAVY = '233E73', SOFT = 'E8EDF6', AMBER = 'C77D0A', INK = '1D2433', MUTED = '5B6475';
const CODE_BG = 'F6F8FC', QUOTE_BG = 'FDF6EA', LINE = 'D9DFEB';
const BODY_FONT = 'Calibri', CODE_FONT = 'Courier New';
const W = 1280, H = 720, PAD_X = 72, PAD_TOP = 50, BOTTOM = 656;
const inch = (px) => px / 96;
const pt = (px) => px * 0.75;

// ---------- reading the Markdown ----------

function inline(text, base) {
    // **bold**, *italic*, `code` -> runs of text for PowerPoint
    const runs = [];
    const re = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g;
    let last = 0, m;
    const push = (t, extra) => { if (t) runs.push({ text: t, options: Object.assign({}, base, extra) }); };
    while ((m = re.exec(text))) {
        push(text.slice(last, m.index), {});
        const tok = m[0];
        if (tok.startsWith('**')) push(tok.slice(2, -2), { bold: true, color: base.strongColor || NAVY });
        else if (tok.startsWith('`')) push(tok.slice(1, -1), { fontFace: CODE_FONT, color: NAVY });
        else push(tok.slice(1, -1), { italic: true });
        last = m.index + tok.length;
    }
    push(text.slice(last), {});
    runs.forEach((r) => delete r.options.strongColor);
    return runs.length ? runs : [{ text: '', options: base }];
}
const plain = (text) => text.replace(/\*\*|`/g, '').replace(/\*([^*]+)\*/g, '$1');

function parseBlocks(lines) {
    // Returns a list of blocks; a "cols" block holds a list of columns, each a list of blocks.
    const blocks = [];
    const flags = [];           // the classes of the open <div>s
    let i = 0;
    const cur = () => ({ big: flags.includes('big'), code18: flags.includes('code18'), small: flags.includes('small') });
    while (i < lines.length) {
        const line = lines[i];
        const t = line.trim();
        if (!t) { i++; continue; }
        let m;
        if ((m = t.match(/^<div class="cols[^"]*">$/))) {
            // collect the columns up to the matching </div>
            const cols = []; let depth = 1, buf = null; i++;
            while (i < lines.length && depth > 0) {
                const s = lines[i].trim();
                if (/^<div/.test(s)) { depth++; if (depth === 2) { buf = []; i++; continue; } }
                if (s === '</div>') { depth--; if (depth === 1) { cols.push(parseBlocks(buf)); buf = null; i++; continue; } if (depth === 0) { i++; break; } }
                if (buf) buf.push(lines[i]);
                i++;
            }
            blocks.push({ type: 'cols', cols });
            continue;
        }
        if ((m = t.match(/^<div class="([^"]*)">$/))) { flags.push(m[1]); i++; continue; }
        if (t === '</div>') { flags.pop(); i++; continue; }
        if (t.startsWith('```')) {
            const code = []; i++;
            while (i < lines.length && !lines[i].trim().startsWith('```')) code.push(lines[i++]);
            i++;
            blocks.push(Object.assign({ type: 'code', lines: code }, cur()));
            continue;
        }
        if ((m = t.match(/^(#{1,3}) (.*)$/))) { blocks.push({ type: 'h' + m[1].length, text: m[2] }); i++; continue; }
        if (t.startsWith('>')) {
            const paras = [];
            while (i < lines.length && lines[i].trim().startsWith('>')) {
                const q = lines[i].trim().replace(/^>\s?/, '');
                if (q) paras.push(q);
                i++;
            }
            blocks.push({ type: 'quote', paras });
            continue;
        }
        if (t.startsWith('|')) {
            const rows = [];
            while (i < lines.length && lines[i].trim().startsWith('|')) {
                const cells = lines[i].trim().replace(/^\||\|$/g, '').split('|').map((c) => c.trim());
                if (!cells.every((c) => /^-+$/.test(c))) rows.push(cells);
                i++;
            }
            blocks.push({ type: 'table', rows });
            continue;
        }
        if ((m = t.match(/^!\[(?:w:(\d+))?[^\]]*\]\(([^)]+)\)$/))) { blocks.push({ type: 'image', width: m[1] ? +m[1] : null, src: m[2] }); i++; continue; }
        if (/^(- |\d+\. )/.test(t)) {
            const items = []; const ordered = /^\d+\. /.test(t);
            while (i < lines.length && /^(- |\d+\. )/.test(lines[i].trim())) { items.push(lines[i].trim().replace(/^(- |\d+\. )/, '')); i++; }
            blocks.push(Object.assign({ type: 'list', items, ordered }, cur()));
            continue;
        }
        if (t.startsWith('<')) { i++; continue; }      // any other HTML: ignored
        // a paragraph: the lines up to an empty line; a line break inside stays a line break
        const para = [];
        while (i < lines.length && lines[i].trim() && !/^(#|>|\||```|- |\d+\. |<|!\[)/.test(lines[i].trim())) para.push(lines[i++].trim());
        blocks.push(Object.assign({ type: 'p', lines: para }, cur()));
    }
    return blocks;
}

function parseDeck(md) {
    md = md.replace(/\r/g, '');
    let footer = '';
    const fm = md.match(/^---\n([\s\S]*?)\n---\n/);
    if (fm) {
        const f = fm[1].match(/^footer:\s*'?(.*?)'?\s*$/m);
        if (f) footer = f[1];
        md = md.slice(fm[0].length);
    }
    return md.split(/\n---\n/).map((chunk) => {
        const slide = { cls: '', footer, paginate: true, notes: '' };
        chunk = chunk.replace(/<!--([\s\S]*?)-->/g, (all, body) => {
            const d = body.trim().match(/^_(\w+):\s*(.*)$/);
            if (d) {
                if (d[1] === 'class') slide.cls = d[2];
                if (d[1] === 'paginate') slide.paginate = d[2] !== 'false';
                if (d[1] === 'footer') slide.footer = d[2].replace(/^'|'$/g, '');
            } else slide.notes = body.trim();
            return '';
        });
        slide.blocks = parseBlocks(chunk.split('\n'));
        return slide;
    });
}

// ---------- measuring ----------

const textLines = (chars, fontPx, widthPx, factor = 0.47) => Math.max(1, Math.ceil((chars * fontPx * factor) / widthPx));

function sizes(block, width, scale, inCols) {
    // The font size (px) and the height (px) that a block needs in a column of the given width.
    const s = scale;
    switch (block.type) {
        case 'h1': { const f = 44 * s; return { f, h: textLines(plain(block.text).length, f, width, 0.52) * f * 1.2 + 26 }; }
        case 'h2': { const f = 30 * s; return { f, h: f * 1.3 + 10 }; }
        case 'h3': { const f = 21 * s; return { f, h: f * 1.3 + 8 }; }
        case 'p': {
            const f = (block.big ? 34 : 27) * s;
            const n = block.lines.reduce((a, l) => a + textLines(plain(l).length, f, width), 0);
            return { f, h: n * f * 1.4 + 12 };
        }
        case 'list': {
            const f = (block.big ? 32 : 27) * s;
            const n = block.items.reduce((a, l) => a + textLines(plain(l).length, f, width - 40), 0);
            return { f, h: n * f * 1.38 + block.items.length * 6 + 10 };
        }
        case 'code': {
            const longest = Math.max(...block.lines.map((l) => l.length), 1);
            const want = (block.code18 ? 18 : inCols ? 19 : 22) * s;
            const f = Math.min(want, (width - 40) / (longest * 0.61));
            return { f, h: block.lines.length * f * 1.3 + 30 };
        }
        case 'quote': {
            const f = 26 * s;
            const n = block.paras.reduce((a, l) => a + textLines(plain(l).length, f, width - 40), 0);
            return { f, h: n * f * 1.4 + block.paras.length * 8 + 22 };
        }
        case 'table': { const f = 21 * s; return { f, h: block.rows.length * (f * 1.3 + 14) + 12 }; }
        case 'image': { const w = Math.min(block.width || width, width) * (s < 1 ? s : 1); return { f: 0, w, h: w * block.ratio + 12 }; }
        case 'cols': {
            const cw = (width - 36) / 2;
            return { f: 0, h: Math.max(...block.cols.map((col) => col.reduce((a, b) => a + sizes(b, cw, s, true).h, 0))) };
        }
    }
    return { f: 0, h: 0 };
}

// ---------- drawing ----------

function draw(slide, block, x, y, width, scale, inCols) {
    const { f, h, w } = sizes(block, width, scale, inCols);
    const box = (bh) => ({ x: inch(x), y: inch(y), w: inch(width), h: inch(bh), margin: 0, valign: 'top', fontFace: BODY_FONT });
    switch (block.type) {
        case 'h1':
            slide.addText(inline(block.text, { color: NAVY, bold: true, strongColor: NAVY }), Object.assign(box(h - 22), { fontSize: pt(f) }));
            if (!block.plain) slide.addShape('line', { x: inch(x), y: inch(y + h - 16), w: inch(width), h: 0, line: { color: SOFT, width: 2.25 } });
            break;
        case 'h2':
            slide.addText(inline(block.text, { color: MUTED }), Object.assign(box(h), { fontSize: pt(f) }));
            break;
        case 'h3':
            slide.addText(plain(block.text).toUpperCase(), Object.assign(box(h), { fontSize: pt(f), color: AMBER, bold: true, charSpacing: 1 }));
            break;
        case 'p': {
            const runs = [];
            block.lines.forEach((l, k) => { const r = inline(l, { color: INK }); if (k < block.lines.length - 1) r[r.length - 1].options.breakLine = true; runs.push(...r); });
            slide.addText(runs, Object.assign(box(h), { fontSize: pt(f) }));
            break;
        }
        case 'list': {
            const runs = [];
            block.items.forEach((item) => {
                const r = inline(item, { color: INK });
                // every run of the item carries the bullet: PowerPoint takes it from the paragraph
                r[0].options.bullet = block.ordered ? { type: 'number' } : true;
                r[r.length - 1].options.breakLine = true;
                runs.push(...r);
            });
            slide.addText(runs, Object.assign(box(h), { fontSize: pt(f), paraSpaceAfter: 5 }));
            break;
        }
        case 'code':
            slide.addShape('rect', { x: inch(x), y: inch(y), w: inch(width), h: inch(h - 12), fill: { color: CODE_BG }, line: { color: CODE_BG, width: 0 } });
            slide.addShape('rect', { x: inch(x), y: inch(y), w: inch(5), h: inch(h - 12), fill: { color: NAVY }, line: { color: NAVY, width: 0 } });
            slide.addText(block.lines.join('\n'), { x: inch(x + 20), y: inch(y + 8), w: inch(width - 28), h: inch(h - 28), margin: 0, valign: 'top',
                fontFace: CODE_FONT, fontSize: pt(f), color: INK, wrap: false });
            break;
        case 'quote': {
            slide.addShape('rect', { x: inch(x), y: inch(y), w: inch(width), h: inch(h - 12), fill: { color: QUOTE_BG }, line: { color: QUOTE_BG, width: 0 } });
            slide.addShape('rect', { x: inch(x), y: inch(y), w: inch(5), h: inch(h - 12), fill: { color: AMBER }, line: { color: AMBER, width: 0 } });
            const runs = [];
            block.paras.forEach((p2, k) => { const r = inline(p2, { color: INK }); if (k < block.paras.length - 1) r[r.length - 1].options.breakLine = true; runs.push(...r); });
            slide.addText(runs, { x: inch(x + 20), y: inch(y + 6), w: inch(width - 36), h: inch(h - 24), margin: 0, valign: 'top',
                fontFace: BODY_FONT, fontSize: pt(f), paraSpaceAfter: 6 });
            break;
        }
        case 'table': {
            const rows = block.rows.map((row, r) => row.map((c) => ({ text: plain(c), options: r === 0
                ? { bold: true, color: 'FFFFFF', fill: { color: NAVY }, align: 'center' }
                : { color: INK, fill: { color: r % 2 === 0 ? CODE_BG : 'FFFFFF' } } })));
            slide.addTable(rows, { x: inch(x), y: inch(y), w: inch(width), fontFace: BODY_FONT, fontSize: pt(f),
                border: { type: 'solid', color: LINE, pt: 0.75 }, margin: 0.06 });
            break;
        }
        case 'image':
            slide.addImage({ path: block.png, x: inch(x + (width - w) / 2), y: inch(y), w: inch(w), h: inch(w * block.ratio) });
            break;
        case 'cols': {
            const cw = (width - 36) / 2;
            block.cols.forEach((col, k) => {
                let cy = y;
                col.forEach((b) => { cy += draw(slide, b, x + k * (cw + 36), cy, cw, scale, true); });
            });
            break;
        }
    }
    return h;
}

async function prepareImages(blocks, dir, tmp) {
    // PowerPoint shows a PNG everywhere; a drawing in SVG becomes one here.
    for (const b of blocks) {
        if (b.type === 'cols') for (const col of b.cols) await prepareImages(col, dir, tmp);
        if (b.type !== 'image') continue;
        const src = path.resolve(dir, b.src);
        const meta = await sharp(src).metadata();
        b.ratio = meta.height / meta.width;
        if (/\.svg$/i.test(src)) {
            b.png = path.join(tmp, path.basename(src).replace(/\.svg$/i, '.png'));
            await sharp(src, { density: 220 }).png().toFile(b.png);
        } else b.png = src;
    }
}

(async () => {
    const [,, input, output] = process.argv;
    if (!input || !output) { console.error('usage: md2pptx.cjs deck.md deck.pptx'); process.exit(2); }
    const dir = path.dirname(path.resolve(input));
    const tmp = fs.mkdtempSync(path.join(require('os').tmpdir(), 'md2pptx-'));
    const deck = parseDeck(fs.readFileSync(input, 'utf8'));
    const pptx = new pptxgen();
    pptx.layout = 'LAYOUT_WIDE';            // 13.33 x 7.5 inches = 1280 x 720 px
    const title = (fs.readFileSync(input, 'utf8').match(/^title:\s*(.*)$/m) || [])[1];
    const author = (fs.readFileSync(input, 'utf8').match(/^author:\s*(.*)$/m) || [])[1];
    if (title) pptx.title = title;
    if (author) pptx.author = author;
    const width = W - 2 * PAD_X;
    let n = 0;
    for (const s of deck) {
        n++;
        await prepareImages(s.blocks, dir, tmp);
        const slide = pptx.addSlide();
        const centred = s.cls === 'title' || s.cls === 'divider';
        slide.background = { color: s.cls === 'divider' ? SOFT : 'FFFFFF' };
        // make the text smaller, step by step, until the slide fits
        let scale = centred ? 1.2 : 1;
        const total = (sc) => s.blocks.reduce((a, b) => a + sizes(b, width, sc, false).h, 0);
        while (PAD_TOP + total(scale) > BOTTOM && scale > 0.6) scale -= 0.04;
        if (scale < 0.999 && !centred) console.log(`  slide ${n}: text at ${Math.round(scale * 100)}% to fit`);
        if (centred) s.blocks.forEach((b) => { if (b.type === 'h1') b.plain = true; });
        let y = centred ? Math.max(PAD_TOP, (H - total(scale)) / 2) : PAD_TOP;
        for (const b of s.blocks) y += draw(slide, b, PAD_X, y, width, scale, false);
        if (s.footer) slide.addText(s.footer, { x: inch(PAD_X), y: inch(H - 40), w: inch(900), h: inch(22), margin: 0, fontFace: BODY_FONT, fontSize: 10.5, color: MUTED });
        if (s.paginate) slide.slideNumber = { x: inch(W - 110), y: inch(H - 40), w: inch(60), h: inch(22), fontFace: BODY_FONT, fontSize: 11, color: MUTED, align: 'right' };
        if (s.notes) slide.addNotes(s.notes);
    }
    // The library writes paragraph properties before every run of text. The file
    // format allows them once, at the start of a paragraph: PowerPoint could ask
    // to repair the file. Keep the first of each paragraph, and drop the others.
    const JSZip = require('jszip');
    const zip = await JSZip.loadAsync(await pptx.write({ outputType: 'nodebuffer' }));
    for (const name of Object.keys(zip.files).filter((f) => /^ppt\/(slides|notesSlides)\/[^/]+\.xml$/.test(f))) {
        const xml = await zip.file(name).async('string');
        zip.file(name, xml.replace(/<a:p>[\s\S]*?<\/a:p>/g, (para) => {
            let seen = false;
            return para.replace(/<a:pPr(?:\s[^>]*)?(?:\/>|>[\s\S]*?<\/a:pPr>)/g, (props) => (seen ? '' : ((seen = true), props)));
        }));
    }
    fs.writeFileSync(output, await zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' }));
    console.log(`  ${output}: ${deck.length} slides`);
})().catch((e) => { console.error(e); process.exit(1); });
