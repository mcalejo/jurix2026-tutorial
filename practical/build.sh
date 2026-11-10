#!/bin/bash
# Builds Miguel's practical part of the JURIX 2026 tutorial from slides.md with Marp (marp.app):
#   slides.html  — the deck, to present in a browser (press P for presenter view with notes)
#   slides.pdf   — the deck as PDF, with the speaker notes as PDF comments
#   slides.pptx  — only with --pptx (pictures of the slides; the text cannot be edited)
#   images/qr-*.svg — the QR codes, made again from qr.tsv with --qr
# Input is closed (</dev/null): Marp otherwise waits for a deck on its input when run from a script.
# Needs node; the Marp command line is fetched by npx the first time.
# Marp needs a Chromium-based browser for the PDF; set CHROME_PATH if it does not find one.
set -e
cd "$(dirname "$0")"
if [ -z "$CHROME_PATH" ]; then
    for c in /work/editor/node_modules/playwright-core/.local-browsers/chromium-*/chrome-linux64/chrome \
             "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"; do
        [ -x "$c" ] && export CHROME_PATH="$c" && break
    done
fi
if [ "$1" = "--qr" ]; then
    # qr.tsv: name <TAB> URL  →  images/qr-<name>.svg, in the navy of the theme
    while IFS=$'\t' read -r name url; do
        [ -z "$name" ] || [ "${name#\#}" != "$name" ] && continue
        npx --yes qrcode@1 -t svg -d 233e73 -l ffffff -o "images/qr-$name.svg" "$url" </dev/null
    done < qr.tsv
    shift
fi
MARP="npx --yes @marp-team/marp-cli@4"
OPTS="--theme theme/jurix-practical.css --html --allow-local-files"

$MARP $OPTS slides.md -o slides.html </dev/null
$MARP $OPTS --pdf --pdf-notes slides.md -o slides.pdf </dev/null
if [ "$1" = "--pptx" ]; then
    $MARP $OPTS --pptx slides.md -o slides.pptx </dev/null
fi
echo "Built: slides.html slides.pdf $([ "$1" = "--pptx" ] && echo slides.pptx)"
