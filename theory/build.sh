#!/bin/bash
# Builds the theory part of the JURIX 2026 tutorial from its Markdown, with Marp (marp.app).
# For each deck (slides-underground.md, slides-nationality.md):
#   <deck>.html           — to present in a browser (press P for the presenter view with the notes)
#   <deck>.pdf            — the deck as PDF, with the speaker notes as PDF comments
#   <deck>.pptx           — PowerPoint, exactly as the PDF looks: each slide is a picture, the notes are kept
#   <deck>-editable.pptx  — PowerPoint with real text boxes that can be edited (tools/md2pptx.cjs)
# Usage:
#   ./build.sh                      all decks, all formats
#   ./build.sh slides-underground   one deck
#   ./build.sh --timelines [...]    first draw the timelines again, by running the programs
#                                   (needs LPS2 and LogicalEnglish2: LPS2_DIR, LE2_DIR)
# Needs node. The first run fetches the Marp command line and pptxgenjs with npx/npm.
# Marp needs a Chromium-based browser for the PDF and the PowerPoint; set CHROME_PATH if it finds none.
# Input is closed (</dev/null): Marp otherwise waits for a deck on its input when run from a script.
set -e
cd "$(dirname "$0")"
if [ -z "$CHROME_PATH" ]; then
    for c in /work/editor/node_modules/playwright-core/.local-browsers/chromium-*/chrome-linux64/chrome \
             "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"; do
        [ -x "$c" ] && export CHROME_PATH="$c" && break
    done
fi
if [ "$1" = "--timelines" ]; then
    python3 tools/timeline.py programs/underground_lps.le > images/timeline-underground.svg
    python3 tools/timeline.py programs/underground_lps.le --scenario "improper use" > images/timeline-underground-improper.svg
    python3 tools/timeline.py programs/nationality_lps.le > images/timeline-nationality.svg
    shift
fi
DECKS="${@:-slides-underground slides-nationality}"
MARP="npx --yes @marp-team/marp-cli@4"
OPTS="--theme theme/jurix-theory.css --html --allow-local-files"
[ -d tools/node_modules/pptxgenjs ] || (cd tools && npm install --silent --no-audit --no-fund)
for d in $DECKS; do
    d="${d%.md}"
    $MARP $OPTS "$d.md" -o "$d.html" </dev/null
    $MARP $OPTS --pdf --pdf-notes "$d.md" -o "$d.pdf" </dev/null
    $MARP $OPTS --pptx "$d.md" -o "$d.pptx" </dev/null
    node tools/md2pptx.cjs "$d.md" "$d-editable.pptx"
    echo "Built: $d.html $d.pdf $d.pptx $d-editable.pptx"
done
