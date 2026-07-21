# Coding Courses Platform — Design Spec

Date: 2026-07-21

## Summary

A single-page web application (React + Vite, no backend) offering five
comprehensive, self-contained courses:

1. **HTML**
2. **CSS**
3. **Web JavaScript** — DOM manipulation, events, browser APIs
4. **Core JavaScript** — the language itself (variables, functions, closures,
   prototypes, classes, async, modules) with no DOM/browser dependency
5. **Python**

Access is gated by a lightweight **username-only profile** system (no
password, no real auth — see "Profiles" below) so that progress can be
saved per named user, e.g. on a shared computer.

Each course has 15-18 lessons. Each lesson contains: a written explanation,
a worked example, a live interactive coding exercise, and a short quiz.
All progress (lesson completion, quiz scores, in-progress exercise code) is
persisted in the browser's `localStorage` — there is no server and no
account system.

## Non-goals

- No backend, no auth, no multi-device sync.
- No video content — text + code only.
- No offline support for the Python course specifically (Pyodide is
  fetched from a CDN on first use per browser; everything else works
  fully offline after the initial `npm install`/build).

## Profiles (username-only "login")

Not real authentication — there is no password, no server, no session
security. It exists purely to namespace saved progress by name.

- On first visit (no active profile in `localStorage`), the user sees a
  simple screen: enter a username, "Continue."
- Uniqueness is checked only against other profile names already stored
  in this browser's `localStorage` (there is no server to check
  against). If taken, show an inline error and let them try another
  name or select the existing profile instead (see below).
- If profiles already exist in this browser, the screen instead offers:
  pick one of the existing profile names to continue as that user, or
  "New profile" to create another.
- Once selected, the active profile name is stored (e.g. under
  `webu:activeProfile`) and the app auto-continues to that profile's
  content on every future visit — no re-entry needed.
- A "Switch user" control (visible in the app header/footer) clears the
  active-profile pointer and returns to the picker screen, without
  deleting any profile's data.
- Deleting a profile (and its saved progress) is available from the same
  picker screen as a secondary action.

## Architecture

- **React + Vite**, client-side only, static build output.
- **React Router** (`BrowserRouter`) for navigation:
  - `/` — landing page with course cards + progress bars (redirects to
    the profile picker if no active profile is set)
  - `/profile` — profile picker / creation screen
  - `/course/:courseId` — lesson list for a course
  - `/course/:courseId/lesson/:lessonId` — lesson content
- **CodeMirror 6** for all code editor panels (syntax highlighting per
  language: HTML/CSS/JS/Python modes).
- Plain hand-written CSS with a small shared design-system layer
  (CSS custom properties for color/spacing/typography). No CSS framework
  dependency.
- `react-markdown` renders lesson explanation text (authored as markdown
  strings within the content data files) including fenced code blocks.

## Content model

Course content lives in structured JS data modules, one file per course
under `src/content/<courseId>/lessons.js`, each exporting an array of
lesson objects:

```js
{
  id: 'html-1-document-structure',
  title: 'Document Structure',
  explanation: '...markdown...',
  example: { code: '...', language: 'html' },
  exercise: {
    starterCode: '...',
    instructions: '...',
    // for HTML/CSS/Web-JS: rendered live in an iframe
    // for Core JS / Python: run in a worker, output captured
  },
  quiz: [
    { question: '...', choices: ['...'], correctIndex: 0 }
  ],
}
```

Curriculum outlines (final lesson lists may adjust slightly during
authoring, but scope/order stays within this shape):

**HTML** — document structure; text & semantic markup; links &
navigation; images & media; lists; tables; forms & inputs; semantic
HTML5 & accessibility basics; divs/spans & layout containers; metadata,
head & SEO basics; embedding media (iframe/audio/video); HTML5 data
attributes & canvas intro; ARIA & accessibility deep dive; validation &
best practices; capstone project.

**CSS** — selectors & specificity; box model; colors/units/typography;
display & positioning; Flexbox; Grid; responsive design & media queries;
pseudo-classes/elements; transitions & animations; transforms; custom
properties (CSS variables); advanced selectors & combinators; CSS
architecture (BEM, organization); modern CSS (clamp, container queries);
capstone responsive layout project.

**Web JavaScript** — intro to the DOM; selecting & manipulating
elements; events & listeners; event delegation & bubbling; forms &
validation in JS; creating/removing DOM nodes, templates; fetch & working
with APIs; async UI patterns; localStorage/sessionStorage; timers;
browser APIs (geolocation, canvas basics); working with JSON; debugging
in devtools (conceptual); building an interactive widget; capstone app.

**Core JavaScript** — variables, types & coercion; operators & control
flow; functions & scope; arrays & array methods; objects & object
methods; destructuring & spread/rest; closures; `this` & context;
prototypes & prototypal inheritance; classes; higher-order functions &
functional patterns; error handling; async — callbacks & promises;
async/await; generators & iterators; modules (import/export); advanced
patterns (debounce/throttle, currying); capstone algorithm challenges.

**Python** — variables & types; operators & control flow; strings &
string methods; lists & tuples; dictionaries & sets; functions & scope;
comprehensions; modules & stdlib overview; file I/O (Pyodide virtual FS);
error handling (try/except); classes & OOP; inheritance & polymorphism;
decorators; generators & iterators; context managers; common stdlib
(json, datetime, re); capstone mini project.

## Code execution sandboxes

- **HTML/CSS/Web JS**: live preview rendered in a sandboxed
  `<iframe srcdoc>`, rebuilt on a debounce as the user edits. Web JS
  exercises wrap the user's code in a minimal HTML shell so DOM code
  runs against real elements.
- **Core JS**: executed in a **Web Worker**, with a timeout guard to kill
  runaway/infinite loops. `console.log`/error output is captured via a
  shimmed console and streamed to an output panel.
- **Python**: **Pyodide**, loaded lazily (first Python exercise opened)
  from a CDN, executed in a Web Worker. Output/errors captured the same
  way as Core JS. A loading state is shown while Pyodide initializes.

## Persistence (localStorage)

Two top-level concerns:

- `webu:profiles` — array of known profile names that exist in this
  browser, e.g. `["sofia", "alex"]`.
- `webu:activeProfile` — the currently active profile name (or absent,
  meaning show the picker).
- `webu:progress:<profileName>` — one namespaced key per profile, holding
  that profile's progress:

```js
{
  courses: {
    html: {
      lessons: {
        'html-1-document-structure': {
          completed: true,
          quizScore: 4, // out of quiz.length
          quizAttempts: 1,
          savedCode: '...' // last exercise code, debounced writes
        },
        ...
      }
    },
    css: { ... }, webjs: { ... }, corejs: { ... }, python: { ... }
  }
}
```

- Written on: exercise code change (debounced ~500ms), quiz submit,
  lesson marked complete.
- Read on app load (and whenever the active profile changes) into React
  context, keyed by the current active profile; all components read/write
  through a `useProgress()` hook backed by that context.
- A "Reset progress" control (in a settings/footer area) clears only the
  active profile's `webu:progress:<profileName>` key.
- Deleting a profile (from the picker screen) removes its name from
  `webu:profiles` and deletes its `webu:progress:<profileName>` key.

## UI / pages

- **Landing page**: 5 course cards, each showing a progress bar
  (completed lessons / total) and a "Continue" or "Start" button.
- **Course page**: ordered lesson list with checkmarks for completed
  lessons, quiz score badges, click-through to a lesson.
- **Lesson page**: explanation → worked example (read-only code block) →
  interactive exercise (editor + live preview/output panel) → quiz →
  "Mark complete" / "Next lesson" navigation.

## Testing / verification approach

This is UI-heavy and behavior (not just types) matters, so verification
is manual-in-browser rather than automated tests:

- Confirm the profile flow: creating a new profile, rejecting a
  duplicate username, auto-continuing to the same profile on reload,
  switching to a second profile with independent progress, and deleting
  a profile.
- Run the Vite dev server and, for each of the 5 execution types
  (HTML preview, CSS preview, Web JS preview, Core JS worker execution,
  Python/Pyodide worker execution), complete one full lesson: edit the
  exercise code, confirm live output updates, submit the quiz, mark
  complete, refresh the page, and confirm progress (completion, quiz
  score, saved code) survived the refresh.
- Confirm the landing page progress bars update after completing lessons.
- Confirm "Reset progress" actually clears state.

## Build/run

Standard Vite project: `npm install`, `npm run dev` for local
development, `npm run build` + `npm run preview` for a production build.
No other tooling required.
