# Days 21–40 Retrofit Audit

## Result

Gate 8 retrofit complete/finalized for the reviewed grammar-building phase. Days 41–80 and Days 81–90 were not changed.

## Day-by-day result

21 — topic は: particle pronunciation/function, sentence analysis, speaking, ordering.
22 — questions か: statement-to-question contrast, listening, speaking, writing.
23 — possession の: possession and association, word-by-word sentence support.
24 — object を: を → o, object + を + verb production.
25 — time に: existing 七時に起きます gold-standard retained and 九時 practice added.
26 — destination へ/に: へ → e and reviewed destination contrast.
27 — action location で: action-location versus destination contrast.
28 — と: authored and/with examples and production.
29 — も: は versus も contrast and production.
30 — あります/います: inanimate versus animate existence and listening distinction.
31 — verb groups: authored dictionary/polite examples and exceptions.
32 — present polite: base-to-ます relationship and production.
33 — negative polite: ます → ません contrast.
34 — past polite: ます → ました contrast.
35 — past negative: ませんでした as an authored polite past-negative form.
36 — い-adjectives: reviewed adjective sentence and production.
37 — な-adjectives: predicate/modifier distinction and きれい, 好き, 嫌い support.
38 — adjective forms: authored negative/past examples without generated conjugation.
39 — question words: placement in reviewed questions and speaking.
40 — checkpoint: transfer practice across particles, verb forms, adjectives, and questions.

## Universal readability metrics

For Days 21–40, the deterministic audit reports:

- `dailyCourseItemCount`: 371
- `itemsWithReading`: 371 / 371 (100%)
- `itemsWithRomaji`: 371 / 371 (100%)
- `itemsWithMeaning`: 371 / 371 (100%)
- `kanjiItemCount`: 203
- `kanjiItemsWithWholeWordReading`: 203 / 203 (100%)
- `analysisRequiredCount`: 34
- `analysisCoveredCount`: 34 / 34 (100%)

## Grammar, morphology, and particles

Particle pronunciation is authored contextually: は → wa, を → o, and へ → e. Grammar patterns are rendered with readable support rather than unexplained Japanese labels. Verb group examples preserve the reviewed classifications 帰る Group 1, 起きる Group 2, 寝る Group 2, する irregular, and 来る irregular. The ます, ません, ました, and ませんでした relationships are authored, not generated. Adjective types and transformations remain distinct.

## Audio, speaking, writing, and dictation

Twenty new audio targets, twenty new speaking tasks, and twenty new writing tasks were added. New audio uses Japanese TTS fallback with no fake assets. Writing moves from sentence ordering and typing into particle, verb-form, adjective, and checkpoint production. Day 40 provides dictation infrastructure through the existing Gate 3 audio engine.

## Conversation and quiz audit

Days 21–40 conversation IDs and existing quiz content were preserved. No genuine quiz defect or review-target runtime defect was found requiring a generic quiz-engine rewrite. Lesson-level assessment signals remain separate from normal quiz history.

## Limitations and QA

Native curated audio and complete conversation-line metadata remain future work. Actual browser QA for Gates 2–8 remains NOT PERFORMED; manual QA is required for particle pronunciation, morphology display, audio, speaking, writing, dictation, responsive layouts, and themes.
