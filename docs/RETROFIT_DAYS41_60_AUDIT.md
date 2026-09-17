# Gate 9 — Retrofit Days 41–60 Audit

## Result

Gate 9 is complete/finalized. Days 41–60 retain their authored lesson titles and sequence and now have bounded retrofit arrays for analysis, audio, speaking, writing, and skill targets. Days 61–80 and Days 81–90 were not changed.

## Per-day practical audit

Days 41–45 PASS: convenience store, restaurant, café, clothing permission, and price/money interactions are represented with short authored examples and practical tasks. Day 44 preserves `試着してもいいですか。`.

Days 46–48 PASS: station/platform, transfer/directions, bus/taxi communication and repair language are represented without operator-specific procedural claims.

Days 49–52 PASS: rooms, apartment problems, utilities/internet, garbage/neighbors are language-first; local garbage rules and technical troubleshooting are explicitly bounded.

Days 53–56 PASS: workplace, classroom, lateness/absence, and appointments use contextual politeness and short practical production.

Days 57–59 PASS: city hall, hospital reception, and pharmacy content is communication language only. No legal procedure, diagnosis, treatment, medicine, or dosage advice was added.

Day 60 PASS: cumulative transfer checkpoint covers practical selection and production across the phase without new grammar.

## Universal Daily Course coverage

| Metric | Result |
|---|---:|
| dailyCourseItemCount | 178 |
| itemsWithReading / readingCoveragePercent | 178 / 100% |
| itemsWithRomaji / romajiDataCoveragePercent | 178 / 100% |
| itemsWithMeaning / meaningCoveragePercent | 178 / 100% |
| kanjiItemCount | 116 |
| kanjiItemsWithWholeWordReading / kanjiReadingCoveragePercent | 116 / 100% |
| analysisRequiredCount / analysisCoveredCount / analysisCoveragePercent | 18 / 18 / 100% |

## Grammar, morphology, and classification

The actual reviewed formal scope used by Days 41–60 is: て-form, ～てください, ～ています (beginner ongoing-action use), ～てもいい, ～てはいけません, ～たい, reason ～から, and body-part が痛い. Existing transport で and earlier existence/location/question grammar are reused. Authored morphology remains example-based (食べる→食べて, 飲む→飲んで, 行く→行って); no algorithmic conjugator was added. Request, permission, and prohibition are kept distinct. Service and workplace expressions are fixed or recognition chunks where appropriate.

## Audio, speaking, writing, and reading

Twenty practical audio targets, twenty role-play speaking tasks, and twenty practical writing tasks were added. All new audio is explicitly TTS fallback (`asset:null`, `ttsFallback:true`); curated/native count is 0 and fallback count is 20. Speaking tasks use initiate/response framing and hidden-response reveal; writing includes 18 typed responses and 2 dictations. Practical reading remains lesson-level rather than a global Reading Bank expansion, covering prices, signs/platform language, menus, and short notices already present in the phase.

## Conversation coverage and naturalness

Directly used Phase 4 conversations retain backward-compatible legacy line tuples and their authored English/context notes. Their reading/romaji are supplied by the lesson-level practical examples and task layer; no conversation tuple schema was broken. No semantic Japanese repairs were required. Customer/staff roles, fixed service phrases, and context-dependent politeness notes were preserved.

## Validator and regression

The validator now targets Days 41–60 only, validates their retrofit references, and reports a range-specific readability audit. `validateContent()` returned `errors: []`, `warnings: []`, `ok: true`; 90 lessons remain present. Counts: analyses 59, audio targets 66, speaking tasks 56, writing tasks 68, assessments 1, assessment questions 15. Review-target runtime preservation from Gate 8 was not reimplemented or regressed.

## Known limitations / QA

Native audio assets and real conversational recordings are not present; TTS fallback is intentional. Actual browser, mobile, light/dark, recording, and responsive QA were not performed in this run. Static validation and `git diff --check` passed. No Git add, commit, push, branch change, or history rewrite was performed.

## Next gate

Gate 10 — Retrofit Days 61–80.

## Universal practical conversation-line audit (Gate 9B)

The actual curriculum references resolve to 14 conversations and 41 lines:

| ID | Title | Days | Lines |
|---|---|---:|---:|
| `conv-phase4-conbini` | At the convenience-store checkout | 41 | 3 |
| `conv-phase4-restaurant` | Ordering simply | 42 | 3 |
| `conv-phase4-coffee` | Ordering coffee | 43 | 4 |
| `conv-phase4-permission` | In a shop | 44 | 4 |
| `conv-phase4-directions` | A simple transfer | 47 | 3 |
| `conv-phase4-home` | A room problem | 49 | 3 |
| `conv-phase4-problem` | Reporting an apartment problem | 50 | 3 |
| `conv-phase4b-utility` | A utility problem | 51 | 2 |
| `conv-phase4b-work` | At work | 53 | 2 |
| `conv-phase4b-class` | Finding the classroom | 54 | 2 |
| `conv-phase4b-appointment` | Making an appointment | 56, 60 | 3 |
| `conv-phase4b-city` | At reception | 57 | 3 |
| `conv-phase4b-doctor` | At the hospital | 58 | 3 |
| `conv-phase4b-pharmacy` | At the pharmacy | 59 | 3 |

All 41 lines now use stable IDs (`line-<conversation-slug>-NN`) and enriched line objects while retaining numeric tuple aliases for backward-compatible rendering. Reading, romaji, meaning, audio, required analysis, and role-play coverage are each 41/41 — 100%. Role-play conversation coverage is 14/14 — 100%.

Gate 9B audio accounting: total targets 107; native assets 0; TTS fallback 107; new targets this gate 61; new native 0; new fallback 61. These totals reconcile. All migrated line audio target text exactly matches its Japanese surface.
