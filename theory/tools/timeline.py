#!/usr/bin/env python3
"""Draws the timeline of one run of a Logical English for LPS program, as SVG.

    tools/timeline.py programs/underground_lps.le [--scenario NAME] > images/x.svg

Runs the program with the LPS2 command line (LPS2_DIR, default /lps2; it reads
Logical English with the LogicalEnglish2 checkout at LE2_DIR, default /work),
reads the states and events that the run prints, and draws one bar for each
fluent (a fact that changes over time) and one dot for each event or action.
"""
import os, re, subprocess, sys
from html import escape

NAVY, AMBER, INK, MUTED, GRID = '#233e73', '#c77d0a', '#1d2433', '#5b6475', '#d9dfeb'
PREPS = {'of', 'to', 'in', 'at', 'on', 'by', 'for', 'with', 'from'}


def split_top(s):
    """Splits 'a,b(c,d),e' at the commas that are not inside brackets."""
    out, depth, cur = [], 0, ''
    for ch in s:
        if ch == '(':
            depth += 1
        elif ch == ')':
            depth -= 1
        if ch == ',' and depth == 0:
            out.append(cur)
            cur = ''
        else:
            cur += ch
    if cur.strip():
        out.append(cur)
    return [x.strip() for x in out]


def english(term):
    """is_on_the_train(alice) -> 'alice is on the train';
    pays_a_penalty_of(bob,50) -> 'bob pays a penalty of 50'."""
    m = re.match(r"^'?([^('\s]+)'?(?:\((.*)\))?$", term)
    if not m:
        return term
    words = m.group(1).split('_')
    args = split_top(m.group(2)) if m.group(2) else []
    if not args:
        return ' '.join(words)
    if words[-1] in PREPS:
        last, rest = args[-1], args[:-1]
        if rest:
            return ' '.join(rest[:1] + words + [last])
        if words[0] == 'the':                  # 'the Secretary of State registers the declaration of' john
            return ' '.join(words + [last])
        return ' '.join(words + [last])
    return ' '.join(args[:1] + words + args[1:])


def run(program, scenario):
    lps2 = os.environ.get('LPS2_DIR', '/lps2')
    env = dict(os.environ, LPS_LE2_LIB=os.environ.get('LE2_DIR', '/work'))
    cmd = [os.path.join(lps2, 'lps'), 'run', program]
    if scenario:
        cmd += ['--scenario', scenario]
    out = subprocess.run(cmd, env=env, capture_output=True, text=True).stdout
    states, events = {}, {}
    for line in out.splitlines():
        m = re.match(r'^(fluents|events)/(\d+)\s+\[(.*)\]\s*$', line)
        if m:
            (states if m.group(1) == 'fluents' else events)[int(m.group(2))] = split_top(m.group(3))
    if not states:
        sys.exit('no run: ' + out)
    return states, events


def svg(states, events):
    last = max(states)
    fluents = []
    for n in sorted(states):
        for f in states[n]:
            if f not in fluents:
                fluents.append(f)
    happenings = []
    for n in sorted(events):
        for e in events[n]:
            happenings.append((n, e))
    longest = max(len(english(t)) for t in fluents + [e for _, e in happenings])
    left, right, top, row = int(longest * 10.6) + 40, 40, 48, 38
    width = 1160
    step = (width - left - right) / last
    x = lambda t: left + t * step
    height = top + row * (len(fluents) + len(happenings)) + 40
    o = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" '
         f'font-family="Helvetica, Arial, sans-serif" font-size="22">']
    for t in range(last + 1):
        o.append(f'<line x1="{x(t):.0f}" y1="{top - 8}" x2="{x(t):.0f}" y2="{height - 34}" stroke="{GRID}" stroke-width="1.5"/>')
        o.append(f'<text x="{x(t):.0f}" y="{top - 16}" text-anchor="middle" fill="{MUTED}" font-size="19">{t}</text>')
    y = top
    for f in fluents:
        o.append(f'<text x="{left - 16}" y="{y + 24}" text-anchor="end" fill="{INK}">{escape(english(f))}</text>')
        t = 0
        while t <= last:
            if f in states.get(t, []):
                t0 = t
                while t + 1 <= last and f in states.get(t + 1, []):
                    t += 1
                x0, x1 = x(t0), x(t) if t > t0 else x(t0) + 10
                o.append(f'<rect x="{x0:.0f}" y="{y + 9}" width="{x1 - x0:.0f}" height="18" rx="9" fill="{NAVY}"/>')
            t += 1
        y += row
    o.append(f'<line x1="20" y1="{y + 2}" x2="{width - 20}" y2="{y + 2}" stroke="{GRID}" stroke-width="1.5"/>')
    for n, e in happenings:
        cx = x(n - 0.5)
        o.append(f'<text x="{left - 16}" y="{y + 24}" text-anchor="end" fill="{AMBER}" font-weight="600">{escape(english(e))}</text>')
        o.append(f'<circle cx="{cx:.0f}" cy="{y + 17}" r="9" fill="{AMBER}"/>')
        y += row
    ly = height - 10
    o.append(f'<rect x="{left}" y="{ly - 13}" width="34" height="12" rx="6" fill="{NAVY}"/>'
             f'<text x="{left + 44}" y="{ly}" fill="{MUTED}" font-size="18">a fluent holds</text>'
             f'<circle cx="{left + 220}" cy="{ly - 6}" r="7" fill="{AMBER}"/>'
             f'<text x="{left + 234}" y="{ly}" fill="{MUTED}" font-size="18">an event or an action happens</text>')
    o.append('</svg>')
    return '\n'.join(o)


if __name__ == '__main__':
    args = sys.argv[1:]
    scenario = None
    if '--scenario' in args:
        i = args.index('--scenario')
        scenario = args[i + 1]
        del args[i:i + 2]
    print(svg(*run(args[0], scenario)))
