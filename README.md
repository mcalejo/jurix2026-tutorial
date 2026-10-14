# Logical English as a Lingua Franca for Representing and Reasoning with Legal and Business Rules


A 90-minute spotlight tutorial at [JURIX 2026](https://www.irit.fr/jurix2026/), the 39th International Conference on Legal Knowledge and Information Systems.

| | |
|---|---|
| **When** | Tuesday 8 December 2026, the workshop and tutorial day of JURIX 2026. The time slot will be announced here. |
| **Where** | Toulouse, France, in person. The room will be announced here. |
| **Length** | 90 minutes |
| **Registration** | Through the [JURIX 2026 conference registration](https://www.irit.fr/jurix2026/). |

## Presented by
Robert Kowalski (Imperial College London) and Miguel Calejo (Logical Contracts)

## Abstract

Legal rules and business rules can be written in many different computer-executable rule languages. Most of these languages employ a mathematical syntax, which makes them convenient for computer implementation, but makes it hard for stakeholders without technical training to understand. It also makes it hard to compare the same application written in different languages, and to understand whether the differences come from the different notations or from some deeper conceptual level.

This tutorial presents Logical English  (LE) and Logic Production System (LPS), as a uniform, human-oriented, computer-executable language, in which the features of many other rule languages are included and combined. The tutorial will present LE and LPS, and show how rules and programs written in sixteen different rule languages can be translated into and executed in LE and LPS.

## Why this tutorial

Different communities working in computational law and related fields use different rule languages: The standards community uses LegalRuleML. Logic programmers use s(CASP) and Prolog. The Rules as Code community uses Blawx, and Stanford CodeX uses Epilog. Decision management uses Drools rule files and decision tables, and industry uses Oracle Intelligent Advisor and insurance product configurations. The blockchain world uses Solidity, Daml and Bitcoin Miniscript. Etc. Each of these language is suitable for its own field, but together they make comparing, reusing, migrating and scrutinising rules very difficult.

Logical English (LE) incorporates the knowledge representation and problem solving features of other rule languages, while employing a controlled natural language syntax that can be read and understood without any technical training. LE represents knowledge at a level of abstraction above other rule languages, so it can serve as a common language for interchanging knowledge between them. Logic Production Systems (LPS) extends Logical English with events and actions that change the state of the world over time.

The tutorial shows translations into LE or LPS of example programs from sixteen rule languages. Each of the translations was checked and validated against the source system's own inference engine or against an independent reference. 

By showing how different rule languages can be translated into a common controlled natural language, the tutorial will give a comparative overview of different rule systems that would be otherwise hard to compare. 

## What you will learn

1. To read and write Logical English, and Logical English for LPS.
2. To recognise the main features of sixteen rule languages.
3. How a controlled natural language can serve as a common language between different rule languages.
4. To run the examples yourself, with open tools in your browser.

## Programme

| Topic |
|---|
**Rule languages.** Two kinds of rules: rules that state beliefs, written as logic programs, and rules that produce behaviour, written as reactive rules (or integrity constraints).
**Controlled natural language and Logical English.** Templates and sentences; facts, rules and questions; scenarios that include the answers they expect, and so serve as tests; explanations of why an answer holds and why an answer does not hold; citations of the source text; conditional answers.
**Logic Production Systems.** Events, fluents (facts that change over time), causal laws, constraints, and the timeline. 
**A tour of  sixteen rule languages, in  five families**, live. *Legal and academic formalisms:* LegalRuleML, s(CASP) and Prolog, Blawx, Epilog, L4. *Rules as Code for statutes, taxes and benefits:* Axiom RuleSpec, PolicyEngine and OpenFisca, Catala. *Decision management and business rules:* Drools rule files and their decision tables, Oracle Intelligent Advisor. *Industry configurations and financial regulation:* Socotra, Oracle Insurance Policy Administration, and Rune, the language of the derivatives industry's Digital Regulatory Reporting rules. *Ledgers and contracts:* Solidity, Daml, Bitcoin Miniscript. For each language: an example in the language and a translation of the example into LE, together with documentation about how the translation was checked.
**Writing rules from ordinary language.** Drafting LE and LPS from English or French text with a language model assistant: a three step procedure during which the language model proposes, the engine checks, and the scenarios decide. Variants of LE in four other natural languages, French, Potuguese, Spanish and Italian.
**Hands-on.**  During which attendees open a LegalRuleML file and a Drools rule file in the browser editor, run the translation, ask *why* and *why not*, and change a rule until a scenario fails.
**Limitations**, what does not translate, open questions, and discussion.

## Who should attend

Researchers in artificial intelligence and law, legal knowledge engineers, Rules as Code practitioners in government, standards makers, logic programmers, and people in industry who look after large sets of rules. Lawyers and policy makers who do not program.

**Prerequisites.** None, beyond a proficiency in English. Some knowledge of logic programming or of a rule engine might be useful, but is not assumed. No knowledge of Logical English, LPS or any of the other rule languages is needed.

**What to bring.** For the hands-on part, a laptop with a web browser. Nothing needs to be installed. A recording will be shown for anyone without a laptop.

## Tools and materials

- **Logical English**: the language, its inference engine, its explanations and a web editor. Open source under the Apache 2.0 licence, at [github.com/LogicalContractsOrg/LogicalEnglish2](https://github.com/LogicalContractsOrg/LogicalEnglish2), and free to use online at [le2.logicalcontracts.com](https://le2.logicalcontracts.com).
- **Logic Production Systems**: events, fluents, causal laws and a timeline, with its own web editor. Open source under the Apache 2.0 licence, at [github.com/LogicalContractsOrg/lps2](https://github.com/LogicalContractsOrg/lps2), and free to use online at [lps2.logicalcontracts.com](https://lps2.logicalcontracts.com).
- **The public examples**: the translated programs whose sources may be shared, from s(CASP) and Prolog, Blawx, LegalRuleML and Bitcoin Miniscript. Each comes with its original text, scenarios and expected answers. They are among the examples supplied with the two editors.
- **The translators**: attendees can try the translations between LegalRuleML and Logical English, between s(CASP) or Prolog and Logical English, and from Blawx into Logical English online, during and after the session.
- **Slides and exercise sheet**, with three short tasks and worked solutions: *to be published here before the session.*

## Reading list

- R. Kowalski, A. Datoo. *Logical English meets legal English for swaps and derivatives.* Artificial Intelligence and Law 30(2), 2022.
- R. Kowalski, J. Dávila, G. Sartor, M. Calejo. *Logical English for Law and Education.* In *Prolog: The Next 50 Years*, LNCS 13900, Springer, 2023.
- R. Kowalski, F. Sadri. *Reactive Computing as Model Generation.* New Generation Computing 33(1), 2015.
- R. Kowalski. *Two Kinds of Rules: Goal Rules and Belief Rules.* International Joint Conference on Rules and Reasoning, Springer, 2025.
- T. Athan, H. Boley, G. Governatori, M. Palmirani, A. Paschke, A. Wyner. *LegalRuleML Core Specification v1.0.* OASIS Standard, 2021.
- J. Arias, M. Carro, E. Salazar, K. Marple, G. Gupta. *Constraint Answer Set Programming without Grounding.* Theory and Practice of Logic Programming 18(3–4), 2018.
- J. Morris. *Blawx: Rules as Code demonstration*; and OECD Observatory of Public Sector Innovation, *Cracking the Code*, 2020.
- M. Genesereth. *Computable Contracts*, and the Epilog documentation, Stanford CodeX.
- Object Management Group, *Decision Model and Notation 1.5*; the Drools documentation for its rule language.
- P. Wuille, A. Poelstra et al. *Miniscript*; Bitcoin Improvement Proposal 379.
- D. Merigoux, N. Chataing, J. Protzenko. *Catala: a programming language for the law.* ICFP 2021.

## Organisers

- **Robert Kowalski**, Professor Emeritus, Department of Computing, Imperial College London — [r.kowalski@imperial.ac.uk](mailto:r.kowalski@imperial.ac.uk)
- **Miguel Calejo**, Chief Technology Officer, Logical Contracts, Portugal — [mc@logicalcontracts.com](mailto:mc@logicalcontracts.com)

Questions about the tutorial are welcome at either address.
