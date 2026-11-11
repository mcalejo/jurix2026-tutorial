# The theory part: rule languages, Logical English, Logic Production Systems

*Kind: talk materials · Speaker: Robert Kowalski · Length: 30 minutes · Status: first draft, 11 November 2026, not rehearsed*

Robert Kowalski's three topics of the JURIX 2026 tutorial (see `../README.md`):
"Rule languages", "Controlled natural language and Logical English", and
"Logic Production Systems".

There are **two alternative decks**. They have the same structure, the same
titles and the same closing slide. They differ in the one example that
carries the talk. Choose one.

| Deck | The example | For | Against |
|---|---|---|---|
| `slides-underground.md` (22 slides) | The Emergency Notice of the London Underground, the first example of *Computational Logic and Human Thinking* | Four short sentences that everybody understands at once. The first sentence is the clearest example there is of a goal and a belief that work together. The notice gives a good timeline | It is not a legal text. "Improper use" is its only legal idea |
| `slides-nationality.md` (21 slides) | Sections 1(1) and 12 of the British Nationality Act 1981 | A real statute, in front of an audience of lawyers. Section 1(1) is the example of the 1986 paper, forty years ago. Section 12 has an obligation, the effect of an event, and a prohibition in three subsections one after the other, so the Act itself shows the two kinds of rules | The text of the Act is longer to read on a slide. The audience may know the example already |

## The plan of both decks

| Time | Part | Slides |
|---|---|---|
| 0:00 | Title, and the source text | 1–2 |
| 0:01 | **1 · Rule languages**: two kinds of sentence, belief rules, goal rules, how the two work together, where the other rule languages stand | 3–8 |
| 0:08 | **2 · Controlled natural language and Logical English**: ambiguity, templates, rules, scenarios and queries, explanations (why and why not), a citation, a conditional answer | 9–15 |
| 0:20 | **3 · Logic Production Systems**: events, actions and fluents, causal laws, reactive rules and a constraint, the timeline | 16–20 (21 in the underground deck) |
| 0:28 | What to take away; hand over to the practical part | last |

The speaker notes hold the clock, and one or two sentences that the speaker
can say on each slide.

## Files

| File | What it is |
|---|---|
| `slides-underground.md`, `slides-nationality.md` | The slides, for Marp (marp.app). The speaker notes are HTML comments |
| `*.html` | The built slides, to present in a browser: **F** for full screen, **P** for the presenter view with the notes |
| `*.pdf` | The slides as PDF, with the notes as PDF comments |
| `*.pptx` | PowerPoint, exactly as the PDF looks. Each slide is a picture. The notes are kept |
| `*-editable.pptx` | PowerPoint with real text boxes, to change the words in PowerPoint. The fonts are Calibri and Courier New, so the look is a little different |
| `build.sh` | Builds all of the above. `./build.sh slides-underground` builds one deck. `./build.sh --timelines` first draws the timelines again |
| `theme/jurix-theory.css` | The look: the theme of the practical part, without a logo |
| `programs/` | The four programs that the slides quote. Each one runs |
| `images/timeline-*.svg` | The timelines, drawn by `tools/timeline.py` from a run of the programs |
| `tools/md2pptx.cjs` | Makes the editable PowerPoint from the Markdown. Its first comment lists the Markdown that it reads |
| `tools/timeline.py` | Runs a Logical English for LPS program and draws its timeline |

A change in an editable PowerPoint does not go back to the Markdown. If the
Markdown stays the master copy, make each change there and run `./build.sh`.

## The programs

| Program | What it is | Checked on 11 November 2026 |
|---|---|---|
| `programs/underground.le` | The notice as four belief rules, each with a citation of its sentence. Two scenarios | No errors, no warnings, 5 of 5 tests pass |
| `programs/underground_lps.le` | The notice over time: causal laws, three reactive rules, one constraint. Two scenarios | Both scenarios run as the timelines show |
| `programs/nationality.le` | Section 1(1) as one rule. Three scenarios: a citizen, a conditional answer, a person who is not a citizen | No errors, no warnings, 3 of 3 tests pass |
| `programs/nationality_lps.le` | Sections 1(1) and 12 over time: causal laws, one reactive rule, one constraint | The scenario runs as the timeline shows |

To run them: open the first two kinds in the Logical English editor and the
`_lps` ones in the LPS editor (File ▸ Open). From a command line, with
LogicalEnglish2 at `/work` and LPS2 at `/lps2`:

```
cd /work && ./myswipl.sh -g "use_module(le_kbs), runTestsFor('/jurix2026-tutorial/theory/programs/underground.le', R), print_test_result(R), halt."
cd /lps2 && LPS_LE2_LIB=/work ./lps run /jurix2026-tutorial/theory/programs/underground_lps.le --scenario "improper use"
```

The explanations on the slides "Every answer has an explanation" are the
explanations that the system gave, with the indentation kept and long lines
broken.

## What the slides simplify

- **The slide "Rule languages take sides"** puts each rule language in one
  of two columns. This is a reading for the speaker to correct: several
  languages have both kinds of rule.
- **On the slides "Belief rules" and "Goal rules"** the rules are short
  forms that show the shape. The rules of the later slides are the ones in
  `programs/`.
- **In the nationality deck**, the reactive rule leaves out "of full age and
  capacity", "in the prescribed manner" and subsection (4) on wartime. The
  second half of subsection (3), on a person who acquires no other
  nationality within six months, is also left out.
- **Two line breaks are only on the slides.** In `programs/`, the conclusion
  of the reactive rule of `nationality_lps.le`, and each template, is on one
  line. The LPS reader does not accept the broken lines.
- **The quotations of the Act** are the text as enacted in 1981. Section
  1(1) was compared with legislation.gov.uk on 11 November 2026. Section 12
  was compared only in substance: check its exact words before the day.

## Before the day

1. Choose a deck, and delete or keep the other one.
2. Correct the table of "Rule languages take sides".
3. Rehearse with a clock: the notes assume 8, 12 and 8 minutes.
4. Decide whether to run a program live. The slides do not need it: the
   practical part that follows is live.
