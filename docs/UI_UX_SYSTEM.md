# Nihon Path — UI/UX Design System Specification

## 1. Product Design Personality
Nihon Path V1 is designed to feel **calm, modern, Japanese-inspired, warm, focused, and premium**.
- **Restraint & Purpose**: Minimal visual noise with generous whitespace.
- **Japanese Influence**: Expressed through subtle vermilion accents (`#D95C50` light / `#FF7A6E` dark), warm neutral surfaces, structured grid geometry, and prominent Japanese typography.

---

## 2. Color System & Semantic Tokens

### Light Theme
- `--color-bg`: `#F7F8FA`
- `--color-surface`: `#FFFFFF`
- `--color-surface-soft`: `#F2F4F7`
- `--color-surface-hover`: `#ECEFF3`
- `--color-text`: `#171A1F`
- `--color-text-secondary`: `#5F6672`
- `--color-text-tertiary`: `#858D98`
- `--color-border`: `#E2E6EA`
- `--color-border-strong`: `#D2D8DE`
- `--color-primary`: `#D95C50`
- `--color-primary-hover`: `#C94E44`
- `--color-primary-soft`: `#FCECEA`
- `--color-indigo`: `#415A77`
- `--color-success`: `#2F7D62`
- `--color-warning`: `#A56A19`
- `--color-danger`: `#B94545`
- `--color-info`: `#3E6FB0`

### Dark Theme
- `--color-bg`: `#101412`
- `--color-surface`: `#171D1A`
- `--color-surface-soft`: `#1D2521`
- `--color-surface-hover`: `#26302B`
- `--color-text`: `#F5F7F5`
- `--color-text-secondary`: `#B3BBB6`
- `--color-text-tertiary`: `#88918B`
- `--color-border`: `#29332E`
- `--color-border-strong`: `#39443E`
- `--color-primary`: `#FF7A6E`
- `--color-primary-hover`: `#FF8B81`
- `--color-primary-soft`: `#382320`
- `--color-indigo`: `#8FA8C4`
- `--color-success`: `#72C3A1`
- `--color-warning`: `#E4B76A`
- `--color-danger`: `#F18A86`
- `--color-info`: `#82AFE7`

---

## 3. Typography & Character Scaling

### Font Stacks
- **UI / English**: `Inter`, `system-ui`, `-apple-system`, `sans-serif`
- **Japanese Surface**: `"Noto Sans JP"`, `"Hiragino Sans"`, `"Yu Gothic"`, `Meiryo`, `sans-serif`

### Hierarchy Scale
- **Page Titles**: 28px–38px (Desktop), 26px–30px (Mobile)
- **Section Titles**: 22px–26px
- **Card Titles**: 16px–20px
- **Body Text**: 14.5px–15px
- **Small Metadata**: 12px–13px

### Japanese Learning Surfaces
Japanese text is visually emphasized and larger than the corresponding translation:
- **Sentence Breakdown**: 20px–26px
- **Vocabulary Words**: 24px–30px
- **Kanji Character Feature**: 48px–56px
- **Kana Grid Cell**: 28px–34px

---

## 4. Spacing Scale & Border Radii

### Spacing Scale
4px, 8px, 12px, 16px, 20px, 24px, 32px, 40px, 48px, 64px.

### Radii Scale
- `--radius-sm`: `8px` (Tags, status badges, small controls)
- `--radius-md`: `12px` (Buttons, input fields, inner cards)
- `--radius-lg`: `16px` (Main cards, hero panels)
- `--radius-xl`: `20px` (Modals, primary containers)

---

## 5. Buttons, Inputs & Controls

### Button Variants
- **Primary (`.btnPrimary` / `.btn`)**: Vermilion fill (`--color-primary`), white text. Used for main learner CTAs ("Continue Lesson", "Check answer", "Start assessment").
- **Secondary (`.btnSecondary` / `.btn2`)**: Surface fill with border (`--color-border-strong`). Used for supporting actions ("Review", "Flashcards", "Slow audio").
- **Danger (`.danger`)**: Muted red fill (`--color-danger-soft`), red text. Reserved for destructive actions ("Reset progress").
- **Icon (`.icon`)**: Square 42x42px icon button. Used for theme toggles and mobile drawer menu.

### Touch Targets
All interactive controls maintain a minimum target height of **42px–44px**.

---

## 6. App Shell & Navigation Architecture
- **Desktop (>=768px)**: 2-column grid layout (`240px` sticky sidebar + `minmax(0, 1fr)` content view).
- **Mobile (<768px)**: Sticky header top bar with hamburger menu toggle + slide-out drawer backdrop + fixed bottom navigation bar (`Home`, `Course`, `Practice`, `Review`, `More`).
- **Developer Controls**: Developer preview unlock controls render in the top bar only when `?dev=1` is present in the URL. Console execution helper `NIHON_PATH.dev.openLesson(day)` under `file://` remains unchanged.

---

## 7. Accessibility & Motion Guidelines
- **Contrast**: Complies with WCAG AA contrast standards across both Light and Dark modes.
- **Focus Rings**: 3px semantic focus ring (`color-mix(in srgb, var(--color-primary) 40%, transparent)`) for keyboard navigation.
- **Reduced Motion**: Respects `@media (prefers-reduced-motion: reduce)` by disabling non-essential transitions and smooth scrolling.
