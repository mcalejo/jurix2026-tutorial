# Demo of part 2: from a regulation to a tested program

*Slide "Demo · From a regulation to a tested program" · about 6 minutes, at 0:18 · Status: draft, 10 November 2026, not yet rehearsed*

The point of the demo: the model proposes, the verifier checks, the
scenarios decide. The answers never come from the model.

## Before

- LE2 editor, signed in, with **Misc ▸ API Keys & Assistant Settings…** set to
  a fast model, with our own key (no limit of the server's keys during the talk).
- A new, empty program (File ▸ New).
- Rehearse once on the day: save the result as `demos/eu261_drafted.le` and
  `demos/eu261_drafted_fr.le`, the fallback if the model is slow.

## The text (English)

Regulation (EC) No 261/2004, Article 7(1). Check the wording against EUR-Lex
before the day.

> Where reference is made to this Article, passengers shall receive
> compensation amounting to:
> (a) EUR 250 for all flights of 1 500 kilometres or less;
> (b) EUR 400 for all intra-Community flights of more than 1 500 kilometres,
> and for all other flights between 1 500 and 3 500 kilometres;
> (c) EUR 600 for all flights not falling under (a) or (b).

## The request to the LE Assistant

> Write Logical English for this article. Use the templates "the distance of
> a flight is a number km", "a flight is intra-Community" and "a passenger is
> entitled to compensation of an amount for a flight". Add one scenario for
> each of the bands (a), (b) and (c), and one for an intra-Community flight of
> 4 000 km, with the answers the article gives.

## Steps

1. Paste the text and the request. While the model works, say what the
   panel shows: each draft goes through the verifier, and the model reads the
   verifier's messages.
2. Read the draft aloud: are the bands the bands of the article? Is the
   intra-Community flight of 4 000 km in band (b) — 400 euros — and not (c)?
   This is the case that a quick reading misses. The published example
   `regulatory/eu261_integration` uses a simpler table without it: a good
   point to show that the text decides, not the example.
3. **Misc ▸ Run the Program's Tests…** All pass, or not: if a scenario fails,
   ask the room who is right, the rule or the scenario.
4. Edit a scenario: a flight of 1 500 km, then 1 501 km. The answer changes
   from 250 to 400 euros. "Or less" is `<=`; the boundary is a test.
5. French: paste the French text below, and ask: *Écris ces règles en
   Français Logique, avec les mêmes scénarios.* Show the first sentence of
   the result: `la langue cible est : prolog.` Run the tests.

## The text (French)

> Lorsqu'il est fait référence au présent article, les passagers reçoivent
> une indemnisation dont le montant est fixé à :
> a) 250 euros pour tous les vols de 1 500 kilomètres ou moins ;
> b) 400 euros pour tous les vols intracommunautaires de plus de 1 500
> kilomètres et pour tous les autres vols de 1 500 à 3 500 kilomètres ;
> c) 600 euros pour tous les vols qui ne relèvent pas des points a) ou b).

## If the model is slow or the network fails

Open `demos/eu261_drafted.le` (saved at the rehearsal) and do steps 2 to 4 on
it. Say that it was drafted this morning by the same procedure.

## What not to claim

- Not that the model is always right: step 2 is there because it is not.
- Not that the scenarios are complete: they are the cases we thought of.
