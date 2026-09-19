# Nihon Path V1 Release Assessment

Assessment date: 2026-09-19  
HEAD: `36d3331631c355c210a6d96472fa81e30e5f1874` (`feat: complete learning surfaces with audio practice and kanji details`)

## Product scope

Nihon Path is a static, direct-`file://` beginner Japanese product: a reviewed 90-day JLPT N5 foundation with practical Japanese for everyday situations. It covers reading, comprehension, speaking practice, writing production, conversations, assessments, review evidence, and local progress. It does not claim fluency, official JLPT certification, pronunciation scoring, handwriting recognition, cloud accounts, or complete N4–N1 coverage.

## Gate status

**GATE 15: READY FOR V1 FREEZE.** P0 issues: 0. P1 issues: 0. P2/P3 items remain documented below and do not prevent beginner use.

Gate 12 remains finalized. Gate 13 remains complete for the bounded 24-conversation / 75-line V1 scope. Gate 14 is supported by user-performed manual Chrome QA recorded in [BROWSER_QA.md](BROWSER_QA.md); Codex did not perform that browser QA.

## Release inventory

| Surface | Final count / coverage |
| --- | ---: |
| Lessons | 90; 90 Reviewed, 0 Authored, 0 Draft |
| Kana | 142; focused practice and audio 142/142 |
| Vocabulary | 377; required fields, focused practice, and audio 377/377 |
| Kanji | 91; Details, focused practice, and example-word audio 91/91 |
| Grammar | 105; required fields, focused practice, and example audio 105/105 |
| Canonical conversations | 24 / 75 lines |
| Source conversation backlog | 35 / 110 lines, hidden from standalone rendering |
| Audio targets | 805 total: 0 native assets, 805 browser TTS fallbacks |
| Speaking tasks | 91 |
| Writing tasks | 88 |
| Assessments | 3 / 79 questions |
| Reading passages | 8 |
| Life phrases | 44 |

Audio registry accounting is baseline 209 + 596 added, with 171 reused, 0 duplicate IDs, and 0 broken targets. Required Kana, vocabulary, Kanji example-word, grammar example, Life, Reading, conversation, and assessment references resolve. The 805 count is not a claim of 805 studio recordings.

## Evidence and audits

The complete 90-lesson source smoke audit passes: days 1–90 are unique and in range; fresh state starts at Day 1; Day 1 completion advances to Day 2; completion persists under `nihonPathN5_v1`; preview does not write learner progress; and a fully completed state remains on Day 90 with no Day 91.

Daily Course readability covers 833 items: 833/833 have readings, romaji data, and meanings; 523/523 Kanji-containing items have whole-word readings; 73/73 required analyses are covered. Kana, vocabulary, Kanji, and grammar focused builders cover every final item. Representative generated, focused, lesson, mixed, and final quizzes have nonempty questions, unique options, exactly one answer, stable keys, and defined prompts/answers.

Kanji Details cover all 91 records with source character, meaning, strokes, On/Kun data, mnemonic, example word, and whole-word reading. The writing self-check route is available from all 91 detail records; the authored reusable Kanji self-check task inventory contains one canvas task. Five Kanji reuse five authored analysis contexts. No fabricated stroke order, radicals, etymology, pitch accent, or isolated “correct” reading is introduced.

The source architecture remains ordered classic JavaScript and local data: 53 script references resolve, no ES-module dependency or mandatory `fetch()` exists, and the app has no server or network submission requirement. Culture has 24 nonempty records. Reading options and answers, Life phrase routes, safety tips, and assessment question records validate; the production self-check question is intentionally answerless and excluded from objective scoring.

## Browser QA evidence

The release record distinguishes **user-performed manual Chrome QA on macOS** from Codex static/source audits. The user reported PASS for Day 1 → Day 2 unlock, refresh persistence, Dev Preview, major pages, audio, Speaking recording, Writing, Assessments, Romaji, themes, mobile UI, and 0 uncaught application errors. After the learning-surface repair, the user additionally reported PASS for Kana, Vocabulary, Kanji Details, Grammar, Life, Reading, Quick Practice categories, lesson-item practice, Lesson quiz, Writing regression, Speaking regression, Assessment regression, and 0 uncaught application errors. This does not claim that Codex opened all 90 lessons individually in a browser; all 90 were source/static smoke-validated and representative learner flows were manually browser-tested by the user.

## Issues

### P0

None found.

### P1

None found.

### P2

- The current registry uses browser Japanese TTS fallbacks rather than a complete native-human audio library. Twenty-eight legacy speaking prompts have no dedicated model-audio target; the shared renderer now omits absent controls safely, while their model text, recording, and self-rating paths remain usable.
- Review is targeted wrong-versus-correct review, not a full scheduled SRS.
- Writing and Kanji drawing are learner self-checks without automatic handwriting scoring; the product makes no such claim.

### P3

- Legacy renderer definitions remain in the ordered classic-script architecture and are superseded by later owners; they are harmless runtime technical debt.
- `legacySpeakPage` and `legacyPracticePage` references remain for compatibility. There is one authoritative `nextDay()` and one `prefs()` definition.
- An ignored local `.DS_Store` exists in the workspace but is not tracked by Git.

## V1 limitations and deferred V1.1 candidates

Deferred candidates are complete native-human audio, advanced SRS, automatic pronunciation scoring, automatic handwriting scoring, complete stroke-order animation/assets, the 35-conversation / 110-line backlog, N4+ content, cloud sync and accounts, a backend, and complete deep linguistic analysis for every library item. None is required to freeze this V1.

## Release conclusion

The current repository satisfies the Gate 15 release rule: P0 = 0, P1 = 0, the 90-day reviewed curriculum is intact, Gate 12 and Gate 13 remain valid, Practice and learning-surface audits pass, required references resolve, manual Chrome evidence is documented truthfully, console QA is reported as zero uncaught application errors by the user, static validation passes, normal learner UI hides developer controls unless `?dev=1` is present, and product claims remain qualified. Gate 16 is next; this assessment does not perform freeze, tagging, release, or deployment.
