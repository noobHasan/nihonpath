# Nihon Path

Nihon Path is a static, browser-based Japanese-learning prototype for JLPT N5 and practical life in Japan.

## Run

Open `index.html` directly in a browser. No build step, server, package manager, or database is required. Study progress is stored locally under the existing `nihonPathN5_v1` key.

## Architecture

- `data/` contains course and learning content.
- `js/` contains browser state, navigation, progress, quiz/review behavior, and rendering.
- `css/styles.css` contains the visual system and responsive rules.
- `docs/` contains product and content planning documents.

The files use ordered classic scripts rather than ES modules or `fetch()`, preserving direct `file://` compatibility. The current lesson relationships and seeded content are intentionally preserved for the curriculum-authoring gate.

## Developer preview

For local QA only, open the browser console and run `NIHON_PATH.dev.openLesson(25)` to preview a lesson without completing prior days or changing learner progress. This helper does not unlock lessons or write localStorage.
