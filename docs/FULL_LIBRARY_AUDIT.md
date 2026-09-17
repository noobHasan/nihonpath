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

## Gate 13C — V1 Conversation Scope Closure

**Result: NOT READY. Browser QA: NOT PERFORMED.** The scope/filter implementation is complete, but strict inspection exposes 17 generic required analysis shells in the accepted 75-line set. This gate does not rewrite accepted conversation content, and does not start Gate 14. Earlier gate reports above are retained as history; their claims about meaningful analyses are superseded by this runtime finding.

### Deliberate V1 scope amendment

Nihon Path is a strong beginner / JLPT N5 and practical Japan foundation. The reviewed 90-day Daily Course is the core; the standalone conversation library supports it. Completing all 59 conversations / 185 lines is no longer a V1 release prerequisite. Requiring manual enrichment of every historical source record delays release without being necessary for a useful beginner library.

The new criterion is complete metadata and useful required analyses for every canonical standalone line, all Daily Course references resolving, no hidden-source leakage, unchanged curriculum validation/readability, and explicit deferral of unfinished source content. This amendment supersedes the historical “complete 185-line migration” release block above without erasing it. Gate 13 can be COMPLETE FOR V1 only after the canonical analysis defect below is repaired and validation passes.

### Source checkpoint and failed 2C cleanup

The initial working tree was clean, but its source contained unaccepted 2C code: station/home completed-ID additions, six `phase4C` line mappings and their audio mutations/creation path, and four analysis upserts. The station thank-you mapping incorrectly used `Thank you.` instead of source-authoritative `Thank you very much.` and interrupted script execution. These three source statements were manually removed. No reset, checkout, revert, staging, commit, push, or branch change was performed. No documentation claiming 2C completion existed.

The underlying station/home source records and pre-existing Gate 9 enrichment remain available to the course. The accepted request/ongoing analysis upserts after the failed block remain intact. Clean source composition restores 209 audio targets and 150 analyses with no duplicate registry IDs.

### Standalone and course separation

`getStandaloneConversations()` derives eligibility exclusively from `conversationEnrichmentCompletedConversationIds`: c1–c20 plus `conv-phase4-request`, `conv-phase4-ongoing`, `conv-phase4-permission`, and `conv-phase4-restaurant`. Runtime totals are **24 conversations / 75 lines**. `convPage()` renders that view using rich fields; the old Gate 9 standalone override was removed. It does not mutate the full 59-conversation / 185-line registry or use tuple/fallback rendering.

A static execution of the final renderer in index script order produces exactly 24 canonical card IDs and 75 stable line IDs, with zero hidden conversation IDs. This is a source/render audit with a minimal DOM stub, not actual browser QA. Details are shown only for required, matching, useful analyses; non-required lines and generic shells produce no disclosure. Suppressing a generic disclosure does not satisfy the missing required-analysis quality contract.

All **38 non-null Day 1–90 lesson conversation references resolve; missing: 0**. Course lookup continues to use the full source registry. Hidden curriculum-linked conversations need not qualify for the standalone page.

### Strict canonical validation and measured results

| Check | Runtime result |
| --- | --- |
| Exact accepted IDs | Pass: 24 |
| Rich line objects / unique stable IDs | 75 / 75 |
| Japanese, kana readings, authored romaji, source English | 75 / 75 each |
| Meanings, useful roles, usage | 75 / 75 each |
| Japanese-script romaji | 0 |
| FORMAL GRAMMAR | 24 |
| PRODUCTIVE FIXED PHRASE | 26 |
| RECOGNITION PHRASE | 25 |
| Classification invariant | 24 + 26 + 25 = 75; exactly one per line |
| Audio resolves with exact Japanese and reading | 75 / 75 |
| Required analyses resolve with matching Japanese | 37 / 37 |
| Required analyses with useful token explanations | 20 / 37; **17 generic shells** |
| Non-required lines | 38; no Details disclosure |
| Duplicate source line / audio / analysis IDs | 0 / 0 / 0 |
| Curriculum status | Reviewed 90; Authored 0; Draft 0; Total 90 |
| Full-course readability helper | 833 / 833 readings, romaji, meanings; 523 / 523 whole-word kanji readings; 73 / 73 analysis coverage; 100% |
| Assessments / questions | 3 / 79 |

The 17 generic analyses have non-empty token arrays but every token's `meaning` copies its Japanese `surface`, rather than explaining it. A non-empty array alone is insufficient. Affected line IDs:

- `line-c18-01`, `line-c18-02`, `line-c18-03`
- `line-c19-01`
- `line-c20-01`, `line-c20-02`
- `line-conv-phase4-request-01`, `line-conv-phase4-request-03`
- `line-conv-phase4-ongoing-01`, `line-conv-phase4-ongoing-02`
- `line-conv-phase4-permission-01` through `line-conv-phase4-permission-04`
- `line-conv-phase4-restaurant-01` through `line-conv-phase4-restaurant-03`

Each analysis ID is `analysis-` followed by the listed line ID. These defects are in the accepted canonical set, not the hidden backlog. No accepted content was rewritten to conceal the discrepancy. `validateContent()` now correctly returns 17 errors for these shells and no other errors. Useful-analysis detection is a minimum structural guard; authored language quality still needs human review.

Canonical validation enforces exact IDs/counts, rich metadata, kana readings, clean romaji, meaningful roles, boolean analysis requirements, classification totals, exact audio surfaces/readings, and required useful analyses. Full source validation preserves structural and reference checks and rejects duplicate IDs; hidden records are not required to have final rich metadata. Existing curriculum checks, including Gate 9 course contracts, remain in place; an explicit full Day 1–90 readability check was added. Missing course references report validation errors instead of throwing on an undefined conversation.

### Beginner scenario coverage

| Beginner scenario | Canonical examples |
| --- | --- |
| Greetings / introductions | c1 |
| Basic questions | c5, c6, c17, c18 |
| Repetition / clarification | c9 repetition; c10 asking for help |
| Convenience store | c2, conv-phase4-request |
| Restaurant / café | c3, c4, conv-phase4-restaurant |
| Shopping | c14, conv-phase4-permission |
| Directions | c5 |
| Trains / transfers | c6, c7 |
| Taxi | c8 |
| School | c1, c9 |
| Workplace | c10 |
| City hall / basic administration language | c11 |
| Health reception / pharmacy language | c12, c13 |
| Apartment problems | c15 |
| Package / delivery | c16 |
| Reservation | c17 |
| Hobbies | c18 |
| Invitation | c19, c20 |
| Polite refusal | c20 |
| Permission | c14, conv-phase4-permission |
| Ongoing actions | conv-phase4-ongoing |

All requested categories have usable beginner exposure; this is short predictable language practice, not comprehensive scenario mastery. No additional conversations were added to improve coverage.

### Days 1–7: speak/use Japanese early

| Day | Practical input/output route |
| --- | --- |
| 1 — Japanese sounds & greetings | Read vowels and the polite morning greeting; listen/repeat おはようございます; write vowels from recall. |
| 2 — Hiragana あ–こ | Read あい and ここ; recall/write the first two kana rows. |
| 3 — Hiragana さ–と | Read すし and ちいさい with meaning and pronunciation support; recall/write the next rows. |
| 4 — Introducing yourself | Read name/origin examples, hear/repeat 私はメヘディです, and type a short self-identification model. |
| 5 — Hiragana な–ほ | Read はな and 私は学生です; distinguish は sound use; recall/write kana. |
| 6 — Numbers 0–100 | Understand numbers/prices; hear/repeat phone digits; type よんじゅうに. |
| 7 — Hiragana ま–ん | Read わたし and ほん; recall/write the remaining basic kana. |

Every early day provides meaningful Japanese use. The sequence starts listening/speaking on Day 1 and self-introduction on Day 4. There is no release-blocking early-use gap; equal four-skill coverage each day is not required. No early lessons were redesigned. Playback and interactive task behavior remain unverified in an actual browser.

### POST-V1 CONVERSATION ENRICHMENT BACKLOG

**35 conversations / 110 lines** remain in source and are hidden from the standalone page. These are deferred enrichment records, not broken standalone production content. Some continue serving curriculum/internal source purposes. V1.1 or later may author full readings/romaji, improve roles, replace heuristic classifications, improve analyses and audio metadata, then promote qualified records into the standalone library. Full 59/185 enrichment is explicitly deferred.

### Validation and next step

`node --check` was run for every file in `js/` and `data/`, and the audit script. `git diff --check` passes. `node scripts/audit-gate13c.cjs` runs source composition, `validateContent()`, actual final-renderer markup assertions, backlog non-leak checks, registry checks, curriculum/assessment regressions, and negative checks for romaji/audio/reference/eligibility damage. Static assertions pass; it intentionally exits 1 because content validation reports the 17 unresolved canonical analysis shells. Hidden missing romaji alone does not fail V1 validation.

Gate 13 remains **NOT READY**. The next bounded work is repairing those 17 required canonical analyses, then rerunning Gate 13C. Gate 14 — Real Browser / Device QA follows only after Gate 13 is COMPLETE FOR V1. Actual browser QA is **NOT PERFORMED**.


## Gate 13C1 — Canonical Analysis Repair

**Result: COMPLETE FOR V1. Gate 13: COMPLETE FOR V1. Actual browser QA: NOT PERFORMED.**

Gate 13C correctly narrowed the standalone V1 scope to 24 conversations / 75 lines and correctly stopped on 17 generic required analyses. Its NOT READY result above remains part of the audit trail. This bounded repair closes that blocker; it does not claim full 59/185 enrichment.

### Before-repair manifest

The existing `scripts/audit-gate13c.cjs` and final index-order runtime registry confirmed exactly 17 failures before edits. An internal manifest captured each analysis ID, canonical line ID, conversation ID, Japanese, kana reading, romaji, natural English, token count, and failure reason. All 17 had token meanings copied directly from Japanese surfaces. All protected surfaces/readings/romaji matched their canonical lines; no source mismatch required a stop. The exact manifested records were:

| Analysis ID | Japanese | Original token count |
| --- | --- | --- |
| `analysis-line-c18-01` | 趣味は何ですか。 | 3 |
| `analysis-line-c18-02` | ゲームと写真が好きです。 | 4 |
| `analysis-line-c18-03` | 私もゲームが好きです。 | 3 |
| `analysis-line-c19-01` | 土曜日、映画を見ませんか。 | 3 |
| `analysis-line-c20-01` | 今日、一緒に食べませんか。 | 3 |
| `analysis-line-c20-02` | すみません。今日はちょっと…。 | 3 |
| `analysis-line-conv-phase4-request-01` | ここに名前を書いてください。 | 6 |
| `analysis-line-conv-phase4-request-03` | 少々お待ちください。 | 2 |
| `analysis-line-conv-phase4-ongoing-01` | 今、何をしていますか。 | 5 |
| `analysis-line-conv-phase4-ongoing-02` | コーヒーを飲んでいます。 | 3 |
| `analysis-line-conv-phase4-permission-01` | このシャツを見てもいいですか。 | 5 |
| `analysis-line-conv-phase4-permission-02` | はい、どうぞ。 | 2 |
| `analysis-line-conv-phase4-permission-03` | 写真を撮ってもいいですか。 | 4 |
| `analysis-line-conv-phase4-permission-04` | すみません、いけません。 | 2 |
| `analysis-line-conv-phase4-restaurant-01` | ご注文は？ | 2 |
| `analysis-line-conv-phase4-restaurant-02` | 水をお願いします。 | 3 |
| `analysis-line-conv-phase4-restaurant-03` | コーヒーとケーキをお願いします。 | 5 |

For each row, the line ID is the analysis ID without `analysis-`; conversation IDs are c18/c19/c20 or the corresponding `conv-phase4-*` prefix. Only these 17 analyses received content repairs.

### Repairs and accounting

All 17 records were upgraded in place with 64 meaningful chunks in total: authored kana readings and Latin-script romaji, English meanings, contextual roles, useful structural translations, and visible usage notes. No canonical line Japanese, English, reading, romaji, role, classification, usage, audio ID, or other line field changed. All 17 analysis IDs, Japanese, readings, romaji, and audio IDs were preserved.

Topic は, object を, noun-joining と, additive も, preference が, placement に, and question か receive contextual explanations. Invitation, ongoing-action, request, and permission verbs include relevant base forms and paths. 好きです is explained as a polite な-adjective preference expression. Fixed phrases such as お待ちください, どうぞ, いけません, and お願いします stay intact where decomposition would distract a beginner. 今日はちょっと… retains its natural indirect-refusal meaning with a separate structural explanation.

Passing canonical analyses were inspected as schema references; their whole-sentence chunks were not copied as linguistic content. The existing Day 25 七時に起きます analysis provided a more detailed model for contextual particle roles and base-form/conjugation fields. The requested c18–c20 and Phase 4 analyses were themselves the failing records, so they could not serve as passing examples before this repair.

A direct reference defect was also found: the other 20 required canonical analyses lacked `analysis.audioId`, although their lines already had matching audio targets. Under the explicit reference/invariant exception, these 20 records received only their existing line audio IDs. Their content was unchanged. No audio targets were added or modified.

| Registry accounting | Actual |
| --- | --- |
| Before | 150 |
| Existing manifested records | 17 / 17 |
| Content upgrades | 17 |
| Additional audio-reference-only fixes | 20 |
| Total existing records changed | 37 |
| New | 0 |
| Removed | 0 |
| After | 150 |
| Invariant | 150 = 150 + 0 - 0 |

### Validator and verification

The useful-analysis check now rejects a copied Japanese-surface meaning on **any** token, even if another token is translated. It still accepts meaningful multiword chunks without an arbitrary minimum token count. Required analyses also validate their audio references and sentence/token reading-romaji presence, rejecting Japanese script in romaji. Non-required lines remain exempt from analysis requirements.

The existing audit script now checks the exact 17 repair IDs, all 37 required registry occurrences, exact Japanese, audio resolution and surface matching, token meanings/readings/romaji, relevant particle pronunciations and verb/adjective forms. Negative checks confirm rejection of a single copied token meaning, Japanese token romaji, and missing analysis audio; prior scope/filter/reference regression checks remain. Snapshot comparisons verified unchanged canonical conversations and Days 1–7, preserved protected analysis fields, no changes outside the 17 records except the 20 audio-reference fixes, and unchanged registry membership.

| Final runtime check | Result |
| --- | --- |
| Required / resolved / useful analyses | 37 / 37 / 37 |
| Generic / missing required analyses | 0 / 0 |
| Japanese-surface token meanings among required analyses | 0 |
| Required analysis Japanese exact matches | 37 / 37 |
| Required analysis audio references resolve and match | 37 / 37 |
| Duplicate analysis IDs | 0; each required ID occurs exactly once |
| Repaired token readings / authored romaji / English meanings | 64 / 64 each |
| Japanese script in required sentence/token romaji | 0 |
| Canonical conversations / lines | 24 / 75 |
| Hidden backlog conversations / lines | 35 / 110 |
| Backlog leakage into final standalone markup | 0 |
| Rich objects / stable IDs / readings / romaji / meanings / roles / usage | 75 / 75 each |
| Displayed Japanese-script romaji | 0 |
| Displayed audio with exact text and reading | 75 / 75 |
| FORMAL GRAMMAR / PRODUCTIVE FIXED PHRASE / RECOGNITION PHRASE | 24 / 26 / 25 |
| Classification invariant | Runtime total 75 = displayed line count 75 |
| Reviewed / Authored / Draft / Total | 90 / 0 / 0 / 90 |
| Daily Course readability | 100%; existing full-course helper remains unchanged |
| Day 1–90 conversation references resolved / missing | 38 / 0 |
| Assessments / questions | 3 / 79 |
| Day 89 | Unchanged; reviewed with practice and quiz; validation passes |
| Days 1–7 early use | Prior no-release-blocking-gap finding preserved; no lesson changes |

`node --check js/*.js`, `node --check data/*.js`, and `node --check scripts/*.cjs` were run, followed by individual syntax checks for every matching file. `validateContent()` returns zero errors. `node scripts/audit-gate13c.cjs` exits 0 with static checks PASS and COMPLETE FOR V1. `git diff --check` passes. No staging, commit, push, branch change, or history rewrite was performed.

### Release boundary

The learner-facing standalone V1 conversation library satisfies the approved 24/75 contract. The POST-V1 CONVERSATION ENRICHMENT BACKLOG remains 35 conversations / 110 lines; full 59/185 enrichment remains deferred. No backlog records were migrated, no curriculum or pages redesigned, and no browser/device QA performed.

**Next recommended gate: Gate 14 — Real Browser / Device QA.** It must run as a separate task and has not been implemented here.
