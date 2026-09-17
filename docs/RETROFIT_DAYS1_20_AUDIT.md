# Days 1–20 Retrofit Audit

## Result

Gate 7 retrofit complete for the reviewed Days 1–20. All 20 lessons remain reviewed; no Days 21–80 or Days 81–90 content was changed.

## Per-day summary

1. Sounds/greetings: vowel rhythm, greeting analysis/audio/speaking, light vowel writing.
2. Hiragana あ–こ: explicit authored kana production set and kana audio.
3. Hiragana さ–と: authored し・ち・つ breakdown, audio, and production.
4. Self-introduction: sentence/origin analysis, audio, speaking, and typing.
5. Hiragana な–ほ: explicit production set and sound exposure.
6. Numbers: existing 五十円 analysis retained; number audio, speaking, and typing.
7. Hiragana ま–ん: full remaining base-hiragana production set and sound exposure.
8. Dakuten/handakuten: voiced contrast audio, speaking, and written-form production.
9. Small kana/っ: authored explanation, audio, speaking, and typing.
10. Survival Japanese: fixed survival phrase analysis/audio/speaking/typing.
11–15. Katakana: explicit base and voiced production sets with sound exposure.
16. Long vowels: コーヒー analysis/audio/speaking/typing.
17. Names/countries: approximate-name reading, audio, speaking, and typing.
18. Demonstratives/where: sentence analyses, audio, speaking, ordering.
19. Noun sentences: positive/negative/question analyses, audio, speaking, ordering.
20. Checkpoint: existing checkpoint examples remain; dictation, speaking, and writing practice added.

## Coverage

18 analyses were available after retrofit, 26 audio targets, 16 speaking tasks, and 28 writing tasks. The 20 new audio targets all use Japanese TTS fallback with no fabricated assets. Analysis is selective: isolated kana, fixed chunks, and recognition-only material remain lighter where deeper grammar would overload beginners.

Kana production uses explicitly authored target sets: all 46 base hiragana and all 46 base katakana are represented, plus dakuten/handakuten, small kana, small っ, and long-vowel practice. This is learner production, not stroke-order grading.

The hierarchy is sentence → word → grammar/form → character. Whole words remain primary; kanji character details are added only where useful. Okurigana and morphology are not fabricated for early kana lessons.

## Conversations and quizzes

Days 1, 4, 6, 10, 17, 18, and 19 retain their original conversation IDs and readable tuple/object content. Lesson-specific practice now provides audio/speaking routes without redesigning the global conversation library. Existing quizzes were audited structurally; no quiz repair was required and no quiz IDs changed.

## Validation and dependencies

The targeted validator confirms every Day 1–20 lesson remains present, reviewed, and connected to resolved analysis/audio/speaking/writing records with valid skill targets. Infrastructure counts remain separate from normal quiz history. No future lesson dependency was introduced.

## Known limitations

Curated audio assets remain incomplete; TTS is temporary fallback infrastructure. Stroke counts exist, but official stroke-order assets do not. Writing target sets are explicit but do not preserve pixel drawings. Actual browser QA for Gates 2–7 remains NOT PERFORMED and manual QA is required.

## Universal Daily Course readability audit — Gate 7B finalization

The reusable `renderLearningItem()` renderer now presents Daily Course materials with authored Japanese, kana reading, romaji, meaning, and progressive Details support. Romaji display obeys the global preference; kana reading remains visible when Romaji is Off. The deterministic Days 1–20 audit reports:

- `dailyCourseItemCount`: 171
- `itemsWithReading`: 171 / 171 (100%)
- `itemsWithRomaji`: 171 / 171 (100%)
- `itemsWithMeaning`: 171 / 171 (100%)
- `kanjiItemCount`: 49
- `kanjiItemsWithWholeWordReading`: 49 / 49 (100%)
- `analysisRequiredCount`: 12
- `analysisCoveredCount`: 12 / 12 (100%)

Single kana are excluded from the multi-character count because the canonical kana component already displays the character and its sound. No runtime furigana generation, token splitting, or romanization engine was added. Gate 7 is complete/finalized for the Days 1–20 readability contract.
