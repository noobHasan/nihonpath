# Nihon Path Content Model V2

This is the additive V2 specification for the static ordered-script application. Existing Days 1–80 remain valid and render through their current fields.

## Current model

`data/course.js` owns lesson composition: stable IDs, titles, status, prerequisites, objectives, explicit library references, examples, practice, quizzes, and review targets. Vocabulary, grammar, kana, kanji, conversations, speaking, Life in Japan, culture, and reading are separate static arrays. Most Japanese currently appears as `{ japanese, reading, romaji, english }` examples, positional conversation lines, or simple record fields. Learner state is separate in `js/state.js` and localStorage.

## Analysis storage decision

Use the implemented shared authored analysis registry in `data/analysis.js`, exposed as `japaneseAnalyses`, and reference records with stable `analysisId` values. Content-specific one-offs may be inline only when reuse is not useful, but shared IDs are the primary approach. `getJapaneseAnalysis(id)` performs deterministic ID lookup, returns `null` for absent/unavailable IDs, and does not mutate registry data. This avoids text-as-key lookup, array-position coupling, automatic tokenization, and duplicated explanations while remaining deterministic and `file://` compatible.

## SentenceAnalysis

```js
{
  id: 'analysis-asa-shichiji-okimasu',
  japanese: '朝、七時に起きます。',
  reading: 'あさ、しちじに おきます。',
  romaji: 'asa, shichiji ni okimasu',
  naturalEnglish: 'In the morning, I wake up at seven.',
  literalEnglish: 'Morning, at seven, wake up.',
  tokens: [], pronunciationNote: 'しちじ is read shichiji.',
  usageNote: 'に marks a specific time.'
}
```

`analysisId` is optional on examples, dialogue lines, reading items, vocabulary/grammar examples, speaking phrases, Life in Japan phrases, and important quiz explanations/model answers. The Gate 2 sample attaches IDs only to seven existing reviewed lesson examples.

## AnalysisToken

```js
{
  surface: '起きます', reading: 'おきます', romaji: 'okimasu',
  meaning: 'wake up', role: 'polite verb', vocabularyId: 'vocab-wake',
  grammarId: 'grammar-masu-nonpast', baseForm: '起きる', partOfSpeech: 'verb',
  conjugation: '起きる → 起きます', note: 'polite non-past'
}
```

Token boundaries are authored intentionally. Chunks such as `それから`, `朝ご飯`, `日本語`, `お願いします`, and `～てもいいですか` must not be split by characters, spaces, regexes, English order, or array offsets.

## Character / kanji details

```js
{ character: '起', type: 'kanji', readingInWord: 'お', coreMeaning: 'rise / wake',
  kanjiId: 'kanji-...', strokeCount: 10, note: 'Learn this reading through 起きる.' }
```

`type` is `hiragana`, `katakana`, or `kanji`; fields are optional. Whole vocabulary words remain primary. Character decomposition supports memory and recognition, never blind character-by-character translation.

## Morphology / conjugation

```js
{ baseForm: '行く', currentForm: '行って', formLabel: 'て-form',
  transformation: '行く → 行って', grammarId: 'grammar-te-form' }
```

Forms and transformations are authored. This gate does not conjugate arbitrary Japanese algorithmically.

## Gold-standard word-first example

The implemented Day 25 analysis for `七時に起きます。` demonstrates the intended order: sentence → words/tokens → grammar and morphology → selective writing detail.

```js
{
  japanese: '七時に起きます。',
  tokens: [
    { surface: '七時', reading: 'しちじ', meaning: 'seven o’clock', role: 'time expression' },
    { surface: 'に', reading: 'に', meaning: 'at', role: 'specific-time particle', grammarId: 'grammar-ni-time' },
    { surface: '起きます', reading: 'おきます', meaning: 'wake up', role: 'polite verb',
      baseForm: '起きる', conjugation: '起きる → 起きます' }
  ],
  characters: [
    { word: '七時', character: '七', type: 'kanji', readingInWord: 'しち', coreMeaning: 'seven' },
    { word: '起きます', character: '起', type: 'kanji', readingInWord: 'お', coreMeaning: 'rise / get up' },
    { word: '起きます', character: 'き', type: 'hiragana', role: 'okurigana' },
    { word: '起きます', character: 'ます', type: 'hiragana', role: 'polite ending' }
  ]
}
```

Character details follow the whole-word explanation. They support spelling recognition; they do not claim that individual character meanings compose into a guaranteed translation.

## AudioTarget

```js
{ id: 'audio-...', text: '朝、七時に起きます。', reading: 'あさ、しちじに おきます。',
  lang: 'ja-JP', asset: 'audio/....mp3', ttsFallback: true,
  slowRate: 0.75, naturalRate: 1, speaker: 'speaker-a', transcript: '...',
  transcriptPolicy: 'hidden-until-reveal' }
```

Real assets are preferred for core listening, conversations, Days 86, 88, and 90. TTS is a fallback only; visible text never counts as listening practice.

The implemented registry is `data/audio.js`, exposed as `audioTargets`; `getAudioTarget(id)` performs null-safe stable-ID lookup. A target must have either a static `asset` or `ttsFallback: true`. `transcriptPolicy` is `visible`, `hidden-until-reveal`, or `hidden`. Analysis records may reference an optional `audioId`.

## WritingTask

## Learning item / Daily Course readability

Daily Course learner-facing Japanese uses the reusable `renderLearningItem()` renderer in `js/learning-item.js`. A learning item has authored `japanese` surface, `reading`, `romaji`, `meaning`, and optional `analysisId`, `audioId`, `classification`, and authored sound spelling/details. Canonical vocabulary/kana/kanji records are reused where their readings are authoritative; sentence and phrase examples use authored lesson fields. Romaji display follows the global preference while authored reading data remains available. The Days 1–20 audit reports measurable coverage for multi-character items and whole-word readings for kanji-bearing items. Runtime furigana generation, runtime romanization, and automatic Japanese tokenization are not used.

```js
{ id: 'write-...', type: 'type-reading', instruction: 'Type the reading.',
  prompt: '起きます', target: 'おきます', acceptableAnswers: ['おきます'],
  hint: 'Use kana.', analysisId: 'analysis-...', audioId: 'audio-...',
  reviewTargets: [{ type: 'vocabulary', id: 'vocab-wake' }], required: true }
```

Supported types: `kana-trace`, `kana-recall`, `kanji-trace`, `kanji-self-check`, `type-reading`, `type-japanese`, `sentence-order`, `dictation`, and `free-short-response`.

Gate 4 implements `data/writing-tasks.js`, exposed as `writingTasksV2`, with `getWritingTask(id)` for stable, null-safe lookup. The bounded runtime types are `kana-trace`, `kana-recall`, `kanji-self-check`, `type-reading`, `type-japanese`, `sentence-order`, `dictation`, and `free-short-response`. Typed reading/Japanese, authored sentence ordering, and dictation are automatically checked against normalized `acceptableAnswers`; handwriting, kanji production, and free response are explicitly self-checked. Canvas drawing uses responsive high-DPI Pointer Events and is never persisted. Sentence ordering uses authored `units` and `order`; Japanese IME remains the device's responsibility. Dictation reuses Gate 3 `audioId` and hides its transcript until attempt/reveal. Writing metadata only is stored in `writingPractice`.

```js
writingPractice: {
  'writing-day025-type-reading': {
    attempts: 1, correct: 1, incorrect: 0, selfRating: null,
    completed: true, lastPracticed: '2026-09-17T00:00:00.000Z'
  }
}
```

## Speaking / shadowing task

```js
{ id: 'speak-...', type: 'shadowing', prompt: 'Repeat the line.',
  modelText: 'もう一度お願いします。', analysisId: 'analysis-...', audioId: 'audio-...',
  role: 'learner', hideTextInitially: true, required: true,
  reviewTargets: [{ type: 'grammar', id: 'grammar-request' }] }
```

Types include `listen`, `repeat`, `record`, `playback`, `self-rate`, and `role-play`. Gate 3 implements session-only MediaRecorder support for the representative tasks; richer task types remain future work.

The implemented representative registry is `data/speaking-tasks.js`, exposed as `speakingTasksV2`. Gate 3 supports the bounded types `repeat`, `shadow`, `say-without-looking`, and `role-play`; the legacy tuple-based `speaking` library remains unchanged.

Speaking recordings are never part of persisted state. Only metadata is stored:

```js
speakingPractice: {
  'speaking-day025-seven-oclock': {
    attempts: 1, selfRating: 'Okay', completed: true,
    lastPracticed: '2026-09-17T00:00:00.000Z'
  }
}
```

Blob data and object URLs remain in memory for the current browser session only. Microphone access begins only after an explicit recording action.

## Assessment

```js
{
  id: 'assessment-mock-a', title: 'Mock test A', kind: 'internal-readiness',
  sections: [{ id: 'reading', title: 'Reading', questionIds: [], reviewTargets: [] }],
  timeLimit: 45, readinessThresholds: { overall: 0.75, reading: 0.7 },
  questionIds: [], sectionScores: {}, reviewTargets: [],
  retakeHistory: [{ attemptedAt: '...', sectionScores: {}, weakDomains: [] }],
  weakDomains: []
}
```

Sections may cover vocabulary/orthography, grammar, sentence composition, reading, information retrieval, listening, and practical communication. Internal results are not official JLPT scores.

Gate 5 implements `data/assessments.js` as `assessmentsV2` with `getAssessment(id)`. An assessment has authored sections (`id`, `title`, `kind`, `instructions`, `questions`) and authored questions using the bounded types `multiple-choice`, `typed-answer`, `sentence-order`, `reading-multiple-choice`, `information-retrieval`, `listening-multiple-choice`, `practical-response-choice`, and `self-check-production`. Questions may reference `analysisId`, `audioId`, `passage`/`stimulus`, `reviewTargets`, and `points`. Objective questions produce points, section percentages, and total percentages; self-check production contributes only `productionCompletion` and never objective correctness. Optional thresholds are internal 0–100 readiness thresholds. Completed attempts are retained in `assessmentHistory`, including weak domains and review targets; this is compatible with future Day 89 repair logic but does not implement Day 89.

## Lesson V2 optional fields

The minimum coherent optional set is `analysisIds`, `audioIds`, `writingTasks`, `speakingTasks`, `listeningTasks`, `completionCriteria`, `skillTargets`, and `assessmentId`. Existing lesson fields remain authoritative until retrofit.

## Four-skill metadata

```js
skillTargets: { reading: true, writing: false, listening: false,
  speaking: true, grammar: true, practical: false }
```

This records intended evidence domains for future Progress calculations; it does not calculate readiness.

## Completion, mastery, and spaced review

```js
lessonProgress: {
  'n5-day-081': { completed: true, quizScore: 82, practiceComplete: true,
    writingComplete: false, listeningComplete: true, speakingComplete: false,
    mastery: 'needs-review', completedAt: '...', attempts: 2 }
}
```

`mastery` is `completed`, `mastered`, or `needs-review`. Future due-based review records may be `{ lastReviewed, intervalDays, nextDue, lapses, confidence }`. Legacy day completion and wrong/correct quiz history remain readable during migration.

## Implemented renderer

`renderJapaneseAnalysis(analysisOrId)` is shared UI code in `js/analysis-ui.js`. Lesson examples use the existing Japanese/English markup and are progressively decorated with a native `<details>` panel when their `analysisId` resolves. The panel conditionally shows reading, romaji, natural and literal meaning, authored token cards, linked vocabulary/grammar summaries, authored character details, pronunciation, and usage notes. It never exposes raw IDs. Romaji uses the existing `.romaji` / `.hideRomaji` preference mechanism. Missing IDs omit the panel and preserve the legacy example.

## Migration rules

All V2 fields are optional. Renderers must use existing Japanese/reading/English fields when analysis, audio, writing, or speaking data is absent. No reviewed lesson is rewritten merely to satisfy the schema. Retrofit gates add authored data in controlled batches and validate each batch before promotion.
