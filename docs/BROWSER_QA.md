# Browser QA Checklist

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
