# Content Model

Content is separated by learning domain. Records are static and status-independent; learner state belongs in `js/state.js` and is persisted locally.

## Lesson schema

`data/course.js` is the canonical composition source. Each day has a stable `n5-day-###` ID, `level`, `day`, phase metadata, `status` (`draft`, `authored`, or `reviewed`), timing, prerequisites, objectives, `romajiPolicy`, explicit `vocabularyIds`, `grammarIds`, `kanaIds`, `kanjiIds`, examples, an optional `conversationId`, life/culture references, tip, practice items, lesson quiz questions, and review targets.

```js
{ id: 'n5-day-006', level: 'N5', day: 6, status: 'draft',
  vocabularyIds: ['vocab-number-42'], grammarIds: [], kanaIds: [], kanjiIds: [],
  examples: [{ japanese: '', reading: '', romaji: '', english: '', note: '' }],
  conversationId: null, practice: [], quiz: [], reviewTargets: [] }
```

`PracticeItem` uses `id`, `type`, `instruction`, `prompt`, `answer`, and `explanation`. `QuizQuestion` uses `id`, `type`, `skill`, `prompt`, `options`, `answer`, `explanation`, and optional `reviewTargets`. A `ReviewTarget` identifies a shared record with `{ type: 'vocabulary', id: '...' }` (or grammar, kanji, kana). References resolve safely and missing records are reported to the console without breaking learner views.

Existing compact library IDs are preserved for localStorage compatibility. New audited content should use stable human-readable IDs such as `vocab-watashi`, `grammar-wa-topic`, and `kanji-ichi`.

Lessons may use `status: 'reviewed'` only after curriculum, Japanese, and dependency review. Phase 1's audit matrix is recorded in `docs/PHASE1_AUDIT.md`.
