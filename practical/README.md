# The practical part: a tour, writing rules, hands-on

*Kind: talk materials · Speaker: Miguel Calejo · Length: 45 minutes · Status: first draft, 10 November 2026, not rehearsed*

Miguel's three topics of the JURIX 2026 tutorial (see `../README.md`):
"A tour of sixteen rule languages, in five families", "Writing rules from
ordinary language", and "Hands-on".

| Time | Part | Slides |
|---|---|---|
| 0:00 | Title, and the QR code of the lab page (the room opens it now) | 1–2 |
| 0:01 | **The tour**: one slide per family, then a live demo (a LegalRuleML twin in LE2, the Drools fire alarm in LPS2) | 3–12 |
| 0:15 | **Writing rules from ordinary language**: propose, check, decide; live demo with EU 261 Article 7(1), in English and in French; the five languages | 13–17 |
| 0:25 | **Hands-on**: three exercises, 20 minutes, the exercises slide stays on the screen | 18–19 |
| 0:45 | What to take home; hand over to the limitations and discussion | 20 |

## Files

| File | What it is |
|---|---|
| `slides.md` | The slides, for Marp (marp.app). The speaker notes, with the clock, are HTML comments |
| `slides.html`, `slides.pdf` | The built slides. Run `./build.sh` after a change |
| `build.sh` | Builds the HTML and the PDF (with the notes as PDF comments); `--pptx` adds a PowerPoint of pictures; `--qr` first makes the QR codes again from `qr.tsv` |
| `qr.tsv` | The address behind each QR code in `images/` |
| `theme/jurix-practical.css` | The look: the theme of our talks and videos (`le-talk.css` of the Ulster talk), without the corner kept free for a remote speaker's camera |
| `images/` | The Logical Contracts logo, and the QR codes |
| `demos/tour_demo.md` | The script of the tour's demo |
| `demos/writing_demo.md` | The script of the drafting demo, with the English and French texts of Article 7(1) |
| `lab/index.html` | The page for the students: the three exercises, with links that open each example, and the answers. One file, no other files needed |

To present: open `slides.html` in a browser, press **F** for full screen and
**P** for the presenter view with the notes. To edit with a live preview: the
"Marp for VS Code" extension, with `theme/jurix-practical.css` in its setting
`markdown.marp.themes`.

## Before the day

1. **Publish the lab page** and put its address in two places: the row `lab`
   of `qr.tsv`, and `LAB_URL` on slide 2. Then run `./build.sh --qr`. The row
   now assumes GitHub Pages of this repository
   (`https://mcalejo.github.io/jurix2026-tutorial/practical/lab/`), which
   needs the repository to be public and Pages to be switched on.
2. **The workshop account.** Opening one's own `.lrml` or `.drl` file
   (File ▸ Open…) needs the Logical English Translators licence on both
   public servers. Without it, the three exercises still work: they use the
   published twins and File ▸ Show the Original…. For the "More" item of the
   lab page, add a shared workshop account (or the attendees' emails) to
   `lpsPlus/accounts/licenses.csv`, and check that the servers read it
   without a new image.
3. **Confirm the numbers** marked "TO CONFIRM" in the notes of slides 6, 7
   and 8 (s(CASP), OpenFisca and PolicyEngine, Oracle Intelligent Advisor):
   the gallery (`docs/user/integrations/gallery.md` in LogicalEnglish2) and
   the roadmap of lpsPlus give different totals.
4. **Rehearse both demos**, save `demos/eu261_drafted.le` and
   `demos/eu261_drafted_fr.le`, and take screenshots of each step of the tour
   demo into `demos/shots/` as the fallback.
5. Check on the public servers (not only locally) that the links of the lab
   page open the right example on the right scenario and query.

## What was checked

- Exercise 3 (10 November 2026, on the local LE2 checkout): the twin passes
  all its tests; with the last condition of rule `ps1` deleted, 5 tests fail,
  all in scenario `licensed_trader`, and the other 3 scenarios pass.
- The excerpts on the family slides are copied from the twins and their
  `sources/` in LogicalEnglish2, LPS2 and lpsPlus.
- Not yet checked: the demos, the public links, the timing.
