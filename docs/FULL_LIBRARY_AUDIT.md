# Gate 13 — Full Library Audit

## Result

NOT READY. This independent audit found a substantial legacy conversation-library coverage gap. `data/conversations.js` and later phase files expose 59 conversations / 185 lines, while only the Gate 9B curriculum subset is enriched with stable line metadata. The standalone Conversations page still renders legacy tuple lines directly, so global reading, romaji, meaning, speaker-role, audio, and analysis coverage cannot honestly be claimed at 100%.

## Inventory

Kana: 142; vocabulary: 377; kanji: 91; grammar: 105; conversations: 59; conversation lines: 185; legacy speaking phrases: 18; SentenceAnalysis: 120; audio targets: 141; V2 speaking tasks: 91; writing tasks: 88; standalone readings: 8; Life in Japan records: 11; Culture records: 24; assessments: 3; assessment questions: 79.

## Findings

- Vocabulary records have complete reading, romaji, and meaning fields.
- The kanji registry contains 91 records with whole-word examples represented in its source schema.
- Global conversations include 144 legacy tuple lines without reading, romaji, meaning, speaker-role, audio, or analysis fields.
- The Conversations page directly renders tuple positions, confirming this is learner-facing library content rather than dead data.
- V2 speaking, audio, writing, assessment, Life, Culture, and reading registries resolve structurally in the inspected source.
- Browser/device QA was not performed; it belongs to Gate 14.

## Gate 13A rerun

The source-composed inventory confirms 59 conversations and 185 lines: 144 legacy tuples and 41 rich objects. A stricter audit found 22 of the 41 rich lines still contain Japanese script in their romaji field, caused by the earlier `romaji = japanese` fallback class. The standalone renderer also still consumes tuple positions for legacy lines. Therefore the global conversation contract is not yet satisfied.

## Blocking decision

## Gate 13B-1A — Base conversations c1–c5

The first bounded migration batch is complete: 5 conversations and 18 source lines were matched using conversation ID, speaker, Japanese, and English. All 18 are rich objects with stable IDs, authored readings, romaji, meanings, roles, usage, classifications, and dedicated audio. Five supplied analyses were added. Batch romaji contains zero Japanese-script characters. Gate 13 remains NOT READY because c6 onward is intentionally unmigrated.

## Gate 13B-1B — Base conversations c6–c10

An additional 5 conversations and 15 lines were migrated using the same composite source matching. All 33 c1–c10 lines are rich objects with complete batch metadata and zero Japanese-script romaji. Four supplied analyses and 15 dedicated audio targets were added. Gate 13 remains NOT READY because c11 onward is intentionally unmigrated.

## Gate 13B-1C1 — c11–c12 migration

The bounded c11–c12 batch migrated 2 conversations and 6 lines. All 39 c1–c12 lines now have rich metadata, authored readings and romaji, roles, usage, classifications, and exact-match audio. Two supplied analyses and six dedicated audio targets were added. City-hall content remains language-only, and hospital content remains symptom-language practice only. Gate 13 remains NOT READY because c13 onward is intentionally unmigrated.

## Gate 13B-1C2 — c13 Pharmacy Migration

The c13 batch migrated 3 lines with complete rich metadata, 3 dedicated audio targets, and 2 analyses. The pharmacy instruction is explicitly documented as example language spoken by a pharmacist, not dosage advice from Nihon Path. Combined c1–c13 coverage is 42/42 rich lines with zero Japanese-script romaji. Gate 13 remains NOT READY because c14 onward is intentionally unmigrated.

## Gate 13B-1C3 — c14–c15 migration

The c14–c15 batch migrated 2 conversations and 6 lines. Combined c1–c15 coverage is 48/48 rich lines with complete metadata, exact-match audio, and zero Japanese-script romaji. Four supplied analyses and six dedicated audio targets were added. Gate 13 remains NOT READY because c16 onward is intentionally unmigrated.

## Gate 13B-1C3A — Classification accounting reconciliation

The prior reported total of 52 was a reporting arithmetic error, not duplicated runtime data. Runtime truth for the 48 c1–c15 lines is: FORMAL GRAMMAR 13, PRODUCTIVE FIXED PHRASE 17, RECOGNITION PHRASE 18. Each line has exactly one valid classification; the total is 48. No runtime line or mapping duplication was found.

Do not promote Gate 13. The complete 185-line migration requires authored, line-specific reading, romaji, meaning, role, scenario, classification, audio, and (where required) analysis metadata, followed by a global reference/readability rerun. Gate 14 has not been implemented.

## Gate 13B-1D1 — c16–c17 migration

The bounded c16–c17 batch migrated 2 conversations and 6 lines using exact conversation ID, speaker, Japanese, and English source matching. All 54 combined c1–c17 lines are rich objects with stable IDs, authored readings, romaji, meanings, roles, usage, classifications, and dedicated audio; romaji contains zero Japanese-script characters. Six dedicated audio targets and three supplied analyses were added, bringing runtime totals to 195 audio targets and 140 analyses. Delivery and reservation notes remain language-use guidance only. Gate 13 remains NOT READY because c18 onward is intentionally unmigrated.

## Gate 13B-1D2A — c18–c20 / Original Base Conversation Library Completion

The first c18–c20 attempt correctly stopped when the prompt used a question mark for c20-03 English. Repository authority is `Got it. Another time.` with a period; no source change was required. The corrected bounded batch then migrated 3 conversations and 9 authored mappings, added 6 analyses and 9 dedicated audio targets, and completed the original base library: c1–c20, 20 conversations and 63/63 lines. Runtime classification counts are FORMAL GRAMMAR 19, PRODUCTIVE FIXED PHRASE 23, and RECOGNITION PHRASE 21, totaling 63. Hobbies analysis covers と, が好き, and も; invitation analysis teaches Vませんか as an invitation; and 今日はちょっと… is documented as an indirect polite refusal. All base-line romaji is free of Japanese script. Global migration remains incomplete: 39 conversations and 122 lines remain outside c1–c20. Gate 13 remains NOT READY.

## Gate 13B-2A — First Phase-Added Conversation Reconciliation

The batch completed for `conv-phase4-request` and `conv-phase4-ongoing`: 2 conversations and 5 lines. Before enrichment, all 5 lines were legacy tuples; no Gate 9 rich-object references existed for this batch. The matcher now accepts tuple and rich-object source shapes and matches only conversation ID, speaker, Japanese, and English. Five existing Gate 9 audio targets were reused and corrected in place, with no duplicates. Four existing shallow analyses were upgraded; no new analyses were needed and no obsolete analysis was removed. The service phrase remains recognition-only and Vています is taught as ongoing action in context. No stale Gate 9 references remain. The completed set is now 22 conversations / 68 lines with 68/68 rich coverage and zero Japanese-script romaji. Runtime classifications are FORMAL GRAMMAR 22, PRODUCTIVE FIXED PHRASE 24, and RECOGNITION PHRASE 22. Global inventory remains 59 conversations / 185 lines; 37 conversations / 117 lines remain outside the completed set. Gate 13 remains NOT READY.

## Gate 13B-2A1 — Analysis Accounting Reconciliation

The prior Gate 13B-2A report contradicted itself: it claimed four required analyses were present while reporting zero new analyses and an unchanged 146 total. Runtime/source tracing showed those four IDs were absent before enrichment and were not created by the original batch code. This corrective gate added the four canonical records to `japaneseAnalyses`, upgraded them with meaningful token structures, and preserved the existing 146 records. Correct arithmetic is before 146 + new 4 - removed 0 = after 150; existing 0, upgraded 0, obsolete removed 0. The non-required `はい。` line has no analysis record. Final duplicate analysis ID count is zero, all four analyses match their Japanese lines and audio, and the completed 68-line set passes the strengthened analysis-registry invariant. Gate 13 remains NOT READY.

## Gate 13B-2B — Phase 4A Permission + Restaurant Reconciliation

The batch reconciled `conv-phase4-permission` on Day 44 and `conv-phase4-restaurant` on Day 42: 2 conversations and 7 Gate 9 rich lines. All seven were mutated in place using exact composite source identity. Before repair, Gate 9 defects were present in surface-copy readings/romaji, raw speaker roles, punctuation-derived classifications, shallow analyses, and incorrect audio readings; after repair all required defect counts are zero. Seven existing audio targets were reused and corrected, with no duplicates. The seven existing analyses were upgraded in place, with no additions or removals. The completed set is now 24 conversations / 75 lines, with 75/75 rich coverage, zero Japanese-script romaji, and runtime classifications FORMAL GRAMMAR 24, PRODUCTIVE FIXED PHRASE 26, RECOGNITION PHRASE 25. Gate 13 remains NOT READY; 35 conversations and 110 lines remain globally outside the completed set.
