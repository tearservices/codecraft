# Frontend Redesign — Design Spec

Date: 2026-07-21

## Summary

Complete visual and interaction redesign of CodeCraft's frontend. Replaces
the current generic dark-purple-gradient "AI SaaS" look with a distinctive,
playful, Duolingo-inspired design system: bold rounded typography, one
signature color per course, chunky "pressed" buttons, a winding lesson
path, a terminal-styled code output panel, and a per-question quiz flow
with slide-up feedback banners. Full light and dark theme support.

This is a redesign of presentation and two small interaction changes
(one-question-at-a-time quizzes, sequential lesson locking within a
course) confirmed with the user. It does **not** change the content model,
course data, execution sandboxes (iframe/worker/Pyodide), or the
profile/progress persistence shape beyond what's noted below.

## Non-goals

- No new gamification systems (no XP, streaks, hearts, leaderboards) —
  only what was explicitly requested: path styling, per-question quiz
  banners, lesson-level locking.
- No cross-course locking — all 5 courses remain independently accessible
  from the landing page (confirmed with user). Only lessons *within* a
  course are gated sequentially.
- No backend, no new dependencies beyond a self-hosted font package and
  (if needed) small icon SVGs — no icon-font library, no CSS framework.
- No changes to content authoring format (`src/content/*/lessons.js`) or
  the HTML/CSS/Web-JS iframe sandbox / Core-JS-worker / Pyodide execution
  mechanics themselves — only how their output is *framed* visually.

## Visual language

### Color system

Two themes (light/dark), each with neutral tokens plus five course accent
colors used consistently for that course's badge, path nodes, progress
bar, and primary buttons on that course's pages.

Course colors (same hue in both themes, background tint changes):

| Course   | Accent    |
|----------|-----------|
| HTML     | `#FF4B4B` (red) |
| CSS      | `#1CB0F6` (blue) |
| Web JS   | `#FFC800` (gold) |
| Core JS  | `#CE82FF` (purple) |
| Python   | `#58CC02` (green) |

Neutral tokens (light theme): white/near-white surfaces (`#ffffff`,
`#fafafa`), warm gray borders (`#e5e5e0`), dark warm-gray text (`#3c3c3c`),
muted gray (`#777`/`#999`).

Neutral tokens (dark theme): dark blue-gray surfaces (`#131f24`,
`#1a2b32`), muted borders (`#2b3d45`), near-white text (`#f2f2f2`), muted
blue-gray (`#8a97a0`). Course accents keep the same hue but sit on
desaturated dark tint backgrounds (e.g. HTML badge: `#3d2020` bg /
`#ff7373` text) rather than the light-theme pastel tints.

No gradients anywhere (this was the single biggest "generic AI SaaS" tell
in the current design) — every accent use is a flat, confident color.

### Typography

**Plus Jakarta Sans** for all UI text (headings and body) — self-hosted
via the `@fontsource/plus-jakarta-sans` npm package (bundled at build
time, not a Google Fonts CDN link), preserving the app's offline-capable
build. Headings use weight 800, body copy uses 400/600.

Code (editor, worked examples, terminal output) keeps the existing
monospace stack (`'Cascadia Code', Consolas, monospace`) — unchanged.

### Buttons

Signature style: solid flat fill, no gradient, a hard-edged "pressed"
border effect (an actual `border-bottom` 3-4px darker-shade border instead
of a blurred box-shadow), 14-16px border radius, bold letter-spaced
uppercase-ish labels, 800 weight. Applies to primary actions (Continue,
Start, Create Profile, Mark Complete) in the relevant course's accent
color; secondary/ghost buttons (Skip, Switch user) use a neutral
white/surface fill with the same bottom-border treatment in gray.

### Shape and spacing

Rounded throughout (14-20px radii on cards/panels, 50% on avatar/node
circles), generous internal padding, 2px solid borders as the default
separator (replacing the current 1px hairline look).

## Theme switching

- On first load (no stored preference), the theme follows
  `prefers-color-scheme`.
- A toggle switch lives in the app header, visible at all times.
- The chosen theme is persisted per active profile
  (`webu:theme:<profileName>`), so different people sharing the same
  browser can each have their own light/dark preference. Before a profile
  is selected (on the picker screen itself), the theme follows system
  preference only — there is no toggle yet since there's no profile to
  key the preference to.
- Implemented as a new lightweight `ThemeContext` (mirrors the existing
  `ProfileContext` pattern): reads/writes localStorage, toggles a
  `data-theme="light"|"dark"` attribute on `<html>`, and CSS custom
  properties in `index.css` branch on that attribute (plus a
  `prefers-color-scheme` media query fallback for the pre-profile state).

## Page-by-page redesign

### Header (`Header.jsx`)

Wordmark drops the gradient-text treatment for a solid bold "CodeCraft"
in the primary text color. Adds the light/dark toggle switch next to the
username and "Switch user" button, which keeps its chunky ghost-button
styling.

### Profile picker (`ProfilePicker.jsx`)

Centered card (white/dark-surface, rounded, bordered) titled "Who's
learning?" with a friendly emoji. Existing profiles render as full-width
chunky buttons (selected/hovered state uses the green accent + bottom
border); the create-profile input and "Create profile" button follow the
same input/button styling as the rest of the app. Delete-profile stays a
secondary action on the same screen, restyled as a small text/ghost
control rather than removed.

### Landing page (`Landing.jsx`)

Course grid becomes 5 cards, each tinted in its course's accent color
(light pastel background + colored border in light theme; dark tinted
background + colored border in dark theme), showing: course name in its
accent color, "`X / N` lessons" label, a chunky rounded progress bar in
the course color, and a "Continue" (in-progress/complete) or "Start"
(not started) button in the same color. Grid stays responsive
(`auto-fill, minmax(...)`) as today. "Reset progress" control keeps its
existing placement, restyled as a small ghost/danger link.

### Course page (`CoursePage.jsx`) — winding path

Replaces the flat `<ol>` lesson list with a vertical winding path
(serpentine layout: nodes alternate center/right/center/left in a
repeating cycle as the list goes down the page), connected by a thick
rounded line, matching the approved mockup. Node states:

- **Completed** — filled in the course's accent color, check icon (SVG,
  not a text glyph — see Quiz section for the icon treatment applied
  consistently here too).
- **Current** (first incomplete lesson) — larger node, gold ring/star
  treatment, with a persistent floating label/card next to it showing the
  lesson title and a "Start"/"Continue" button — this is the primary
  click target for that lesson.
- **Locked** (any lesson after the current one) — gray/muted node with a
  lock icon, not clickable.
- All other completed/current nodes show their lesson title on
  hover/focus (small tooltip/label), so titles aren't only visible for
  the current lesson.

**Lesson locking (new behavior, confirmed with user):** a lesson is
unlocked if it is the course's first lesson, or the immediately preceding
lesson is marked `completed` in progress; otherwise it is locked. Locking
is **per-course only** — all 5 courses remain independently reachable
from the landing page regardless of each other's completion state.

**Accessibility requirement:** the winding path is a visual layer over a
real, always-present list structure. Each node renders as an actual
`<Link>`/button (or a disabled/`aria-disabled` element when locked) with
an `aria-label` stating the lesson title and its status ("Flexbox,
completed" / "Grid, current lesson" / "Transitions, locked"). Tab order
follows lesson order top-to-bottom regardless of the alternating visual
left/center/right position — the serpentine positioning is presentational
only (CSS/SVG), not reflected in DOM order.

### Lesson page (`LessonPage.jsx`)

- Header strip: course badge (accent-colored pill) + "Lesson N of Total" +
  lesson title in bold heading type.
- Explanation renders as today (via `react-markdown`) with the new
  typography.
- Worked example: code block restyled with rounded corners on a dark
  syntax-highlighted panel (kept dark in both light and dark theme, like
  a code snippet on a docs site — this doesn't change per app theme).
- Exercise: editor (CodeMirror, unchanged functionally) side-by-side with
  either (a) the live iframe preview for HTML/CSS/Web JS, restyled with
  the same rounded panel chrome and a "LIVE PREVIEW" label, or (b) the new
  terminal-styled output panel for Core JS/Python (see below).
- Quiz section (see below) replaces the current all-at-once list.
- "Mark complete" / "Next lesson" controls become the chunky primary
  button style; for lessons with a quiz, completion is driven by
  finishing the quiz flow (see below) rather than a separate manual step,
  matching how the quiz's last "Continue" naturally leads into
  completion/next-lesson navigation.

### Terminal-styled output panel (`CodeEditor.jsx` / worker output rendering)

Applies to **Core JS (Web Worker)** and **Python (Pyodide)** exercise
output only — the HTML/CSS/Web-JS courses keep a real rendered `<iframe
srcdoc>` preview (their output is visual, not textual), just restyled
with matching rounded panel chrome.

- Panel styled as a terminal window: dark title bar with three
  traffic-light dots (red/yellow/green) and a label showing
  `<username>@codecraft: ~/exercise`.
- Body is nearly-black (`#0c0c0c`), monospace, with a shell prompt before
  each run: `<username>@fedora ~$ python3 exercise.py` (Python) or
  `<username>@fedora ~$ node exercise.js` (Core JS). `<username>` is the
  active profile's name.
- `console.log`/`print` output renders in light gray/white; errors render
  inline in red (no separate red box) as if the shell printed a
  traceback/stack trace.
- A blinking-cursor idle state after output finishes, matching the
  approved mockup.
- Hard offset drop-shadow under the terminal window (no blur), consistent
  with the button system's "no soft shadows" rule.

### Quiz (`Quiz.jsx`) — per-question flow (new behavior, confirmed with user)

Changes from today's "all questions on one page, single submit" to a
Duolingo-style gated flow:

1. One question shown at a time.
2. User picks a choice → immediately locked in (no changing the answer)
   → a full-width banner slides up from the bottom of the quiz area:
   green ("Nicely done!") with a check icon if correct, red ("Not quite")
   with an X icon if incorrect (showing the correct answer inline with
   its own check icon, others dimmed).
3. Banner includes a "Continue"/"Got it" button (in the banner's
   green/red color) that advances to the next question.
4. Choice icons (check/x) are real inline SVGs, not text glyphs (`✓`/`✗`),
   matching the approved mockup — this applies both to the small icon
   next to the answered choice and the larger badge icon in the banner.
5. After the last question's "Continue", the quiz is done: score is
   recorded the same way as today (`saveQuizScore`), and the lesson's
   completion flow proceeds (this replaces the separate manual "submit
   quiz" step from the old design, but keeps the same underlying
   `quizScore`/`quizAttempts` persistence shape — no data model change).

`quizAttempts` increments once per full quiz attempt (i.e., once when the
last question's Continue is pressed), not per individual question,
matching today's semantics.

## Component/file impact

Primarily a styling + layout pass, with two behavior changes:

- `src/index.css` — full rewrite: new color tokens (light/dark), Plus
  Jakarta Sans, button/card/panel/node/banner styles.
- `src/context/ThemeContext.jsx` — **new**, theme detection/toggle/persist.
- `src/components/Header.jsx` — add theme toggle, restyle wordmark.
- `src/pages/ProfilePicker.jsx` — restyle only.
- `src/pages/Landing.jsx` — restyle only (colored cards, progress bar).
- `src/pages/CoursePage.jsx` — restyle **and** new locking logic (derives
  locked/current/completed per lesson from `progress`) **and** new
  winding-path presentational layout.
- `src/pages/LessonPage.jsx` — restyle; quiz completion wiring adjusts to
  the new per-question flow's completion signal.
- `src/components/Quiz.jsx` — behavior change to per-question flow +
  banner UI, restyle.
- `src/components/CodeEditor.jsx` / `LivePreviewFrame.jsx` — restyle
  output/preview panel chrome; add terminal framing for worker-based
  output (Core JS/Python).
- `package.json` — add `@fontsource/plus-jakarta-sans`.

No changes to: `src/content/**`, `src/lib/**`, `src/workers/**`,
`src/context/ProfileContext.jsx` (aside from being read by the new
ThemeContext for the per-profile key), `src/context/ProgressContext.jsx`
persistence shape.

## Testing / verification approach

Manual-in-browser, consistent with the existing project's approach (this
app is UI-heavy; automated tests don't cover visual/interaction quality):

- Both themes: confirm system-preference detection on first load, manual
  toggle flips and persists per profile across reload, and every
  restyled surface (header, picker, landing cards, path, lesson page,
  terminal panel, quiz banner) reads correctly in both.
- All 5 course accent colors render correctly on landing cards, path
  nodes, and primary buttons for that course.
- Course page: confirm lesson locking — first lesson unlocked, next
  lesson locks until previous is completed, completing a lesson unlocks
  the next, locked nodes aren't clickable but are announced correctly via
  screen reader (`aria-label` check), tab order matches lesson order.
- Quiz: complete a multi-question quiz end-to-end confirming per-question
  banners (correct and incorrect cases), correct-answer reveal on a wrong
  pick, and that finishing the last question correctly triggers lesson
  completion/next-lesson flow; confirm `quizScore`/`quizAttempts` persist
  correctly across reload (same semantics as before).
- Terminal panel: run one Core JS and one Python exercise, confirm
  prompt shows the active profile's username, output and a triggered
  error both render correctly, panel matches terminal chrome.
- HTML/CSS/Web JS: confirm the live iframe preview still updates on edit
  with the new panel chrome.
- Confirm landing page progress bars and course-page node states update
  after completing lessons, and "Reset progress" still clears state
  correctly.

## Build/run

Unchanged: `npm install`, `npm run dev`, `npm run build` + `npm run
preview`. Adding `@fontsource/plus-jakarta-sans` is a normal npm
dependency, no build config changes needed.
