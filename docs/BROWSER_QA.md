# Browser QA Checklist

## Gate 11D browser-QA checklist

Check Day 86 hidden transcripts, natural/slow playback, replay, and optional recording; check Day 87 marathon contexts, modes, audio, and reveal behavior. Live browser checks were not performed in this gate.

Manual test this file by opening `index.html` directly in a browser. Use a fresh Nihon Path state for the fresh-user flow; reset only through the in-app Reset progress control.

## Fresh-user flow

- [ ] Dashboard renders with Day 1 as the next lesson.
- [ ] Open Day 1; Day 2 is locked.
- [ ] Launch and complete the Day 1 quiz; verify feedback, Next, result, and quiz history.
- [ ] Complete Day 1; verify the button changes, Day 2 unlocks, and progress updates.
- [ ] Refresh; verify completion and unlock state persist.
- [ ] Complete Day 2; verify Day 3 unlocks.
- [ ] Reopen a completed lesson; verify completion can be toggled safely.

## Navigation and features

- [ ] Open Dashboard, Daily Course, Kana, Vocabulary, Kanji, Grammar, Speak Japanese, Conversations, Life in Japan, Culture & Etiquette, Reading, Practice, Review, and Progress.
- [ ] Search/filter vocabulary, favorite an item, change its status, open its example, and use flashcards.
- [ ] Switch Hiragana/Katakana, open a kana detail, and launch the kana quiz.
- [ ] Search/mark Kanji learned and launch the quiz.
- [ ] Search/mark Grammar complete and launch the quiz.
- [ ] Read conversations and speaking content; verify mobile wrapping.
- [ ] Answer Reading questions, verify feedback, completion, and retry behavior.

## Settings and reset

- [ ] Toggle dark mode; refresh; verify it persists across cards, inputs, quizzes, and modals.
- [ ] Cycle Romaji Auto → On → Off; refresh; verify the setting persists and essential readings remain available.
- [ ] Reset progress; confirm; verify only Nihon Path state resets and Day 1 is available again.

## Light theme visual QA

At desktop, tablet, and mobile widths inspect Dashboard, Daily Course, Lesson, Vocabulary, Quiz, Modal, and Progress.

- [ ] Page background, sidebar, cards, inputs, and lesson surfaces are visibly distinct.
- [ ] Primary and secondary actions have clear hierarchy and focus states.
- [ ] Quiz options and feedback remain readable in light mode.
- [ ] Dark mode remains readable after switching back and forth.

## Developer preview

- [ ] Begin with fresh state and confirm Day 2 is locked.
- [ ] On `file://` or `?dev=1`, click Dev: Unlock All.
- [ ] Open Day 30 and confirm progress remains 0 and no completion is added.
- [ ] Click Dev: Lock Progression.
- [ ] Confirm Day 30 is locked again and learner progress is unchanged.

## Responsive matrix

Test approximately at 320, 360, 390, 430, 768, 820, 1024, 1280, 1440, and 1920px.

- [ ] No ordinary page has horizontal overflow.
- [ ] Navigation and bottom navigation are usable.
- [ ] Lesson content and Complete Day action remain visually associated and tappable.
- [ ] Quiz options, forms, cards, conversations, tables, modals, and toasts fit the viewport.

## Developer lesson preview

In the browser console run `NIHON_PATH.dev.openLesson(25)`. This opens Day 25 without changing completion state, unlocking lessons, or modifying localStorage. It is a development helper and is not shown in the learner UI.

## Japanese breakdown QA

- [ ] Open an enriched early lesson and confirm `Break this down` appears.
- [ ] Open an enriched later lesson and confirm expansion/collapse works.
- [ ] Open a legacy lesson with no `analysisId`; confirm no empty or broken panel appears.
- [ ] Verify Romaji On and Romaji Off affect both analysis and token romaji.
- [ ] Verify light and dark themes.
- [ ] Check approximately 320px and 390px mobile widths, tablet, and desktop.
- [ ] Confirm long token sets wrap without horizontal overflow.
- [ ] Confirm a character subsection appears after word-level tokens.
- [ ] Confirm okurigana and polite-ending labels are understandable.
- [ ] Confirm the Day 80 long analysis remains readable when expanded.
- [ ] Confirm any nested/native disclosures remain keyboard accessible.

## Audio and speaking QA

### Model audio

- [ ] Natural playback works.
- [ ] Slow playback works.
- [ ] Stop works.
- [ ] Starting another target stops the previous target.
- [ ] Playback works with Romaji Off.
- [ ] Navigation stops active model playback.

### TTS fallback

- [ ] Japanese speech is requested when no asset exists.
- [ ] Missing Japanese voice does not crash playback.

### Speaking practice

- [ ] Microphone permission is requested only after clicking Start recording.
- [ ] Start and stop recording work.
- [ ] Microphone tracks stop after recording.
- [ ] Own recording plays back.
- [ ] Re-recording replaces the prior object URL safely.
- [ ] Delete revokes the recording object URL.
- [ ] Self-rating persists as metadata.
- [ ] Refresh preserves metadata but not the recording.
- [ ] Permission denied and unsupported-browser messages are learner-friendly.

### Privacy and responsive behavior

- [ ] No recording upload occurs.
- [ ] No audio bytes are persisted in localStorage.
- [ ] Controls fit at approximately 320px and 390px, tablet, and desktop widths.
- [ ] Light and dark themes remain readable.

### Assessment Lab

- [ ] Diagnostic opens with correct sections and question counts.
- [ ] Multiple-choice, typed-answer, sentence-order, reading, information-retrieval, listening, practical, and self-check items work.
- [ ] No answer, explanation, breakdown, model answer, or listening transcript leaks before submission.
- [ ] Previous/Next, section completion, and final submission work.
- [ ] Section scores, total score, weak domains, review targets, and production completion are separated correctly.
- [ ] Review answers, retake, latest/best history, and persisted history work.
- [ ] Old state loads; reset removes assessment history as expected.
- [ ] Layout works at 320/390px, tablet, desktop, light, and dark themes.

### Days 21–40 grammar retrofit

- [ ] Days 21, 24, 25, 26, 30, 31, 32, 35, 36, 38, 39, and 40 show Japanese, kana reading, romaji, and meaning.
- [ ] Particle contexts display は → wa, を → o, and へ → e correctly.
- [ ] Grammar breakdowns show word roles and authored morphology without future-form leakage.
- [ ] Audio, speaking, writing, sentence ordering, and dictation routes appear in Daily Course.
- [ ] Romaji On/Off, mobile layouts, and light/dark themes remain usable.

### Writing practice

#### Handwriting

- [ ] Trace works with mouse and, where available, touch/stylus.
- [ ] Clear and Start again work; drawing does not scroll the page.
- [ ] Recall reference show/hide works.
- [ ] Kanji reveal and Again/Okay/Comfortable self-rating work.
- [ ] Canvas remains usable on high-DPI and narrow viewports.

#### Typing and ordering

- [ ] Correct and incorrect typed answers behave deterministically.
- [ ] Whitespace normalization works; romaji is not silently accepted.
- [ ] Japanese IME input works when enabled by the device.
- [ ] Sentence-order units work by mouse, touch, and keyboard; Undo and Reset work.

#### Dictation and free response

- [ ] Dictation transcript is hidden before attempt, audio plays, answer checking and reveal work.
- [ ] Analysis appears only after reveal/check.
- [ ] Free response reveals a model and uses self-rating, without fake correctness.

#### Writing state and responsive behavior

- [ ] Writing metadata persists while canvas drawings do not.
- [ ] Writing Lab works at approximately 320px, 390px, tablet, and desktop widths.
- [ ] Light and dark themes remain readable with no horizontal overflow.

## Gate 14 — Real Browser / Device QA attempt (2026-09-17)

**GATE 14 NOT READY — ACTUAL BROWSER QA COULD NOT BE PERFORMED.**

The Codex In-app Browser was selected on the macOS host. Browser version was not obtained. Opening `file:///Users/feluda/Desktop/Projects/Others/nihonpath/index.html` was rejected by the browser tool's URL security policy before the application loaded. The rejection explicitly prohibits alternate-browser, indirect-execution, or other workarounds for this blocked action. No workaround was attempted. This is an environment access blocker, not evidence of an application defect.

| Test area | Actual result |
| --- | --- |
| Actual application browser interaction | BLOCKED; application never loaded |
| file:// compatibility | BLOCKED; attempted, not verified |
| Fresh learner Day 1 → Day 2 and refresh persistence | BLOCKED |
| Days 1–7 / representative checkpoints | BLOCKED |
| All-90 smoke | 0 opened; 0 executed failures; 90 untested |
| Dev Preview progress safety | BLOCKED |
| Main navigation / Conversations 24/75 / backlog non-leak | BLOCKED |
| Audio natural / slow / stop / switch / TTS fallback | BLOCKED |
| Microphone / recording / denial handling | BLOCKED; no permission request or recording attempted |
| Writing / assessments | BLOCKED |
| Themes / Romaji Auto, On, Off / persistence | BLOCKED |
| Responsive / 320px critical flow | BLOCKED; no widths tested |
| Kana / vocabulary / kanji / grammar / reading / review / progress | BLOCKED |
| Reset / modal / toast / keyboard | BLOCKED |
| Console errors | Not measured; application never loaded |
| Application defects found / fixed | None observed / none fixed; testing did not run |
| Remaining P0 / P1 / P2 / P3 | Unknown; no browser evidence to assess |
| Static regression | Not rerun; no application code changed; static checks are not a substitute |

Requested manual widths 320, 390, 768, 1024, and 1440 and automated overflow widths 360, 430, 820, 1280, and 1920 remain untested. Existing checkboxes above intentionally remain unchecked.

Only this QA document was modified during the Codex attempt; no learner data, application code, Git staging, commits, pushes, branches, or history were changed. Gate 13 retains its previously verified **COMPLETE FOR V1** status. The blocked Codex attempt is historical; the user-performed Chrome evidence below is the authoritative Gate 14 release evidence.

## Gate 14 — User-performed manual Chrome QA (accepted evidence)

**Environment:** Chrome on macOS.

**Evidence source:** user-reported manual PASS. Codex did not perform these browser checks; the Codex `file://` attempt above remained blocked by tool URL policy.

The user reported PASS for:

- Day 1 → Day 2 unlock and refresh persistence.
- Dev Preview, major pages, existing audio, Speaking recording, Writing, and Assessments.
- Romaji controls, light/dark themes, and mobile UI.
- Console uncaught application errors: **0**.

After the Learning Surface repair, the user additionally reported PASS for:

- Kana audio and focused practice.
- Vocabulary audio and focused practice.
- Kanji Details, example-word audio, focused practice, and writing self-check.
- Grammar example audio and focused practice.
- Life phrase audio and Reading passage audio.
- Quick Practice categories, lesson-item practice, and Lesson quiz.
- Writing, Speaking, and Assessment regression checks.
- Console uncaught application errors: **0**.

This evidence supports representative browser flows and core progression. It does not claim that Codex opened all 90 lessons individually in a browser; all 90 lessons are covered by the source/static smoke audit below.

## Learning Surface Completeness (manual follow-up)

The following focused checks are covered by the user-reported manual PASS above; the checklist remains as a repeatable regression matrix:

- Kana: open three characters and verify Details, Listen/Slow, and Practice.
- Vocabulary: open three words and verify Details, audio, and Practice.
- Kanji: open five characters and verify Details, example-word audio, Practice, and writing self-check.
- Grammar: open three patterns and verify example audio and Practice.
- Life in Japan: play three phrases.
- Reading: play two passages.
- Practice: verify Quick Practice, Writing Lab, and Assessment modes; confirm Lesson quiz and focused item practice visibly show the quiz.

The source-composed audit reports complete routes and registry coverage. Playback remains browser Japanese TTS unless a native asset exists; kanji writing is a self-check without automatic scoring.

Current static audit snapshot (2026-09-19): Kana 142, Vocabulary 377, Kanji 91, Grammar 105, Life phrases 44, Reading passages 8; all have validated audio routes, focused builders cover every item, and all 91 kanji have Details and example-word audio.

The user-provided checkpoint records the accepted manual Gate 14 pass for the redesigned V1 UI and the post-repair learning-surface follow-up. Keep the evidence distinction above when reporting release status.
