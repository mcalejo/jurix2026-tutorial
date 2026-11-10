# Demo of the tour: a twin, live

*Slide "Demo · A twin, live" · about 4 minutes, at 0:11 · Status: draft, 10 November 2026, not yet rehearsed*

The demo is also exercises 1 and 2 of the hands-on. The room sees each step
once, and then does it.

## Before

- Two browser tabs, already open and logged out (the room has no account):
  - LE2: <https://le2.logicalcontracts.com/editor/index.html?example=migration/legalruleml/ex5_section29new/ex5_section29new&scenario=unlicensed_trader&query=obligations>
  - LPS2: <https://lps2.logicalcontracts.com/ide?example=migration/drools/fire_alarm/fire_alarm.le>
- Zoom the browser to 125 % so the back of the room can read.

## Steps

1. **LE2 tab.** Say: "This is the twin of a LegalRuleML document from the
   specification: section 29 of the Australian National Consumer Credit
   Protection Act. A person must not engage in a credit activity without a
   licence."
2. **File ▸ Show the Original…** The LegalRuleML opens beside the twin.
   Point at `lrml:Prohibition` and then at `is forbidden that` in rule `ps1`.
3. Scenario `unlicensed_trader`, query `obligations`, **Query**. Two answers:
   Alice must pay 200 penalty units and 2000 civil penalty units. Click the
   first answer: the explanation shows rule `reparation_1_1` and the violated
   prohibition.
4. Scenario `licensed_trader`, query `prohibitions`, **Query**. No answer.
   Click **Why not**: the tree stops at "it is not the case that bob holds a
   credit licence".
5. **LPS2 tab.** Say: "Drools' own fire alarm example. Drools changes a
   working memory; the twin changes the world." **Run**. On the
   **Timeline**: fires start at cycle 11, at cycle 12 the sprinklers turn on
   and the alarm goes on, at cycle 22 they turn off.
6. Right-click the event "an alarm goes on": the rule that made it happen.

## If the network fails

Take the screenshots of each step before the day, into `demos/shots/`
(not made yet), and show them instead.

## Facts checked

- The scenario names, the query names and the expected answers are those of
  `examples/migration/legalruleml/ex5_section29new/ex5_section29new.le` in
  LogicalEnglish2; its tests pass (10 November 2026).
- The cycles of the fire alarm are those of the README of
  `examples/migration/drools/` in LPS2.
