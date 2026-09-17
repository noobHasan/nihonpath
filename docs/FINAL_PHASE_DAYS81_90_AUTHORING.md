# Final Phase Days 81–90 Authoring

## Scope

This document records authoring of the final N5 completion phase. It is not the Gate 12 final curriculum/Japanese audit.

## Status semantics

Days 81–90 are `authored`, not `reviewed`. Days 1–80 remain reviewed. Gate 12 is responsible for independent acceptance.

## Days 81–90

- Day 81 consolidates learned kanji through bounded word/context recognition and self-check writing.
- Day 82 consolidates vocabulary through topic transfer, reading, audio, context, and production.
- Day 83 consolidates particles, forms, sentence order, error recognition, and meaning in context.
- Day 84 uses an unseen station/shop/public sign-style retrieval item.
- Day 85 uses an unseen appointment/message-style item.
- Day 86 is audio-first with hidden transcript policy, replay, slow/natural support, and shadowing.
- Day 87 rotates practical conversation scenarios with initiate/respond/recover practice.
- Day 88 is `assessment-day088-mock-a`, an internal N5-style mock.
- Day 89 selects a bounded repair plan from assessment weaknesses, semantic quiz targets, earlier diagnostic evidence, or balanced fallback.
- Day 90 is `assessment-day090-final`, an internal readiness assessment with separate objective and production evidence.

Gate 11C depth reconciliation expanded Day 84 to 6 unseen sign/notice stimuli and Day 85 to 5 unseen person-to-person messages. Day 89 deterministic fixtures produce: no-history → vocabulary / orthography, grammar, reading, listening; grammar-weak → grammar; vocabulary-weak → vocabulary / orthography; mixed-weak → grammar, listening, vocabulary / orthography. Repair output is bounded to four domains and eight IDs.

## Universal readability metrics

Final-phase items use the existing learning-item contract: Japanese, authored reading, romaji data, natural meaning, and selective analysis/kanji support. The deterministic audit is enforced by `validateContent()`.

## Reading, audio, speaking, and writing

Reading content is lesson-level and retrieval-first. Audio uses explicit TTS fallback slots (`asset:null`, `ttsFallback:true`), never fabricated native files. Speaking and writing use the existing engines; dictation keeps transcripts hidden until reveal.

## Assessments

Mock A contains 24 objective questions across vocabulary/orthography, grammar, reading, and listening. The final assessment contains 40 objective questions across vocabulary/orthography, grammar, sentence composition, reading, listening, and practical communication. These are internal Nihon Path measures, not official JLPT scores or certification.

## Day 89 repair logic

Repair priority is: latest Day 88 weakness evidence, repeated semantic quiz targets, earlier diagnostic weaknesses, then a balanced vocabulary/grammar/reading/listening fallback. The plan is bounded to four domains and selects authored content only.

## Completion behavior and Dev Preview

Day 88 and Day 90 reference the existing assessment engine. Assessment completion is required before the associated lesson can be completed, but no score threshold blocks progress. Assessment attempts append to history. Day 90 remains the terminal course day; no Day 91 content is authored.

## Validation

All data and JavaScript syntax checks pass; `validateContent()` is required to return zero errors and warnings. Days 81–90 remain `authored`.

## Known limitations / browser QA

Native audio, microphone recording, and browser/mobile/theme QA remain future work. Actual browser QA was not performed during this authoring gate.

## Gate 11D depth finalization

Validation snapshot: Day 86 has 6 listening items, 6 audio targets, 6 questions, 4 shadowing tasks, 6 hidden transcripts, and 6 natural/slow-rate targets. Day 87 has 8 marathon scenarios, 8 authored turns, 11 role-play tasks, and INITIATE/RESPOND/RECOVER coverage of 6/2/1. Registry totals: 120 analyses, 141 audio targets, 91 speaking tasks, 88 writing tasks, and 79 assessment questions.

Day 86 now contains 6 listening targets and 4 shadowing tasks covering appointment, station, price, school, invitation, and apartment-problem listening. Transcripts are hidden until reveal; each target has natural and slow playback support, with recording optional.

Day 87 now contains 8 marathon scenarios and 11 linked role-play tasks spanning convenience store, restaurant/café, station, directions, transport, housing, appointment, and communication recovery. The scenarios cover INITIATE, RESPOND, and RECOVER and reuse reviewed beginner language. Public-office and health-related communication remains language-only.
