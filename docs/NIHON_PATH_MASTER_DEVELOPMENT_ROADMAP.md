# Nihon Path — Master Development Roadmap

**Project goal:** take a true zero-Japanese beginner through a structured 90-day foundation that develops **reading, writing, listening, speaking, grammar control, practical survival Japanese, and JLPT N5 readiness**, while preparing the learner to continue immediately into N4.

**Repository status when this roadmap was created:** Days 1–80 reviewed; Days 81–90 draft. Current application is a static browser-based app using ordered classic scripts, localStorage progress, deterministic lesson composition, shared learning libraries, quizzes, review, developer preview, and responsive light/dark UI.

---

## 1. North-star learning outcome

A learner who truly completes Nihon Path should be able to:

- Read hiragana and katakana directly without depending on romaji.
- Write kana from memory and write a bounded set of core beginner kanji and vocabulary.
- Understand common beginner words, particles, verb/adjective forms, sentence patterns, signs, notices, menus, schedules, and short messages.
- Understand slow, clearly spoken beginner Japanese in predictable everyday situations.
- Produce short polite Japanese sentences without only memorizing fixed English-to-Japanese translations.
- Ask for repetition, clarification, help, prices, directions, permission, appointments, and services.
- Handle beginner interactions in shops, restaurants, stations, taxis, housing, utilities, work/school, city hall, hospital/pharmacy, and basic emergencies.
- Complete N5-style vocabulary, grammar, reading, and listening tasks with a documented internal readiness threshold.
- Know which weak topics remain before moving into N4.

Nihon Path should be presented as a **strong beginner / N5 + Japan survival foundation**, not as full independence or fluency in Japan.

---

## 2. Universal content-depth and Daily Course readability contract — applies to Days 1–90

Every learner-facing Japanese item inside Daily Course must provide an authored surface form, kana reading, pronunciation/romaji, and natural English meaning. Romaji display follows the learner preference, but authored romaji data remains required. This applies retroactively to Days 1–80 and must be built into Days 81–90 from the start. Additional explanation is progressive and item-appropriate rather than an always-expanded wall of detail.

### 2.1 Sentence breakdown contract

For every important sentence, dialogue line, reading sentence, sign, notice, quiz explanation, and model answer, support:

1. **Japanese surface text**
2. **Kana reading**
3. **Optional romaji** controlled by the existing Romaji setting
4. **Natural English meaning**
5. **Literal / structural meaning** when useful
6. **Word-by-word tokens**
7. **Particle / grammar role** for each functional item
8. **Base form** for inflected verbs/adjectives
9. **Conjugation path** when the form is relevant to the lesson
10. **Character / kanji breakdown** for new or important written forms
11. **Pronunciation note** where sound change, long vowel, small っ, ん, devoicing, or irregular reading matters
12. **Usage / pragmatics note** when literal translation is misleading

Example target:

> 朝、七時に起きます。
>
> Reading: あさ、しちじに おきます。
>
> Natural: In the morning, I wake up at seven.
>
> Tokens: 朝 = morning / 七時 = seven o'clock / に = time particle / 起きます = wake up
>
> Verb: 起きる → 起きます
>
> Pattern: time + に + action

### 2.2 Word breakdown contract

Every vocabulary entry should support:

- Japanese spelling
- kana reading
- optional romaji
- part of speech / type
- concise core meaning
- one natural example sentence
- example reading
- example breakdown
- common collocation or usage note where useful
- verb group and key forms for verbs
- adjective type for adjectives
- kanji composition for useful kanji words
- audio playback target

Do not rely on generic examples like “Let’s learn and remember X” as the final learner experience.

### 2.3 Character-level contract

For kana:

- character
- sound
- audio
- stroke order
- handwriting / tracing
- similar-character warning where useful
- example word
- recognition + production practice

For kanji:

- character
- core meaning
- stroke count
- stroke order / writing practice
- useful component/radical note only when pedagogically helpful
- readings in actual beginner words
- at least 1–3 useful words where available
- recognition and writing distinction

Important principle: **the whole word is the vocabulary unit**. Character decomposition supports memory; it must not encourage learners to translate every kanji separately.

### 2.4 Conversation-line contract

Each dialogue line should support an expandable breakdown with:

- audio
- reading
- natural translation
- token breakdown
- grammar notes
- hidden-English mode
- role-play mode
- shadowing mode

### 2.5 Recognition-chunk contract

Advanced service language may appear before formal grammar mastery only if clearly classified as one of:

- Formal grammar
- Productive fixed phrase
- Recognition phrase

The learner should never be left wondering whether they are expected to analyze or simply recognize an advanced phrase.

---

## 3. Four-skill daily lesson contract

Every normal daily lesson should intentionally touch the four core skills when appropriate:

| Skill | Minimum expected experience |
|---|---|
| Reading | Read new forms in kana/kanji and at least one sentence/context |
| Writing | Character/form copying, transformation, sentence building, typing, or handwriting task |
| Listening | At least one audio-based item or shadowing/listening target once audio infrastructure exists |
| Speaking | At least one aloud production or role-play prompt |

Not every day needs equal weight, but no long phase should become single-skill.

Every lesson should also contain:

- clear objectives
- explicit references only
- examples with breakdown support
- meaningful practice
- authored quiz questions
- review targets
- no future-content leakage
- completion criteria

---

## 4. Daily completion should mean mastery, not clicking a button

Current progression unlocks the next day when the learner marks the current day complete. Before release, add a configurable mastery rule.

Recommended V1 completion standard:

- learner opens the lesson
- completes required practice
- completes the lesson quiz
- reaches a minimum score such as 70–80%, or is allowed to continue with a clear “needs review” state
- completion stores lesson score and weak targets

Do not hard-lock struggling learners forever. Use a warning / review recommendation rather than punitive progression.

---

## 5. Page-by-page gap audit and target state

### 5.1 Dashboard

**Current strengths:** clear next lesson, overall completion, streak, vocabulary/kanji/grammar counts, review due, six-phase overview.

**Missing / improve:**

- Separate skill readiness: Reading / Writing / Listening / Speaking / Grammar / Practical Japan.
- “Today” block should include lesson + due review + listening/shadowing + writing task.
- Weak-topic summary.
- Last quiz / mock score trend.
- Day 90 readiness indicator must be evidence-based, not completion percentage only.
- Show “N5 study readiness” separately from “Japan survival readiness.”
- Avoid implying N5 → N4 merely from completing days.

### 5.2 Daily Course

**Current strengths:** sequential 90-day structure, locking, explicit lesson rendering, authored practice and quizzes.

**Major missing requirement:** full sentence/word/character breakdown.

Add:

- expandable “Break this down” panel on examples and reading sentences
- reading/furigana support
- word tokens
- grammar annotations
- base/conjugated verb forms
- audio playback
- slow / natural playback
- speaking prompt
- writing prompt
- optional hide-English mode
- required practice completion state
- lesson mastery score

Retrofit **Days 1–80**. Build Days **81–90** using this format from day one.

### 5.3 Kana

**Current strengths:** hiragana/katakana views, recall modal, special kana section, quiz.

**Missing:**

- stroke order
- handwriting/tracing canvas or guided writing cards
- sound audio
- mouth/pronunciation cues for difficult sounds
- dakuten/handakuten/yōon/small っ drill coverage
- long-vowel listening contrasts
- look-alike discrimination: さ/き, れ/ね, シ/ツ, ソ/ン, etc.
- kana-to-sound and sound-to-kana dictation
- kana word reading practice
- kana production mastery tracking separate from simple exposure

### 5.4 Vocabulary

**Current strengths:** search, category, status, favorites, flashcards, reading, romaji, meaning.

**Major gap:** many base vocabulary examples are currently generic generated examples, not natural contextual learning examples.

Add:

- real natural example for every important word
- example reading + breakdown
- audio
- part-of-speech detail
- verb group + useful forms
- adjective class
- common collocations
- reverse recall English → Japanese
- typing recall Japanese → reading
- listening recognition
- optional writing practice
- confusion pairs / near meanings where useful
- learned/mastered status should depend partly on recall performance, not button state only

### 5.5 Kanji

**Current strengths:** meaning, on/kun readings, stroke count, example word, mnemonic, learned flag, quiz.

**Missing:**

- stroke-order visualization
- handwriting practice
- recognition vs production mastery
- readings taught through words rather than isolated lists
- multiple useful words for high-value kanji
- word-level breakdown
- audio for example words
- similar-kanji discrimination where useful
- better rule: do not require every listed on/kun reading for N5 beginner mastery

### 5.6 Grammar

**Current strengths:** pattern, formation, meaning, simple explanation, example, common mistake, quiz.

**Missing:**

- sentence breakdown on every example
- audio
- multiple examples by context
- transformation steps
- links to prerequisite grammar
- contrast cards for confusable forms
- production drills
- sentence-building tasks
- error-correction tasks
- more contextual grammar quiz types than “match meaning”

### 5.7 Speak Japanese

**Current state:** useful static intent-based phrase bank.

**Major gap:** this is not yet an actual speaking trainer.

Build:

- audio button per phrase
- slow and natural speed
- record learner with MediaRecorder
- playback self-comparison
- shadowing mode
- hide text after first listen
- scenario prompts: “Say this without looking”
- phrase breakdown
- pronunciation notes
- progress by communicative intent

V1 does **not** require automatic pronunciation scoring. Recording + model audio + self-check is enough.

### 5.8 Conversations

**Current strengths:** realistic scenarios, speaker labels, English, vocabulary/grammar tags, notes.

**Missing:**

- full breakdown per line
- individual-line audio
- full-conversation audio
- slow/natural speed
- hide English
- hide Japanese for listening challenge
- role-switch mode: learner plays A or B
- pause-and-respond mode
- comprehension questions
- shadowing
- conversation mastery history

### 5.9 Life in Japan

**Current strengths:** strong practical scope and appropriate cautions about changing procedures.

**Missing / expand:**

- scenario flows rather than phrase cards only
- arrival/airport walkthrough
- lost item / police / ambulance / fire language
- phone/SIM support
- bank/ATM basics
- post office / parcel shipping
- receiving deliveries
- apartment repair calls
- asking for language support / interpreter / English guidance
- official-source links only for changing procedural facts
- audio + breakdown for every key phrase
- scenario quizzes and role-play

Never turn this module into legal, immigration, tax, or medical advice.

### 5.10 Culture & Etiquette

**Current strengths:** nuanced, avoids rigid stereotypes.

**Missing:**

- scenario-based examples
- “What would you do?” mini questions
- link relevant culture notes to daily lessons
- distinguish etiquette tendency from law/rule
- misconception cards
- concise rationale/context where it helps understanding

Do not turn culture into memorized stereotypes.

### 5.11 Reading

**Current gap is large:** the standalone reading bank is still small.

Build a graded reading bank across:

- kana-only microtexts
- menus
- prices
- station signs
- public signs/notices
- schedules
- short messages
- chat-style messages
- shop notices
- simple forms
- short paragraphs
- N5-style information retrieval

Features:

- furigana/reading toggle
- sentence breakdown
- word breakdown
- unknown-word reveal
- timed mode
- comprehension questions
- reading history
- difficulty / source type
- no English shown until learner chooses it

Target: enough unseen material that learners cannot pass by memorizing the same eight texts.

### 5.12 Practice

**Current strengths:** mixed quiz, immediate feedback, wrong answers recorded.

**Current weakness:** generic mixed practice is heavily recognition-oriented.

Add practice modes:

- vocabulary meaning
- Japanese production
- kana dictation
- kanji recognition
- kanji writing/self-check
- grammar formation
- sentence ordering
- fill particle
- error correction
- listening comprehension
- listening quick response
- reading comprehension
- speaking prompt
- practical scenario response

Allow learner to select skill or use adaptive mixed mode.

### 5.13 Review

**Current system:** items with more wrong than correct rise to the top.

This is useful weakness ranking, but not true spaced repetition.

Upgrade to:

- due date
- last reviewed
- interval
- ease / confidence or a simpler interval model
- lapses
- next review
- separate due queues for vocabulary, grammar, kanji, listening, and sentence patterns
- “Again / Hard / Good” or equivalent simple controls

Keep the system understandable; do not overengineer an Anki clone.

### 5.14 Progress

Target progress page should show:

- days completed
- lessons mastered vs completed-needs-review
- quiz average
- recent trend
- vocabulary recall
- kana mastery
- kanji recognition / writing
- grammar mastery
- reading accuracy
- listening accuracy
- speaking/shadowing completion
- practical scenario completion
- weak topics
- mock-test history
- N5 readiness checklist
- Japan survival checklist

Do not derive readiness from raw “80/90 days completed.”

---

## 6. Missing core infrastructure before Days 81–90

Days 81–90 must not be authored as ordinary text-only lessons. Their titles require infrastructure first.

### 6.1 Structured Japanese breakdown engine

Extend the content model with authored analysis objects.

Suggested structure:

```js
{
  japanese: "朝、七時に起きます。",
  reading: "あさ、しちじにおきます。",
  romaji: "asa, shichiji ni okimasu",
  naturalEnglish: "In the morning, I wake up at seven.",
  literalEnglish: "Morning, at seven, wake up.",
  tokens: [
    { surface: "朝", reading: "あさ", meaning: "morning", role: "time word", vocabularyId: "..." },
    { surface: "七時", reading: "しちじ", meaning: "seven o'clock", role: "time expression" },
    { surface: "に", reading: "に", meaning: "at", role: "time particle", grammarId: "grammar-ni-time" },
    { surface: "起きます", reading: "おきます", meaning: "wake up", role: "polite verb", baseForm: "起きる", vocabularyId: "...", grammarId: "grammar-masu-nonpast" }
  ]
}
```

Requirements:

- Authored/deterministic, not naive string splitting.
- Safe fallback for legacy examples until all 1–80 are migrated.
- Reusable renderer component.
- Collapsible on mobile.
- Romaji obeys preference.

### 6.2 Audio/listening engine

Minimum V1:

- audio play control
- optional browser TTS fallback
- slow / natural rate
- transcript hidden by default for listening questions
- replay count tracking where useful
- sentence/phrase audio target in data

Preferred release path:

- curated/native audio assets for core lessons, dialogues, mock listening, and final assessment
- browser TTS may remain as fallback for library items

### 6.3 Speaking/shadowing engine

Minimum V1:

- play model
- record learner
- playback learner
- re-record
- mark complete / self-rate

Later enhancement:

- browser speech recognition or server pronunciation feedback

Do not block V1 on automatic scoring.

### 6.4 Writing engine

Minimum V1:

- kana tracing/writing canvas
- kanji writing/self-check
- type-the-reading tasks
- sentence ordering
- typed Japanese response where appropriate

Track recognition and writing separately.

### 6.5 Assessment engine

Needed for Days 88 and 90.

Support sections:

- Vocabulary / orthography
- Grammar
- Sentence composition
- Reading
- Information retrieval
- Listening
- Practical communication

Support:

- section score
- timer where appropriate
- pass/readiness thresholds
- review-target capture
- weak-domain summary
- retake history

Do not call internal assessment an official JLPT score.

---

## 7. Retrofitting Days 1–80

Do not rewrite the reviewed curriculum blindly. Preserve lesson IDs, titles, prerequisites, quiz IDs where possible, and existing reviewed Japanese unless an audit finds a real defect.

### Retrofit pass A — Days 1–20

Focus:

- audio for sounds/kana
- stroke order and handwriting
- kana reading without romaji
- character-by-character explanation
- word segmentation
- first dictation

### Retrofit pass B — Days 21–40

Focus:

- sentence token breakdown
- particle role highlighting
- conjugation paths
- grammar contrasts
- writing short polite sentences
- slow listening using learned grammar

### Retrofit pass C — Days 41–60

Focus:

- full conversation breakdown
- service-listening audio
- role-play
- practical-response speaking
- signs / prices / directions / forms
- scenario writing: name, address, simple message/problem statement

### Retrofit pass D — Days 61–80

Focus:

- systematic morphology breakdown
- counter reading audio
- comparison sentence construction
- invitation/pragmatics practice
- reading/listening mixed tasks
- checkpoint upgrades

Each retrofit block must end with curriculum/Japanese/dependency validation and manual browser QA.

---

## 8. Final phase — Days 81–90 target design

Canonical titles:

81. Kanji consolidation
82. Vocabulary consolidation
83. Grammar consolidation
84. Reading signs & notices
85. Reading short messages
86. Listening strategy & shadowing
87. Practical conversation marathon
88. Mock test A
89. Weak-topic repair
90. Final N5 assessment & next step

### Day 81 — Kanji consolidation

Must include:

- high-value kanji recognition
- reading in words
- writing/self-check subset
- confusion pairs
- sign/word recognition
- no giant isolated reading lists

### Day 82 — Vocabulary consolidation

Must include:

- topic-based recall
- Japanese → meaning
- meaning → Japanese
- audio recognition
- sentence-context selection
- weak vocabulary integration

### Day 83 — Grammar consolidation

Must include:

- particles
- verb forms
- adjectives
- て-form patterns
- invitations/desire/preferences
- comparisons/counters/frequency/ranges/reasons/connectors
- error correction
- sentence construction

### Day 84 — Reading signs & notices

Use unseen items such as:

- station sign
- shop notice
- opening/closing time
- prohibition/permission sign
- floor/direction sign
- simple public notice

Every item must support a post-answer breakdown.

### Day 85 — Reading short messages

Use unseen:

- text/chat message
- lateness message
- appointment note
- schedule
- workplace/school memo
- delivery note

Include information-retrieval questions.

### Day 86 — Listening strategy & shadowing

Requires actual audio functionality.

Teach:

- predict context
- listen for keywords
- identify time/place/person/action
- tolerate unknown words
- replay strategically
- shadow short lines

Include slow and natural audio.

### Day 87 — Practical conversation marathon

Scenario rotation:

- shop
- restaurant/café
- station
- taxi/bus
- apartment issue
- workplace/school
- city hall
- hospital/pharmacy
- emergency/help
- social invitation

Use role-play and hidden-text responses.

### Day 88 — Mock Test A

Must be structured assessment, not generic mixed quiz.

Sections:

- vocabulary/orthography
- grammar
- reading
- listening

Use unseen questions.

Store section scores and weak targets.

### Day 89 — Weak-topic repair

Dynamically build from learner history.

If no history exists, use a balanced diagnostic.

Do not hardcode one generic Day 89 lesson for every learner.

### Day 90 — Final N5 assessment & next step

Assess:

- kana independence
- kanji recognition
- vocabulary
- grammar
- reading
- listening
- speaking/shadowing completion
- practical scenarios

Output:

- strengths
- weak areas
- N5 internal readiness
- practical-Japan readiness
- recommended N4 starting plan

Do not claim official JLPT certification or guaranteed life independence.

---

## 9. Content library audit required before release

### Vocabulary

Audit every learner-visible record for:

- real example sentence
- reading
- romaji
- type
- natural meaning
- duplicates
- inaccurate generic examples
- lesson dependency

### Grammar

Audit every record for:

- canonical ID
- formation
- natural example
- breakdown
- common mistake
- duplicate concept
- legacy references

### Kanji

Audit:

- fields and remapping logic
- word readings
- stroke counts
- learner-required reading scope
- writing subset

### Conversations

Audit every line for naturalness, level, reading, breakdown, audio target, and fixed-phrase classification.

### Reading

Expand substantially and ensure all texts are unseen-capable.

### Speaking

Convert from static reference list into active shadowing/production practice.

### Life/Culture

Keep changing legal/admin/medical facts out of static claims unless sourced and maintained.

---

## 10. Technical cleanup before release

### P0 cleanup

- Remove duplicate `nextDay()` and `prefs()` definitions in `js/state.js` after confirming behavior equivalence.
- Add `.gitignore` and remove tracked `.DS_Store` from future commits.
- Update stale `docs/PRODUCT_SPEC.md`.
- Update stale `docs/CURRICULUM_BLUEPRINT.md` so it no longer says all lessons are drafts.
- Keep `docs/ROADMAP.md` and this master roadmap consistent.

### P1 engineering hardening

- Add automated smoke tests for lesson count/status, unlocking, completion persistence, quiz scoring, invalid references, reset behavior, dev preview isolation, and old-state migration.
- Add simple content-schema checks for sentence analysis objects.
- Validate audio asset references.
- Validate breakdown token references.
- Add accessible labels/focus states to all new interactive controls.

### P2 product hardening

- Export/import learner progress.
- Optional cloud/account sync later.
- Offline audio caching if the app becomes PWA-like.
- Better analytics only if privacy model is explicit.

---

## 11. Browser and device QA gate

Before release, execute the existing browser QA checklist, not just code inspection.

Required representative widths:

320, 360, 390, 430, 768, 820, 1024, 1280, 1440, 1920+

Test both light and dark mode.

Must manually test:

- fresh-user progression
- Day 1 completion/unlock
- representative lessons from every phase
- Days 74–75 counter content
- Days 81–90 final content
- sentence-breakdown expansion
- audio controls
- recording controls
- writing canvas/input
- quizzes
- mock assessment
- modals/toasts
- reset
- dev preview isolation

No ordinary horizontal overflow.

---

## 12. Release-readiness criteria

Nihon Path V1 should not be called complete until all are true:

| Area | Required state |
|---|---|
| Curriculum | Days 1–90 reviewed |
| Breakdown | Important Japanese content supports authored breakdown |
| Kana | Reading + writing + audio |
| Vocabulary | Natural examples + active recall |
| Kanji | Recognition + bounded writing |
| Grammar | Breakdown + production practice |
| Reading | Expanded unseen graded bank |
| Listening | Real audio-based tasks |
| Speaking | Model audio + record/playback + shadowing |
| Writing | Kana/kanji/sentence production tasks |
| Practical Japan | Core survival scenarios rehearsed |
| Mock exam | Structured N5-aligned internal mock |
| Final assessment | Skill-by-skill readiness report |
| Review | Due-based spaced review or equivalent scheduled model |
| Browser QA | Manual matrix passed |
| Validator | 0 errors; warnings intentionally resolved/documented |
| Docs | Product spec, blueprint, roadmap current |

---

## 13. Development gate order from current state

### Gate 1 — Master roadmap + content model design

- Adopt this roadmap as project brain.
- Define sentence analysis / token schema.
- Define audio target schema.
- Define writing-task schema.
- Define assessment schema.
- No Days 81–90 authoring yet.

### Gate 2 — Detailed-breakdown renderer

- Implement expandable breakdown component.
- Support reading, romaji preference, tokens, grammar/base forms.
- Add schema validation.
- Test on a small representative set of lessons first.

### Gate 3 — Audio + speaking infrastructure

- Playback.
- Slow/natural speed.
- Recording/playback.
- Shadowing UI.
- Hidden transcript mode.

### Gate 4 — Writing infrastructure

- Kana/kanji writing self-check.
- Japanese typing task.
- Sentence arrangement.
- Dictation task shape.

### Gate 5 — Assessment infrastructure

- Sectioned test engine.
- Listening questions.
- Timed sections where appropriate.
- Section scores.
- weak-target output.

### Gate 6 — Page hardening pass

Upgrade Dashboard, Kana, Vocabulary, Kanji, Grammar, Speaking, Conversations, Life, Culture, Reading, Practice, Review, Progress using the page audit above.

### Gate 7 — Retrofit Days 1–20

Detailed breakdown + audio + writing.

### Gate 8 — Retrofit Days 21–40

Detailed grammar/sentence breakdown + production.

### Gate 9 — Retrofit Days 41–60

Practical dialogue audio + role-play + breakdown.

### Gate 10 — Retrofit Days 61–80

Grammar mastery, counter audio, mixed-skill practice, checkpoint upgrades.

### Gate 11 — Author Days 81–90

Use the final-phase design in this roadmap and the completed infrastructure.

### Gate 12 — Final curriculum/Japanese audit

Audit Days 81–90 and cross-course sequencing 1–90.

### Gate 13 — Full library audit

Vocabulary, grammar, kanji, conversations, speaking, reading, life, culture.

### Gate 14 — Browser/device QA

Execute the full manual matrix.

### Gate 15 — Release assessment

Run fresh-user, old-state, weak-topic, mock, Day 90, and reset scenarios.

### Gate 16 — V1 freeze

- Update docs.
- Confirm 90 reviewed.
- Confirm no patch files.
- Confirm validator clean.
- Tag/release manually after user approval.

---

## 14. Permanent project rules

1. Never auto-generate lesson composition from array position, randomization, or modulo logic.
2. Keep one authoritative phase file after review.
3. New shared content uses stable human-readable IDs.
4. Never silently introduce future grammar.
5. Reuse reviewed content; do not duplicate concepts.
6. Service language beyond learner grammar must be classified.
7. Every important Japanese sentence must ultimately support detailed breakdown.
8. Audio/listening must use actual audio playback, not visible text pretending to be listening.
9. Speaking requires production, not reading-only cards.
10. Writing requires learner output, not recognition only.
11. Completion percentage is not proficiency.
12. Internal tests are not official JLPT results.
13. Practical-life content teaches communication; changing legal/medical/administrative rules require authoritative current sources.
14. Responsive support is mandatory from 320px upward.
15. Light and dark themes must remain first-class.
16. Dev Preview must never mutate learner progress.
17. The user handles Git staging, commits, pushes, and branches manually unless explicitly changing that workflow.

---

## 15. Definition of “complete beginner → ready to continue life/study in Japan”

By the end of V1, Nihon Path should be capable of producing a learner who can:

- decode Japanese writing at beginner level
- write core beginner forms
- understand slow predictable speech
- form their own short sentences
- survive common daily interactions politely
- recover when communication fails
- read basic signs/messages/schedules
- understand their own weak areas
- attempt N5-level internal mock tasks
- continue directly into N4 study

The product should never promise that N5 alone equals full workplace, university, legal, medical, or social independence in Japan.

---

## 16. Next immediate gate

**Do not author Days 81–90 yet.**

Next implementation gate should be:

> **Detailed Japanese Breakdown Infrastructure + Content Schema**

Deliverables:

- sentence-analysis schema
- token schema
- reusable breakdown renderer
- collapsible UX
- romaji integration
- reading integration
- base-form/conjugation support
- initial examples on representative lessons
- validator support
- no regression to Days 1–80

After that, build audio/speaking infrastructure, writing infrastructure, and assessment infrastructure before final-phase authoring.
