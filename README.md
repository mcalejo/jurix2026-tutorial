# A lingua franca for legal and business rules: reading sixteen rule languages in Logical English

A 90-minute spotlight tutorial at [JURIX 2026](https://www.irit.fr/jurix2026/), the 39th International Conference on Legal Knowledge and Information Systems.

| | |
|---|---|
| **When** | Tuesday 8 December 2026, the workshop and tutorial day of JURIX 2026. The time slot will be announced here. |
| **Where** | Toulouse, France, in person. The room will be announced here. |
| **Length** | 90 minutes |
| **Registration** | Through the [JURIX 2026 conference registration](https://www.irit.fr/jurix2026/). |

## Abstract

Rules for law and business are written in incompatible notations. Learn Logical English and its superset LPS, then see programs written in ~~eleven~~ sixteen different notations translated into it: an executable, explainable lingua franca, with open tools to try.

## Why this tutorial

Each community in computational law writes its rules in its own language. The standards community uses LegalRuleML. Logic programmers use s(CASP) and Prolog. The Rules as Code community uses Blawx, and Stanford CodeX uses Epilog. Decision management uses Drools rule files and decision tables, and industry uses Oracle Intelligent Advisor and insurance product configurations. The blockchain world uses Solidity, Daml and Bitcoin Miniscript. Etc. Each language suits its own field, but together they make comparing, reusing, migrating and scrutinising rules very hard.

Logical English is a controlled natural language: a precise subset of English that a computer can run, and that a person can read without technical training. Logical English does not depend on any of these languages, so it can serve as a common language between them. Logic Production Systems (LPS) extends Logical English with events and actions that change the state of the world over time.

The tutorial shows programs from 16 rule languages translated into Logical English or LPS, side by side with their originals. Each translation was checked against the source system's own engine or against an independent reference. The tutorial is useful even to someone who will never use Logical English: it gives a comparative overview of systems that are otherwise hard to compare.

## What you will learn

1. To read and write Logical English, and Logical English for LPS.
2. To recognise the main features of sixteen rule languages, and what each can and cannot express.
3. How a controlled natural language can serve as a common language between them.
4. To run the examples yourself, with open tools in your browser.

## Programme

| Time | Topic | Presenter |
|---|---|---|
| 0:00–0:08 | **Rule languages.** Two kinds of rules: rules that state beliefs, written as logic programs, and rules that produce behaviour, written as reactive rules. | Robert Kowalski |
| 0:08–0:25 | **Controlled natural language and Logical English.** Templates and sentences; facts, rules and questions; scenarios that state the answers they expect, and so serve as tests; explanations of why an answer holds and why another does not; citations of the source text; conditional answers. | Robert Kowalski |
| 0:25–0:37 | **Logic Production Systems.** Events, fluents (facts that change over time), causal laws, constraints, and the timeline. | Robert Kowalski, Miguel Calejo |
| 0:37–1:03 | **A tour of  sixteen rule languages, in  five families**, live. *Legal and academic formalisms:* LegalRuleML, s(CASP) and Prolog, Blawx, Epilog, L4. *Rules as Code for statutes, taxes and benefits:* Axiom RuleSpec, PolicyEngine and OpenFisca, Catala. *Decision management and business rules:* Drools rule files and their decision tables, Oracle Intelligent Advisor. *Industry configurations and financial regulation:* Socotra, Oracle Insurance Policy Administration, and Rune, the language of the derivatives industry's Digital Regulatory Reporting rules. *Ledgers and contracts:* Solidity, Daml, Bitcoin Miniscript. For each: what the community writes, the same rules in Logical English, and how the translation was checked. | Miguel Calejo |
| 1:03–1:15 | **Writing rules from ordinary language.** Drafting Logical English and LPS from English or French text with an assistant: the language model proposes, the engine checks, the scenarios decide. Logical English in five languages. | Miguel Calejo |
| 1:15–1:25 | **Hands-on.** Open a LegalRuleML file and a Drools rule file in the browser editor, run the translation, ask *why* and *why not*, and change a rule until a scenario fails. | Both |
| 1:25–1:30 | **Limitations**, what does not translate, open questions, and discussion. | Both |

## Who should attend

Researchers in artificial intelligence and law, legal knowledge engineers, Rules as Code practitioners in government, standards makers, logic programmers, and people in industry who look after large sets of rules. Lawyers and policy makers who do not program are welcome.

**Prerequisites.** None, beyond English and the idea of a rule. Some experience of logic programming or of a rule engine helps, but is not assumed. No knowledge of Logical English, LPS or any of the languages is needed.

**What to bring.** For the hands-on part, a laptop with a web browser. Nothing needs to be installed. A recording will be shown for anyone without a laptop.

## Tools and materials

- **Logical English**: the language, its engine, its explanations and a web editor. Open source under the Apache 2.0 licence, at [github.com/LogicalContractsOrg/LogicalEnglish2](https://github.com/LogicalContractsOrg/LogicalEnglish2), and free to use online at [le2.logicalcontracts.com](https://le2.logicalcontracts.com).
- **Logic Production Systems**: events, fluents, causal laws and a timeline, with its own web editor. Open source under the Apache 2.0 licence, at [github.com/LogicalContractsOrg/lps2](https://github.com/LogicalContractsOrg/lps2), and free to use online at [lps2.logicalcontracts.com](https://lps2.logicalcontracts.com).
- **The public examples**: the translated programs whose sources may be shared, from s(CASP) and Prolog, Blawx, LegalRuleML and Bitcoin Miniscript. Each comes with its original text, its scenarios and its answers. They are among the examples of the two editors.
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
