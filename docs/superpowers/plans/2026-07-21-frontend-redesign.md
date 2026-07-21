# Frontend Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace CodeCraft's generic dark-purple-gradient look with a Duolingo-inspired design system (per-course colors, chunky buttons, winding lesson path, terminal-styled code output, per-question quiz flow) in both light and dark themes.

**Architecture:** Pure CSS/component restyle layered on the existing React + Vite app, plus two small behavior changes (sequential lesson locking within a course, one-question-at-a-time quiz flow) implemented as small pure-logic modules under `src/lib/` (unit tested) with thin React components consuming them.

**Tech Stack:** React 18, Vite, `@uiw/react-codemirror`, `react-markdown`, `react-router-dom`, Vitest + Testing Library (already configured), new dependency `@fontsource/plus-jakarta-sans`.

## Global Constraints

- Design spec: `docs/superpowers/specs/2026-07-21-frontend-redesign-design.md` — every task below implements a specific section of it; re-read it if a task's intent is unclear.
- No gradients anywhere (the biggest "generic AI SaaS" tell in the current design).
- Course accent colors: HTML `#FF4B4B`, CSS `#1CB0F6`, Web JS `#FFC800`, Core JS `#CE82FF`, Python `#58CC02`.
- Typography: Plus Jakarta Sans everywhere except code, self-hosted via `@fontsource` (no Google Fonts CDN — the app must stay offline-capable after build).
- Code/terminal panels stay visually dark regardless of the app's light/dark theme.
- No cross-course locking — all 5 courses stay independently reachable from the landing page. Only lessons *within* a course are gated sequentially.
- `quizAttempts` increments once per full quiz attempt (once when the last question's Continue is pressed) — matches existing `saveQuizScore` semantics in `src/lib/progress.js`, which must not change.
- Follow the existing `src/lib/*.js` pattern (plain exported functions, localStorage-backed, no React) for any new persistence logic.
- Run `npm run test` (vitest) after every task that adds/changes a `*.test.js`/`*.test.jsx` file.

---

## File structure overview

New files:
- `src/lib/theme.js` + `src/lib/theme.test.js` — system theme detection, per-profile theme storage.
- `src/context/ThemeContext.jsx` — theme state, toggle, applies `data-theme` to `<html>`.
- `src/components/Icon.jsx` + `src/components/Icon.test.jsx` — shared check/x/lock SVG icon.
- `src/lib/lessonStatus.js` + `src/lib/lessonStatus.test.js` — pure completed/current/locked derivation.
- `src/components/LessonPath.jsx` + `src/components/LessonPath.test.jsx` — winding path UI for the course page.
- `src/components/TerminalOutput.jsx` + `src/components/TerminalOutput.test.jsx` — terminal-styled worker output panel.

Modified files:
- `src/index.css` — full rewrite (tokens, typography, buttons, cards, path, terminal, quiz banner).
- `index.html` — inline pre-paint theme-detection script.
- `src/main.jsx` — font imports.
- `src/content/courses.js` — new accent hex values.
- `src/context/ProfileContext.jsx` — unchanged (read-only dependency for ThemeContext).
- `App.jsx` — wrap with `ThemeProvider`.
- `src/components/Header.jsx` — theme toggle.
- `src/pages/Landing.jsx` — CTA restyle.
- `src/pages/ProfilePicker.jsx` — card restyle.
- `src/pages/CoursePage.jsx` — use `LessonPath`.
- `src/components/Quiz.jsx` — per-question flow + banner.
- `src/pages/LessonPage.jsx` — wire new `Quiz` `onFinish`, use `TerminalOutput`, wrap exercise panels.
- `src/components/CodeEditor.jsx` / `src/components/LivePreviewFrame.jsx` — panel chrome.
- `package.json` — add `@fontsource/plus-jakarta-sans`.

---

### Task 1: Font + base CSS tokens (colors, typography, buttons)

**Files:**
- Modify: `package.json`
- Modify: `index.html`
- Modify: `src/main.jsx`
- Modify: `src/content/courses.js`
- Modify: `src/index.css`

**Interfaces:**
- Produces: CSS custom properties `--bg`, `--bg-subtle`, `--surface`, `--border`, `--border-strong`, `--text`, `--text-muted`, `--text-faint`, `--success`, `--success-dark`, `--success-tint`, `--danger`, `--danger-dark`, `--danger-tint`, `--gold`, `--gold-dark`, `--radius-sm`, `--radius`, `--radius-lg`, `--font-heading`, `--font-body`, `--font-mono` (all consumed by every later CSS task). Produces `.btn`, `.btn-primary`, `.btn-ghost`, `.btn-danger`, `.btn-block` button classes. Produces `[data-theme="dark"]` / `[data-theme="light"]` selectors that every themed page relies on.
- Consumes: nothing (foundation task).

- [ ] **Step 1: Install the font package**

Run: `npm install @fontsource/plus-jakarta-sans`
Expected: `package.json` gains a new dependency entry, `node_modules/@fontsource/plus-jakarta-sans` exists.

- [ ] **Step 2: Import font weights in `src/main.jsx`**

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import '@fontsource/plus-jakarta-sans/400.css';
import '@fontsource/plus-jakarta-sans/600.css';
import '@fontsource/plus-jakarta-sans/800.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
```

- [ ] **Step 3: Add the pre-paint theme-detection script to `index.html`**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <script>
      (function () {
        try {
          var active = localStorage.getItem('webu:activeProfile');
          var stored = active ? localStorage.getItem('webu:theme:' + active) : null;
          var theme = stored === 'light' || stored === 'dark'
            ? stored
            : (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
          document.documentElement.setAttribute('data-theme', theme);
        } catch (e) {
          document.documentElement.setAttribute('data-theme', 'light');
        }
      })();
    </script>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>CodeCraft — Learn HTML, CSS, JS &amp; Python</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

This is a duplicate of the storage-key format used in `src/lib/theme.js` (Task 2) and `src/lib/profiles.js`'s `webu:activeProfile` key — both must stay in sync with this literal string if ever renamed.

- [ ] **Step 4: Update course accent colors in `src/content/courses.js`**

Change only the five `accent` values (everything else in the file is unchanged):

```js
  {
    id: 'html',
    title: 'HTML',
    description: 'Structure the web with semantic markup.',
    accent: '#FF4B4B',
    lessons: htmlLessons,
  },
  {
    id: 'css',
    title: 'CSS',
    description: 'Style and lay out pages, from the box model to Grid.',
    accent: '#1CB0F6',
    lessons: cssLessons,
  },
  {
    id: 'webjs',
    title: 'Web JavaScript',
    description: 'The DOM, events, and browser APIs.',
    accent: '#FFC800',
    lessons: webjsLessons,
  },
  {
    id: 'corejs',
    title: 'Core JavaScript',
    description: 'The language itself — no browser required.',
    accent: '#CE82FF',
    lessons: corejsLessons,
  },
  {
    id: 'python',
    title: 'Python',
    description: 'A general-purpose language, from syntax to OOP.',
    accent: '#58CC02',
    lessons: pythonLessons,
  },
```

- [ ] **Step 5: Rewrite `src/index.css` foundation (tokens, typography, buttons)**

Replace the entire file with:

```css
:root {
  --bg: #ffffff;
  --bg-subtle: #fafafa;
  --surface: #ffffff;
  --border: #e5e5e0;
  --border-strong: #d5d5d0;
  --text: #3c3c3c;
  --text-muted: #777777;
  --text-faint: #afafa5;
  --success: #58cc02;
  --success-dark: #46a302;
  --success-tint: #dff7e0;
  --danger: #ff4b4b;
  --danger-dark: #d63a3a;
  --danger-tint: #ffe5e5;
  --gold: #ffc800;
  --gold-dark: #e0a800;
  --radius-sm: 10px;
  --radius: 14px;
  --radius-lg: 20px;
  --font-heading: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
  --font-body: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
  --font-mono: 'Cascadia Code', Consolas, monospace;
  color-scheme: light;
}

[data-theme='dark'] {
  --bg: #131f24;
  --bg-subtle: #0e181d;
  --surface: #1a2b32;
  --border: #2b3d45;
  --border-strong: #0f1a1f;
  --text: #f2f2f2;
  --text-muted: #8a97a0;
  --text-faint: #5a6a72;
  --success-dark: #3f9401;
  --success-tint: #173318;
  --danger-dark: #c23a3a;
  --danger-tint: #3d2020;
  --gold-dark: #cc9f00;
  color-scheme: dark;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: var(--font-body);
  background: var(--bg);
  color: var(--text);
  line-height: 1.6;
}

h1,
h2,
h3 {
  font-family: var(--font-heading);
  font-weight: 800;
  color: var(--text);
}

a {
  color: inherit;
  text-decoration: none;
}

.muted {
  color: var(--text-muted);
}

.label {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.error-text {
  color: var(--danger);
  font-size: 0.9rem;
  margin: 0;
}

/* Buttons */
.btn {
  font-family: var(--font-heading);
  font-weight: 800;
  font-size: 0.95rem;
  letter-spacing: 0.3px;
  border-radius: var(--radius);
  border: 2px solid var(--border);
  border-bottom: 4px solid var(--border-strong);
  background: var(--surface);
  color: var(--text-muted);
  padding: 12px 24px;
  cursor: pointer;
  transition: transform 0.05s ease, border-bottom-width 0.05s ease;
}

.btn:hover:not(:disabled) {
  border-color: var(--accent, var(--success));
}

.btn:active:not(:disabled) {
  transform: translateY(2px);
  border-bottom-width: 2px;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-primary {
  background: var(--accent, var(--success));
  border-color: var(--accent, var(--success));
  border-bottom-color: color-mix(in srgb, var(--accent, var(--success)) 75%, black);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  border-color: var(--accent, var(--success));
}

.btn-ghost {
  background: transparent;
  border-color: transparent;
  border-bottom-color: transparent;
}

.btn-ghost:hover:not(:disabled) {
  border-color: var(--border);
  border-bottom-color: var(--border-strong);
}

.btn-danger {
  color: var(--danger);
}

.btn-block {
  width: 100%;
  text-align: left;
}
```

- [ ] **Step 6: Manually verify the foundation compiles**

Run: `npm run dev`
Expected: dev server starts without errors; opening the app shows unstyled-but-functional pages (later tasks add the rest of the classes) in the new font, with no console errors about missing CSS variables.

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json index.html src/main.jsx src/content/courses.js src/index.css
git commit -m "feat: add Plus Jakarta Sans and base color/typography/button tokens"
```

---

### Task 2: Theme library + ThemeContext + header toggle

**Files:**
- Create: `src/lib/theme.js`
- Create: `src/lib/theme.test.js`
- Create: `src/context/ThemeContext.jsx`
- Modify: `src/App.jsx`
- Modify: `src/components/Header.jsx`
- Modify: `src/index.css` (append)

**Interfaces:**
- Consumes: `useProfile()` from `src/context/ProfileContext.jsx` (returns `{ activeProfile }`).
- Produces: `getSystemTheme(): 'light'|'dark'`, `getStoredTheme(profileName): 'light'|'dark'|null`, `setStoredTheme(profileName, theme)` from `src/lib/theme.js`. `ThemeProvider`, `useTheme(): { theme: 'light'|'dark', toggleTheme: () => void }` from `src/context/ThemeContext.jsx` — consumed by `Header.jsx` in this task and available to any later component.

- [ ] **Step 1: Write the failing tests for `src/lib/theme.js`**

```js
// src/lib/theme.test.js
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getSystemTheme, getStoredTheme, setStoredTheme } from './theme.js';

function mockMatchMedia(matches) {
  window.matchMedia = vi.fn().mockImplementation((query) => ({
    matches,
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  }));
}

beforeEach(() => {
  localStorage.clear();
});

describe('getSystemTheme', () => {
  it('returns dark when the OS prefers dark', () => {
    mockMatchMedia(true);
    expect(getSystemTheme()).toBe('dark');
  });

  it('returns light when the OS does not prefer dark', () => {
    mockMatchMedia(false);
    expect(getSystemTheme()).toBe('light');
  });
});

describe('getStoredTheme / setStoredTheme', () => {
  it('returns null when nothing is stored for the profile', () => {
    expect(getStoredTheme('sofia')).toBeNull();
  });

  it('returns null when no profile name is given', () => {
    expect(getStoredTheme(null)).toBeNull();
  });

  it('stores and retrieves a theme for a profile', () => {
    setStoredTheme('sofia', 'dark');
    expect(getStoredTheme('sofia')).toBe('dark');
  });

  it('keeps themes separate per profile', () => {
    setStoredTheme('sofia', 'dark');
    setStoredTheme('alex', 'light');
    expect(getStoredTheme('sofia')).toBe('dark');
    expect(getStoredTheme('alex')).toBe('light');
  });

  it('ignores a corrupted stored value', () => {
    localStorage.setItem('webu:theme:sofia', 'not-a-theme');
    expect(getStoredTheme('sofia')).toBeNull();
  });
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npx vitest run src/lib/theme.test.js`
Expected: FAIL — `Failed to resolve import "./theme.js"` (file doesn't exist yet).

- [ ] **Step 3: Implement `src/lib/theme.js`**

```js
function storageKey(profileName) {
  return `webu:theme:${profileName}`;
}

export function getSystemTheme() {
  if (typeof window === 'undefined' || !window.matchMedia) return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function getStoredTheme(profileName) {
  if (!profileName) return null;
  const raw = localStorage.getItem(storageKey(profileName));
  return raw === 'light' || raw === 'dark' ? raw : null;
}

export function setStoredTheme(profileName, theme) {
  if (!profileName) return;
  localStorage.setItem(storageKey(profileName), theme);
}
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npx vitest run src/lib/theme.test.js`
Expected: PASS — 6 tests passing.

- [ ] **Step 5: Implement `src/context/ThemeContext.jsx`**

```jsx
import { createContext, useContext, useEffect, useState } from 'react';
import * as themeLib from '../lib/theme.js';
import { useProfile } from './ProfileContext.jsx';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const { activeProfile } = useProfile();
  const [theme, setThemeState] = useState(
    () => themeLib.getStoredTheme(activeProfile) || themeLib.getSystemTheme()
  );

  useEffect(() => {
    setThemeState(themeLib.getStoredTheme(activeProfile) || themeLib.getSystemTheme());
  }, [activeProfile]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark';
    setThemeState(next);
    themeLib.setStoredTheme(activeProfile, next);
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider');
  return ctx;
}
```

- [ ] **Step 6: Wrap the app in `ThemeProvider` in `src/App.jsx`**

```jsx
import { Navigate, Route, Routes } from 'react-router-dom';
import { ProfileProvider, useProfile } from './context/ProfileContext.jsx';
import { ProgressProvider } from './context/ProgressContext.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import Header from './components/Header.jsx';
import ProfilePicker from './pages/ProfilePicker.jsx';
import Landing from './pages/Landing.jsx';
import CoursePage from './pages/CoursePage.jsx';
import LessonPage from './pages/LessonPage.jsx';

function RequireProfile({ children }) {
  const { activeProfile } = useProfile();
  if (!activeProfile) return <Navigate to="/profile" replace />;
  return children;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/profile" element={<ProfilePicker />} />
      <Route
        path="/"
        element={
          <RequireProfile>
            <ProgressProvider>
              <Landing />
            </ProgressProvider>
          </RequireProfile>
        }
      />
      <Route
        path="/course/:courseId"
        element={
          <RequireProfile>
            <ProgressProvider>
              <CoursePage />
            </ProgressProvider>
          </RequireProfile>
        }
      />
      <Route
        path="/course/:courseId/lesson/:lessonId"
        element={
          <RequireProfile>
            <ProgressProvider>
              <LessonPage />
            </ProgressProvider>
          </RequireProfile>
        }
      />
    </Routes>
  );
}

export default function App() {
  return (
    <ProfileProvider>
      <ThemeProvider>
        <div className="app-shell">
          <Header />
          <main className="app-main">
            <AppRoutes />
          </main>
        </div>
      </ThemeProvider>
    </ProfileProvider>
  );
}
```

- [ ] **Step 7: Add the theme toggle to `src/components/Header.jsx`**

```jsx
import { Link } from 'react-router-dom';
import { useProfile } from '../context/ProfileContext.jsx';
import { useTheme } from '../context/ThemeContext.jsx';

export default function Header() {
  const { activeProfile, switchUser } = useProfile();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="app-header">
      <Link to="/" className="app-logo">
        CodeCraft
      </Link>
      <div className="app-header-right">
        <button
          type="button"
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          aria-pressed={theme === 'dark'}
        >
          <span className="theme-toggle-thumb" />
        </button>
        {activeProfile && (
          <>
            <span className="app-user">{activeProfile}</span>
            <button type="button" className="btn btn-ghost" onClick={switchUser}>
              Switch user
            </button>
          </>
        )}
      </div>
    </header>
  );
}
```

- [ ] **Step 8: Append header + theme-toggle styles to `src/index.css`**

```css
.app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 32px;
  border-bottom: 3px solid var(--border);
  background: var(--surface);
}

.app-logo {
  font-family: var(--font-heading);
  font-weight: 800;
  font-size: 1.3rem;
  color: var(--text);
}

.app-header-right {
  display: flex;
  align-items: center;
  gap: 14px;
}

.app-user {
  font-weight: 700;
  color: var(--text-muted);
}

.app-main {
  flex: 1;
  max-width: 960px;
  width: 100%;
  margin: 0 auto;
  padding: 32px 24px 80px;
}

.theme-toggle {
  width: 44px;
  height: 24px;
  border-radius: 12px;
  border: 2px solid var(--border);
  background: var(--bg-subtle);
  padding: 2px;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.theme-toggle-thumb {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--text-muted);
  transition: transform 0.15s ease;
}

.theme-toggle[aria-pressed='true'] .theme-toggle-thumb {
  transform: translateX(18px);
  background: var(--success);
}
```

- [ ] **Step 9: Run the full test suite**

Run: `npm run test`
Expected: PASS — all existing tests plus the 6 new `theme.test.js` tests pass.

- [ ] **Step 10: Manually verify in the browser**

Run: `npm run dev`, open the app, log in with a profile.
Expected: a toggle switch appears in the header next to the username; clicking it flips the page between light/dark backgrounds instantly and the thumb slides; reloading the page keeps the chosen theme for that profile.

- [ ] **Step 11: Commit**

```bash
git add src/lib/theme.js src/lib/theme.test.js src/context/ThemeContext.jsx src/App.jsx src/components/Header.jsx src/index.css
git commit -m "feat: add light/dark theme toggle persisted per profile"
```

---

### Task 3: Shared Icon component

**Files:**
- Create: `src/components/Icon.jsx`
- Create: `src/components/Icon.test.jsx`

**Interfaces:**
- Produces: `<Icon name="check"|"x"|"lock" size={18} strokeWidth={3} />` — an inline SVG using `stroke="currentColor"` so callers control color via CSS `color`. Consumed by `Quiz.jsx` (Task 8) and `LessonPath.jsx` (Task 5).
- Consumes: nothing.

- [ ] **Step 1: Write the failing test**

```jsx
// src/components/Icon.test.jsx
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Icon from './Icon.jsx';

describe('Icon', () => {
  it('renders a check icon with a polyline', () => {
    const { container } = render(<Icon name="check" />);
    expect(container.querySelector('svg')).toBeTruthy();
    expect(container.querySelector('polyline')).toBeTruthy();
  });

  it('renders an x icon with two lines', () => {
    const { container } = render(<Icon name="x" />);
    expect(container.querySelectorAll('line')).toHaveLength(2);
  });

  it('renders a lock icon with a rect and a path', () => {
    const { container } = render(<Icon name="lock" />);
    expect(container.querySelector('rect')).toBeTruthy();
    expect(container.querySelector('path')).toBeTruthy();
  });

  it('applies the requested size', () => {
    const { container } = render(<Icon name="check" size={32} />);
    expect(container.querySelector('svg').getAttribute('width')).toBe('32');
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run src/components/Icon.test.jsx`
Expected: FAIL — `Failed to resolve import "./Icon.jsx"`.

- [ ] **Step 3: Implement `src/components/Icon.jsx`**

```jsx
const PATHS = {
  check: <polyline points="4 12 9 17 20 6" />,
  x: (
    <>
      <line x1="6" y1="6" x2="18" y2="18" />
      <line x1="18" y1="6" x2="6" y2="18" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </>
  ),
};

export default function Icon({ name, size = 18, strokeWidth = 3 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {PATHS[name]}
    </svg>
  );
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run src/components/Icon.test.jsx`
Expected: PASS — 4 tests passing.

- [ ] **Step 5: Commit**

```bash
git add src/components/Icon.jsx src/components/Icon.test.jsx
git commit -m "feat: add shared check/x/lock Icon component"
```

---

### Task 4: Lesson status derivation (`src/lib/lessonStatus.js`)

**Files:**
- Create: `src/lib/lessonStatus.js`
- Create: `src/lib/lessonStatus.test.js`

**Interfaces:**
- Produces: `getLessonStatuses(lessons, courseProgress): Array<'completed'|'current'|'locked'>`, one entry per `lessons` array index, same order — consumed by `LessonPath.jsx` (Task 5).
- Consumes: `lessons: Array<{ id: string }>` (a course's `.lessons`), `courseProgress: { lessons: { [lessonId]: { completed: boolean } } }` (matches the shape already produced by `progress.courses[courseId] || { lessons: {} }` in `CoursePage.jsx`/`ProgressContext.jsx`).

- [ ] **Step 1: Write the failing tests**

```js
// src/lib/lessonStatus.test.js
import { describe, it, expect } from 'vitest';
import { getLessonStatuses } from './lessonStatus.js';

const lessons = [{ id: 'a' }, { id: 'b' }, { id: 'c' }];

describe('getLessonStatuses', () => {
  it('marks the first lesson current and the rest locked when nothing is completed', () => {
    const progress = { lessons: {} };
    expect(getLessonStatuses(lessons, progress)).toEqual(['current', 'locked', 'locked']);
  });

  it('marks the lesson after the last completed one as current', () => {
    const progress = { lessons: { a: { completed: true } } };
    expect(getLessonStatuses(lessons, progress)).toEqual(['completed', 'current', 'locked']);
  });

  it('marks every lesson completed once all are done', () => {
    const progress = {
      lessons: { a: { completed: true }, b: { completed: true }, c: { completed: true } },
    };
    expect(getLessonStatuses(lessons, progress)).toEqual(['completed', 'completed', 'completed']);
  });

  it('does not treat a non-consecutive completed lesson as unlocking further lessons', () => {
    const progress = { lessons: { c: { completed: true } } };
    expect(getLessonStatuses(lessons, progress)).toEqual(['current', 'locked', 'locked']);
  });

  it('returns an empty array for an empty lesson list', () => {
    expect(getLessonStatuses([], { lessons: {} })).toEqual([]);
  });
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npx vitest run src/lib/lessonStatus.test.js`
Expected: FAIL — `Failed to resolve import "./lessonStatus.js"`.

- [ ] **Step 3: Implement `src/lib/lessonStatus.js`**

```js
export function getLessonStatuses(lessons, courseProgress) {
  const firstIncompleteIndex = lessons.findIndex(
    (lesson) => !courseProgress.lessons[lesson.id]?.completed
  );

  return lessons.map((_, index) => {
    if (firstIncompleteIndex === -1 || index < firstIncompleteIndex) return 'completed';
    if (index === firstIncompleteIndex) return 'current';
    return 'locked';
  });
}
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npx vitest run src/lib/lessonStatus.test.js`
Expected: PASS — 5 tests passing.

- [ ] **Step 5: Commit**

```bash
git add src/lib/lessonStatus.js src/lib/lessonStatus.test.js
git commit -m "feat: add pure lesson lock/current/completed derivation"
```

---

### Task 5: Winding lesson path (`LessonPath.jsx`) + `CoursePage.jsx` wiring

**Files:**
- Create: `src/components/LessonPath.jsx`
- Create: `src/components/LessonPath.test.jsx`
- Modify: `src/pages/CoursePage.jsx`
- Modify: `src/index.css` (append)

**Interfaces:**
- Consumes: `getLessonStatuses` from `src/lib/lessonStatus.js` (Task 4), `<Icon />` from `src/components/Icon.jsx` (Task 3), `react-router-dom`'s `<Link>`.
- Produces: `<LessonPath courseId={string} lessons={Array<{id, title, quiz}>} courseProgress={{lessons: {}}} />` — consumed by `CoursePage.jsx` in this task.

- [ ] **Step 1: Write the failing tests**

```jsx
// src/components/LessonPath.test.jsx
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import LessonPath from './LessonPath.jsx';

const lessons = [
  { id: 'a', title: 'Intro', quiz: [{}] },
  { id: 'b', title: 'Basics', quiz: [{}] },
  { id: 'c', title: 'Advanced', quiz: [{}] },
];

function renderPath(courseProgress) {
  return render(
    <MemoryRouter>
      <LessonPath courseId="html" lessons={lessons} courseProgress={courseProgress} />
    </MemoryRouter>
  );
}

describe('LessonPath', () => {
  it('renders a real link for the completed lesson, labeled with its status', () => {
    renderPath({ lessons: { a: { completed: true } } });
    const link = screen.getByRole('link', { name: 'Intro, completed' });
    expect(link).toHaveAttribute('href', '/course/html/lesson/a');
  });

  it('renders a real link for the current lesson, labeled with its status', () => {
    renderPath({ lessons: { a: { completed: true } } });
    const link = screen.getByRole('link', { name: 'Basics, current lesson' });
    expect(link).toHaveAttribute('href', '/course/html/lesson/b');
  });

  it('renders a locked lesson as a non-link, aria-disabled element', () => {
    renderPath({ lessons: { a: { completed: true } } });
    const locked = screen.getByLabelText('Advanced, locked');
    expect(locked.tagName).not.toBe('A');
    expect(locked).toHaveAttribute('aria-disabled', 'true');
  });

  it('renders lesson titles in DOM order regardless of the alternating visual position', () => {
    renderPath({ lessons: {} });
    const items = screen.getAllByRole('listitem');
    expect(items.map((li) => li.textContent)).toEqual(
      expect.arrayContaining([expect.stringContaining('Intro')])
    );
    expect(items[0].textContent).toContain('Intro');
    expect(items[1].textContent).toContain('Basics');
    expect(items[2].textContent).toContain('Advanced');
  });
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npx vitest run src/components/LessonPath.test.jsx`
Expected: FAIL — `Failed to resolve import "./LessonPath.jsx"`.

- [ ] **Step 3: Implement `src/components/LessonPath.jsx`**

```jsx
import { Link } from 'react-router-dom';
import { getLessonStatuses } from '../lib/lessonStatus.js';
import Icon from './Icon.jsx';

const POSITIONS = ['pos-center', 'pos-right', 'pos-center', 'pos-left'];

export default function LessonPath({ courseId, lessons, courseProgress }) {
  const statuses = getLessonStatuses(lessons, courseProgress);

  return (
    <ol className="lesson-path">
      {lessons.map((lesson, index) => {
        const status = statuses[index];
        const position = POSITIONS[index % POSITIONS.length];
        const lessonProgress = courseProgress.lessons[lesson.id];

        return (
          <li key={lesson.id} className={`lesson-path-item ${position} ${status}`}>
            {index > 0 && <div className="lesson-path-connector" />}
            {status === 'locked' ? (
              <span
                className="lesson-path-node"
                aria-disabled="true"
                aria-label={`${lesson.title}, locked`}
              >
                <Icon name="lock" />
              </span>
            ) : (
              <Link
                to={`/course/${courseId}/lesson/${lesson.id}`}
                className="lesson-path-node"
                aria-label={`${lesson.title}, ${status === 'completed' ? 'completed' : 'current lesson'}`}
              >
                {status === 'completed' ? (
                  <Icon name="check" />
                ) : (
                  <span className="lesson-path-index">{index + 1}</span>
                )}
              </Link>
            )}
            <span className="lesson-path-title">{lesson.title}</span>
            {lessonProgress?.quizScore != null && (
              <span className="lesson-path-score">
                Quiz: {lessonProgress.quizScore}/{lesson.quiz.length}
              </span>
            )}
          </li>
        );
      })}
    </ol>
  );
}
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npx vitest run src/components/LessonPath.test.jsx`
Expected: PASS — 4 tests passing.

- [ ] **Step 5: Wire `LessonPath` into `src/pages/CoursePage.jsx`**

```jsx
import { Link, useParams } from 'react-router-dom';
import { getCourse } from '../content/courses.js';
import { useProgress } from '../context/ProgressContext.jsx';
import LessonPath from '../components/LessonPath.jsx';

export default function CoursePage() {
  const { courseId } = useParams();
  const course = getCourse(courseId);
  const { progress } = useProgress();

  if (!course) {
    return <p>Course not found.</p>;
  }

  const courseProgress = progress.courses[courseId] || { lessons: {} };

  return (
    <div className="course-page" style={{ '--accent': course.accent }}>
      <Link to="/" className="back-link">
        ← All courses
      </Link>
      <h1>{course.title}</h1>
      <p className="muted">{course.description}</p>

      <LessonPath courseId={courseId} lessons={course.lessons} courseProgress={courseProgress} />
    </div>
  );
}
```

- [ ] **Step 6: Append path styles to `src/index.css`**

```css
.back-link {
  display: inline-block;
  margin-bottom: 16px;
  color: var(--text-muted);
  font-weight: 700;
}

.lesson-path {
  list-style: none;
  margin: 32px auto;
  padding: 0;
  max-width: 420px;
  display: flex;
  flex-direction: column;
}

.lesson-path-item {
  display: flex;
  flex-direction: column;
  position: relative;
}

.lesson-path-item.pos-left {
  align-items: flex-start;
}

.lesson-path-item.pos-right {
  align-items: flex-end;
}

.lesson-path-item.pos-center {
  align-items: center;
}

.lesson-path-connector {
  width: 6px;
  height: 28px;
  background: var(--border);
  border-radius: 3px;
  margin: 0 auto;
}

.lesson-path-item.completed + .lesson-path-item .lesson-path-connector {
  background: var(--accent, var(--success));
}

.lesson-path-node {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-heading);
  font-weight: 800;
  font-size: 1.1rem;
  background: var(--border);
  color: var(--text-faint);
  cursor: pointer;
}

.lesson-path-item.completed .lesson-path-node {
  background: var(--accent, var(--success));
  border-bottom: 4px solid color-mix(in srgb, var(--accent, var(--success)) 75%, black);
  color: white;
}

.lesson-path-item.current .lesson-path-node {
  width: 64px;
  height: 64px;
  background: var(--gold);
  border: 4px solid var(--surface);
  border-bottom: 4px solid var(--gold-dark);
  color: #5c4400;
  box-shadow: 0 0 0 2px var(--gold);
}

.lesson-path-item.locked .lesson-path-node {
  cursor: not-allowed;
}

.lesson-path-title {
  margin-top: 6px;
  font-weight: 700;
  font-size: 0.9rem;
  color: var(--text);
  opacity: 0;
  transition: opacity 0.1s ease;
}

.lesson-path-item.current .lesson-path-title {
  opacity: 1;
}

.lesson-path-node:hover + .lesson-path-title,
.lesson-path-node:focus-visible + .lesson-path-title {
  opacity: 1;
}

.lesson-path-score {
  font-size: 0.75rem;
  color: var(--text-muted);
}
```

- [ ] **Step 7: Run the full test suite**

Run: `npm run test`
Expected: PASS — all tests including the 4 new `LessonPath.test.jsx` tests.

- [ ] **Step 8: Manually verify in the browser**

Run: `npm run dev`, open a course page.
Expected: lessons render as a vertical winding path (alternating center/right/center/left), completed lessons show a check icon in the course's accent color, the first incomplete lesson is a larger gold node, everything after it is grayed-out with a lock icon and is not clickable (verify by clicking — nothing happens, and tabbing skips it since it has no interactive role).

- [ ] **Step 9: Commit**

```bash
git add src/components/LessonPath.jsx src/components/LessonPath.test.jsx src/pages/CoursePage.jsx src/index.css
git commit -m "feat: replace lesson list with winding path and sequential locking"
```

---

### Task 6: Landing page restyle

**Files:**
- Modify: `src/pages/Landing.jsx`
- Modify: `src/index.css` (append)

**Interfaces:**
- Consumes: `COURSES` from `src/content/courses.js` (unchanged shape, new accent values from Task 1), `useProgress()` from `src/context/ProgressContext.jsx` (unchanged).
- Produces: nothing new consumed elsewhere.

- [ ] **Step 1: Rewrite `src/pages/Landing.jsx`**

```jsx
import { Link } from 'react-router-dom';
import { COURSES } from '../content/courses.js';
import { useProgress } from '../context/ProgressContext.jsx';

export default function Landing() {
  const { getCourseCompletion, resetProgress } = useProgress();

  return (
    <div className="landing">
      <h1>Pick a course</h1>
      <div className="course-grid">
        {COURSES.map((course) => {
          const { completed, total } = getCourseCompletion(course.id, course.lessons.length);
          const pct = total ? Math.round((completed / total) * 100) : 0;
          return (
            <Link
              to={`/course/${course.id}`}
              className="course-card"
              key={course.id}
              style={{ '--accent': course.accent }}
            >
              <h2>{course.title}</h2>
              <p className="progress-label">
                {completed} / {total} lessons
              </p>
              <div className="progress-bar">
                <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
              </div>
              <span className="btn btn-primary course-card-cta">
                {completed > 0 ? 'Continue' : 'Start'}
              </span>
            </Link>
          );
        })}
      </div>

      <button type="button" className="btn btn-ghost btn-danger reset-progress" onClick={resetProgress}>
        Reset my progress
      </button>
    </div>
  );
}
```

- [ ] **Step 2: Append landing/course-card styles to `src/index.css`**

```css
.course-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
  margin: 24px 0;
}

.course-card {
  display: block;
  background: color-mix(in srgb, var(--accent) 12%, var(--surface));
  border: 2px solid var(--accent);
  border-radius: var(--radius-lg);
  padding: 20px;
  transition: transform 0.1s ease;
}

.course-card:hover {
  transform: translateY(-2px);
}

.course-card h2 {
  margin: 0 0 4px;
  color: var(--accent);
}

.progress-bar {
  height: 10px;
  border-radius: 6px;
  background: color-mix(in srgb, var(--accent) 20%, var(--surface));
  overflow: hidden;
  margin: 8px 0 14px;
}

.progress-bar-fill {
  height: 100%;
  background: var(--accent);
}

.progress-label {
  font-size: 0.85rem;
  color: var(--text-muted);
  margin: 0;
}

.course-card-cta {
  display: inline-block;
  width: 100%;
  text-align: center;
  margin-top: 4px;
}

.reset-progress {
  margin-top: 16px;
}
```

- [ ] **Step 3: Manually verify in the browser**

Run: `npm run dev`, open the landing page (`/`).
Expected: 5 cards, each tinted in its course's accent color with a matching border, a chunky progress bar, and a "Start" or "Continue" button depending on whether any lessons are completed; "Reset my progress" still works.

- [ ] **Step 4: Commit**

```bash
git add src/pages/Landing.jsx src/index.css
git commit -m "feat: restyle landing page with per-course colored cards"
```

---

### Task 7: Profile picker restyle

**Files:**
- Modify: `src/pages/ProfilePicker.jsx`
- Modify: `src/index.css` (append)

**Interfaces:**
- Consumes: `useProfile()` from `src/context/ProfileContext.jsx` (unchanged).
- Produces: nothing new consumed elsewhere.

- [ ] **Step 1: Rewrite `src/pages/ProfilePicker.jsx`**

```jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../context/ProfileContext.jsx';

export default function ProfilePicker() {
  const { profiles, selectProfile, createProfile, deleteProfile } = useProfile();
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  function handleCreate(e) {
    e.preventDefault();
    try {
      createProfile(name);
      setName('');
      setError('');
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  }

  function handleSelect(profileName) {
    selectProfile(profileName);
    navigate('/');
  }

  function handleDelete(profileName) {
    deleteProfile(profileName);
  }

  return (
    <div className="profile-picker">
      <div className="profile-picker-card">
        <div className="profile-picker-emoji" aria-hidden="true">
          👋
        </div>
        <h1>Who&apos;s learning?</h1>
        <p className="muted">Pick a profile to continue, or create a new one. No password needed.</p>

        {profiles.length > 0 && (
          <div className="profile-list">
            {profiles.map((p) => (
              <div className="profile-row" key={p}>
                <button type="button" className="btn btn-block profile-btn" onClick={() => handleSelect(p)}>
                  {p}
                </button>
                <button
                  type="button"
                  className="btn btn-ghost btn-danger"
                  onClick={() => handleDelete(p)}
                  aria-label={`Delete profile ${p}`}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}

        <form className="profile-create" onSubmit={handleCreate}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="New username"
            aria-label="Username"
          />
          {error && <p className="error-text">{error}</p>}
          <button type="submit" className="btn btn-primary">
            Create profile
          </button>
        </form>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Append profile picker styles to `src/index.css`**

```css
.profile-picker {
  display: flex;
  justify-content: center;
  padding-top: 24px;
}

.profile-picker-card {
  background: var(--surface);
  border: 2px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 28px;
  max-width: 360px;
  width: 100%;
  text-align: center;
}

.profile-picker-emoji {
  font-size: 2.2rem;
  margin-bottom: 8px;
}

.profile-list {
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.profile-row {
  display: flex;
  gap: 8px;
}

.profile-row .btn-block {
  flex: 1;
}

.profile-create {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 16px;
  border-top: 2px solid var(--border);
}

.profile-create input {
  background: var(--bg-subtle);
  border: 2px solid var(--border);
  border-radius: var(--radius);
  color: var(--text);
  padding: 10px 12px;
  font-family: var(--font-body);
  font-size: 1rem;
}
```

- [ ] **Step 3: Manually verify in the browser**

Run: `npm run dev`, clear the active profile (via "Switch user" or clearing localStorage), reload.
Expected: a centered, rounded card with a wave emoji, existing profiles as chunky buttons, and a "Create profile" form below; creating a duplicate username still shows the inline error.

- [ ] **Step 4: Commit**

```bash
git add src/pages/ProfilePicker.jsx src/index.css
git commit -m "feat: restyle profile picker as a centered card"
```

---

### Task 8: Quiz — per-question flow with slide-up banner

**Files:**
- Modify: `src/components/Quiz.jsx`
- Create: `src/components/Quiz.test.jsx`
- Modify: `src/index.css` (append)

**Interfaces:**
- Consumes: `scoreQuiz(questions, answers): number` from `src/lib/quiz.js` (unchanged), `<Icon />` from `src/components/Icon.jsx` (Task 3).
- Produces: `<Quiz questions={Array<{question, choices, correctIndex}>} onFinish={(score: number) => void} />` — **breaking change** from the old `onSubmit` prop; `LessonPage.jsx` is updated to match in Task 10. `onFinish` fires exactly once, after the last question's Continue/Got it button is clicked, with the full quiz score.

- [ ] **Step 1: Write the failing tests**

```jsx
// src/components/Quiz.test.jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import Quiz from './Quiz.jsx';

const questions = [
  { question: '2 + 2?', choices: ['3', '4'], correctIndex: 1 },
  { question: 'Capital of France?', choices: ['Paris', 'Rome'], correctIndex: 0 },
];

describe('Quiz', () => {
  it('shows only the first question initially', () => {
    render(<Quiz questions={questions} onFinish={() => {}} />);
    expect(screen.getByText('2 + 2?')).toBeInTheDocument();
    expect(screen.queryByText('Capital of France?')).not.toBeInTheDocument();
  });

  it('shows a correct banner and advances to the next question on Continue', async () => {
    const user = userEvent.setup();
    render(<Quiz questions={questions} onFinish={() => {}} />);

    await user.click(screen.getByRole('button', { name: '4' }));
    expect(screen.getByText('Nicely done!')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Continue' }));
    expect(screen.getByText('Capital of France?')).toBeInTheDocument();
  });

  it('shows an incorrect banner with a "Got it" button when the wrong choice is picked', async () => {
    const user = userEvent.setup();
    render(<Quiz questions={questions} onFinish={() => {}} />);

    await user.click(screen.getByRole('button', { name: '3' }));
    expect(screen.getByText('Not quite')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Got it' })).toBeInTheDocument();
  });

  it('disables re-selecting a choice once one is answered', async () => {
    const user = userEvent.setup();
    render(<Quiz questions={questions} onFinish={() => {}} />);

    await user.click(screen.getByRole('button', { name: '3' }));
    expect(screen.getByRole('button', { name: '4' })).toBeDisabled();
  });

  it('calls onFinish with the full score exactly once after the last question', async () => {
    const user = userEvent.setup();
    const onFinish = vi.fn();
    render(<Quiz questions={questions} onFinish={onFinish} />);

    await user.click(screen.getByRole('button', { name: '4' })); // correct
    await user.click(screen.getByRole('button', { name: 'Continue' }));
    await user.click(screen.getByRole('button', { name: 'Rome' })); // incorrect
    await user.click(screen.getByRole('button', { name: 'Got it' }));

    expect(onFinish).toHaveBeenCalledTimes(1);
    expect(onFinish).toHaveBeenCalledWith(1);
  });
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npx vitest run src/components/Quiz.test.jsx`
Expected: FAIL — the old `Quiz` renders all questions with a "Submit quiz" button, so `queryByText('Capital of France?')` finds it and `getByText('Nicely done!')` isn't found.

- [ ] **Step 3: Rewrite `src/components/Quiz.jsx`**

```jsx
import { useState } from 'react';
import { scoreQuiz } from '../lib/quiz.js';
import Icon from './Icon.jsx';

export default function Quiz({ questions, onFinish }) {
  const [answers, setAnswers] = useState(() => Array(questions.length).fill(null));
  const [current, setCurrent] = useState(0);

  const question = questions[current];
  const chosen = answers[current];
  const answered = chosen !== null;
  const isCorrect = answered && chosen === question.correctIndex;
  const isLast = current === questions.length - 1;

  function selectAnswer(choiceIndex) {
    if (answered) return;
    setAnswers((prev) => {
      const next = [...prev];
      next[current] = choiceIndex;
      return next;
    });
  }

  function handleContinue() {
    if (isLast) {
      onFinish(scoreQuiz(questions, answers));
    } else {
      setCurrent((c) => c + 1);
    }
  }

  return (
    <div className="quiz">
      <p className="label">
        Question {current + 1} of {questions.length}
      </p>
      <p className="quiz-question-text">{question.question}</p>
      <div className="quiz-choices">
        {question.choices.map((choice, cIndex) => {
          const isChoiceCorrect = cIndex === question.correctIndex;
          const isChosen = chosen === cIndex;
          let stateClass = '';
          if (answered && isChosen && isChoiceCorrect) stateClass = 'correct';
          else if (answered && isChosen && !isChoiceCorrect) stateClass = 'incorrect';
          else if (answered && isChoiceCorrect) stateClass = 'correct-answer';
          return (
            <button
              key={cIndex}
              type="button"
              className={`quiz-choice ${stateClass}`}
              onClick={() => selectAnswer(cIndex)}
              disabled={answered}
            >
              <span>{choice}</span>
              {answered && (isChosen || isChoiceCorrect) && (
                <Icon name={isChoiceCorrect ? 'check' : 'x'} size={16} />
              )}
            </button>
          );
        })}
      </div>

      {answered && (
        <div className={`quiz-banner ${isCorrect ? 'correct' : 'incorrect'}`}>
          <div className="quiz-banner-message">
            <span className="quiz-banner-icon">
              <Icon name={isCorrect ? 'check' : 'x'} size={16} />
            </span>
            {isCorrect ? 'Nicely done!' : 'Not quite'}
          </div>
          <button type="button" className="btn btn-primary" onClick={handleContinue}>
            {isCorrect ? 'Continue' : 'Got it'}
          </button>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npx vitest run src/components/Quiz.test.jsx`
Expected: PASS — 5 tests passing.

- [ ] **Step 5: Append quiz styles to `src/index.css`**

```css
.quiz {
  position: relative;
}

.quiz-question-text {
  font-weight: 700;
  font-size: 1.05rem;
  margin-bottom: 12px;
}

.quiz-choices {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.quiz-choice {
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: left;
  background: var(--surface);
  border: 2px solid var(--border);
  border-bottom: 4px solid var(--border-strong);
  border-radius: var(--radius);
  padding: 12px 16px;
  color: var(--text);
  font-family: var(--font-body);
  font-weight: 600;
  cursor: pointer;
}

.quiz-choice:disabled {
  cursor: default;
}

.quiz-choice.correct {
  border-color: var(--success);
  border-bottom-color: var(--success-dark);
  background: var(--success-tint);
  color: var(--success-dark);
}

.quiz-choice.incorrect {
  border-color: var(--danger);
  border-bottom-color: var(--danger-dark);
  background: var(--danger-tint);
  color: var(--danger-dark);
}

.quiz-choice.correct-answer {
  border-color: var(--success);
  background: var(--success-tint);
  color: var(--success-dark);
  opacity: 0.75;
}

.quiz-banner {
  margin-top: 16px;
  border-radius: var(--radius);
  padding: 16px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 800;
}

.quiz-banner.correct {
  background: var(--success-tint);
  border: 2px solid var(--success);
  color: var(--success-dark);
}

.quiz-banner.incorrect {
  background: var(--danger-tint);
  border: 2px solid var(--danger);
  color: var(--danger-dark);
}

.quiz-banner-message {
  display: flex;
  align-items: center;
  gap: 10px;
}

.quiz-banner-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.quiz-banner.correct .quiz-banner-icon {
  background: var(--success);
}

.quiz-banner.incorrect .quiz-banner-icon {
  background: var(--danger);
}

/* The banner's Continue/Got it button always matches the banner's verdict
   color (green/red), overriding the course-accent-colored .btn-primary
   default — a right answer in the CSS course should not show a blue button. */
.quiz-banner.correct .btn-primary {
  background: var(--success);
  border-color: var(--success);
  border-bottom-color: var(--success-dark);
}

.quiz-banner.incorrect .btn-primary {
  background: var(--danger);
  border-color: var(--danger);
  border-bottom-color: var(--danger-dark);
}
```

- [ ] **Step 6: Run the full test suite**

Run: `npm run test`
Expected: PASS — all tests, including the 5 new `Quiz.test.jsx` tests. `LessonPage.jsx` still passes `onSubmit` at this point, which `Quiz` now ignores — this is expected and fixed in Task 10; no runtime error occurs since `onFinish` simply won't be called until Task 10 wires it up, but the lesson page will still render fine since `onSubmit` is just an unused prop from `Quiz`'s perspective.

- [ ] **Step 7: Commit**

```bash
git add src/components/Quiz.jsx src/components/Quiz.test.jsx src/index.css
git commit -m "feat: rework quiz into a per-question flow with slide-up feedback banner"
```

---

### Task 9: Terminal-styled output panel (`TerminalOutput.jsx`)

**Files:**
- Create: `src/components/TerminalOutput.jsx`
- Create: `src/components/TerminalOutput.test.jsx`
- Modify: `src/index.css` (append)

**Interfaces:**
- Produces: `<TerminalOutput username={string|null|undefined} command={string} output={{ loading?: boolean, logs?: string[], error?: string, timedOut?: boolean } | null} />` — consumed by `LessonPage.jsx` in Task 10.
- Consumes: nothing (pure presentational component; `output` matches the exact shape already produced by `useJsWorker`/`usePyWorker` in `src/hooks/useCodeWorker.js`, unchanged).

- [ ] **Step 1: Write the failing tests**

```jsx
// src/components/TerminalOutput.test.jsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import TerminalOutput from './TerminalOutput.jsx';

describe('TerminalOutput', () => {
  it('shows the idle prompt with the given username and command before any run', () => {
    render(<TerminalOutput username="sofia" command="python3 exercise.py" output={null} />);
    expect(screen.getByText('sofia@fedora')).toBeInTheDocument();
    expect(screen.getByText('python3 exercise.py')).toBeInTheDocument();
  });

  it('falls back to "guest" when no username is given', () => {
    render(<TerminalOutput username={null} command="node exercise.js" output={null} />);
    expect(screen.getByText('guest@fedora')).toBeInTheDocument();
  });

  it('renders log lines from a successful run', () => {
    render(
      <TerminalOutput
        username="sofia"
        command="python3 exercise.py"
        output={{ logs: ['Hello, World!'], error: null }}
      />
    );
    expect(screen.getByText('Hello, World!')).toBeInTheDocument();
  });

  it('renders an error line', () => {
    render(
      <TerminalOutput
        username="sofia"
        command="python3 exercise.py"
        output={{ logs: [], error: "NameError: name 'nam' is not defined" }}
      />
    );
    expect(screen.getByText("NameError: name 'nam' is not defined")).toBeInTheDocument();
  });

  it('renders the timeout message', () => {
    render(
      <TerminalOutput username="sofia" command="node exercise.js" output={{ timedOut: true }} />
    );
    expect(screen.getByText(/Timed out/)).toBeInTheDocument();
  });

  it('does not show the idle cursor line while loading', () => {
    const { container } = render(
      <TerminalOutput username="sofia" command="python3 exercise.py" output={{ loading: true }} />
    );
    expect(container.querySelectorAll('.terminal-cursor')).toHaveLength(0);
  });
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npx vitest run src/components/TerminalOutput.test.jsx`
Expected: FAIL — `Failed to resolve import "./TerminalOutput.jsx"`.

- [ ] **Step 3: Implement `src/components/TerminalOutput.jsx`**

```jsx
export default function TerminalOutput({ username, command, output }) {
  const user = username || 'guest';

  return (
    <div className="terminal">
      <div className="terminal-titlebar">
        <span className="terminal-dot dot-red" />
        <span className="terminal-dot dot-yellow" />
        <span className="terminal-dot dot-green" />
        <span className="terminal-titlebar-label">{user}@codecraft: ~/exercise</span>
      </div>
      <div className="terminal-body">
        <div className="terminal-line">
          <span className="terminal-prompt">{user}@fedora</span>{' '}
          <span className="terminal-path">~</span>
          <span className="terminal-dollar">$ </span>
          <span className="terminal-command">{command}</span>
        </div>

        {output?.loading && <div className="terminal-line terminal-muted">running…</div>}

        {output && !output.loading && output.timedOut && (
          <div className="terminal-line terminal-error">
            Timed out — your code may contain an infinite loop.
          </div>
        )}

        {output && !output.loading && !output.timedOut && (
          <>
            {(output.logs || []).map((line, i) => (
              <div className="terminal-line" key={i}>
                {line}
              </div>
            ))}
            {output.error && <div className="terminal-line terminal-error">{output.error}</div>}
          </>
        )}

        {!output?.loading && (
          <div className="terminal-line">
            <span className="terminal-prompt">{user}@fedora</span>{' '}
            <span className="terminal-path">~</span>
            <span className="terminal-dollar">$ </span>
            <span className="terminal-cursor" />
          </div>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npx vitest run src/components/TerminalOutput.test.jsx`
Expected: PASS — 6 tests passing.

- [ ] **Step 5: Append terminal styles to `src/index.css`**

```css
.terminal {
  border-radius: var(--radius);
  overflow: hidden;
  border: 2px solid #2a2a2a;
  box-shadow: 0 6px 0 #111;
}

.terminal-titlebar {
  background: #3a3a3a;
  padding: 9px 14px;
  display: flex;
  align-items: center;
  gap: 7px;
}

.terminal-dot {
  width: 11px;
  height: 11px;
  border-radius: 50%;
}

.dot-red {
  background: #ff5f56;
}

.dot-yellow {
  background: #ffbd2e;
}

.dot-green {
  background: #27c93f;
}

.terminal-titlebar-label {
  color: #999;
  font-size: 0.72rem;
  font-family: var(--font-mono);
  margin-left: 8px;
}

.terminal-body {
  background: #0c0c0c;
  padding: 14px;
  font-family: var(--font-mono);
  font-size: 0.85rem;
  line-height: 1.7;
  min-height: 60px;
}

.terminal-line {
  color: #f0f0f0;
  white-space: pre-wrap;
}

.terminal-prompt {
  color: #27c93f;
  font-weight: 700;
}

.terminal-path {
  color: #5cc6f8;
  font-weight: 700;
}

.terminal-dollar {
  color: #eee;
}

.terminal-command,
.terminal-muted {
  color: #aaa;
}

.terminal-error {
  color: #ff6b6b;
}

.terminal-cursor {
  display: inline-block;
  width: 7px;
  height: 14px;
  background: #d0d0d0;
  vertical-align: middle;
}
```

- [ ] **Step 6: Commit**

```bash
git add src/components/TerminalOutput.jsx src/components/TerminalOutput.test.jsx src/index.css
git commit -m "feat: add terminal-styled output panel for Core JS/Python exercises"
```

---

### Task 10: Wire `LessonPage.jsx` — quiz completion flow, terminal output, panel layout

**Files:**
- Modify: `src/pages/LessonPage.jsx`
- Modify: `src/index.css` (append)

**Interfaces:**
- Consumes: `<Quiz questions={} onFinish={} />` (Task 8's new prop), `<TerminalOutput username={} command={} output={} />` (Task 9), `useProfile()` from `src/context/ProfileContext.jsx` (unchanged, for `activeProfile`).
- Produces: nothing new consumed elsewhere — this is the integration point.

- [ ] **Step 1: Rewrite `src/pages/LessonPage.jsx`**

```jsx
import { useEffect, useMemo, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { getCourse, getLesson } from '../content/courses.js';
import { useProgress } from '../context/ProgressContext.jsx';
import { useProfile } from '../context/ProfileContext.jsx';
import { useJsWorker, usePyWorker } from '../hooks/useCodeWorker.js';
import CodeEditor from '../components/CodeEditor.jsx';
import LivePreviewFrame from '../components/LivePreviewFrame.jsx';
import TerminalOutput from '../components/TerminalOutput.jsx';
import Quiz from '../components/Quiz.jsx';

const PREVIEW_COURSES = new Set(['html', 'css', 'webjs']);
const EDITOR_LANGUAGE = { html: 'html', css: 'css', webjs: 'javascript', corejs: 'javascript', python: 'python' };
const WORKER_COMMAND = { corejs: 'node exercise.js', python: 'python3 exercise.py' };

export default function LessonPage() {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const course = getCourse(courseId);
  const lesson = getLesson(courseId, lessonId);
  const { progress, saveExerciseCode, saveQuizScore, markLessonComplete } = useProgress();
  const { activeProfile } = useProfile();

  const savedCode = progress.courses[courseId]?.lessons[lessonId]?.savedCode;
  const [code, setCode] = useState(savedCode || lesson?.exercise.starterCode || '');
  const [output, setOutput] = useState(null);

  const jsWorker = useJsWorker();
  const pyWorker = usePyWorker();
  const worker = courseId === 'python' ? pyWorker : jsWorker;

  useEffect(() => {
    setCode(savedCode || lesson?.exercise.starterCode || '');
    setOutput(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lessonId]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (lesson) saveExerciseCode(courseId, lessonId, code);
    }, 500);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  const isPreviewCourse = PREVIEW_COURSES.has(courseId);

  const lessonIndex = useMemo(() => course?.lessons.findIndex((l) => l.id === lessonId), [course, lessonId]);
  const nextLesson = course && lessonIndex >= 0 ? course.lessons[lessonIndex + 1] : null;

  if (!course || !lesson) {
    return <p>Lesson not found.</p>;
  }

  async function handleRun() {
    setOutput({ loading: true });
    const result = await worker.run(code);
    setOutput(result);
  }

  function handleQuizFinish(score) {
    saveQuizScore(courseId, lessonId, score);
    markLessonComplete(courseId, lessonId);
    if (nextLesson) {
      navigate(`/course/${courseId}/lesson/${nextLesson.id}`);
    } else {
      navigate(`/course/${courseId}`);
    }
  }

  return (
    <div className="lesson-page">
      <Link to={`/course/${courseId}`} className="back-link">
        ← {course.title} lessons
      </Link>
      <h1>{lesson.title}</h1>

      <div className="lesson-explanation">
        <ReactMarkdown>{lesson.explanation}</ReactMarkdown>
      </div>

      <section>
        <p className="label">Example</p>
        <pre className="code-block">
          <code>{lesson.example.code}</code>
        </pre>
      </section>

      <section>
        <p className="label">Your turn</p>
        <p className="muted">{lesson.exercise.instructions}</p>
        <div className="exercise-panels">
          <CodeEditor language={EDITOR_LANGUAGE[courseId]} value={code} onChange={setCode} />

          {isPreviewCourse ? (
            <LivePreviewFrame
              html={courseId === 'html' ? code : lesson.exercise.previewHtml}
              css={courseId === 'css' ? code : ''}
              js={courseId === 'webjs' ? code : ''}
            />
          ) : (
            <div className="worker-panel">
              <button type="button" className="btn btn-primary" onClick={handleRun} disabled={output?.loading}>
                {output?.loading ? 'Running…' : 'Run'}
              </button>
              {courseId === 'python' && output?.loading && (
                <p className="muted">First run downloads the Python runtime, this can take a few seconds…</p>
              )}
              <TerminalOutput username={activeProfile} command={WORKER_COMMAND[courseId]} output={output} />
            </div>
          )}
        </div>
      </section>

      <section>
        <p className="label">Quick check</p>
        <Quiz key={lessonId} questions={lesson.quiz} onFinish={handleQuizFinish} />
      </section>
    </div>
  );
}
```

Note: the original file also defined an unused `WORKER_LANGUAGE` constant — it was already dead code before this task (not read anywhere in the codebase) and is dropped here since this task already fully rewrites the file.

- [ ] **Step 2: Append lesson-page/exercise-panel styles to `src/index.css`**

```css
.lesson-explanation {
  margin: 16px 0;
}

.lesson-explanation :is(h1, h2, h3) {
  margin-top: 24px;
}

.code-block {
  background: #1e1e1e;
  color: #d4d4d4;
  border-radius: var(--radius);
  padding: 16px 18px;
  overflow-x: auto;
  font-family: var(--font-mono);
  font-size: 0.85rem;
  white-space: pre-wrap;
  border: none;
}

section {
  margin: 32px 0;
}

.exercise-panels {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  margin-top: 12px;
}

.exercise-panels > * {
  flex: 1;
  min-width: 280px;
}

.worker-panel {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
```

- [ ] **Step 3: Run the full test suite**

Run: `npm run test`
Expected: PASS — all existing tests still pass (`LessonPage.jsx` itself has no dedicated test file, matching the project's existing manual-verification approach for pages that mount workers/Pyodide).

- [ ] **Step 4: Manually verify all 5 execution types in the browser**

Run: `npm run dev`.
Expected, for each course:
- **HTML/CSS/Web JS**: editor and live preview render side by side, editing updates the preview.
- **Core JS**: clicking Run shows the terminal with `<profile>@fedora ~$ node exercise.js`, then the logged output; introducing a syntax/runtime error shows it in red inline.
- **Python**: same as Core JS but with `python3 exercise.py`; first run shows the "downloads the Python runtime" note while loading.
- **Quiz**: answering each question shows the correct/incorrect banner; the last question's Continue/Got it navigates to the next lesson (or back to the course page on the last lesson) and marks the lesson complete — confirm the course page path now shows it as completed and unlocks the next node.

- [ ] **Step 5: Commit**

```bash
git add src/pages/LessonPage.jsx src/index.css
git commit -m "feat: wire terminal output and per-question quiz completion into lesson page"
```

---

### Task 11: Editor/preview panel chrome

**Files:**
- Modify: `src/components/CodeEditor.jsx`
- Modify: `src/components/LivePreviewFrame.jsx`
- Modify: `src/index.css` (append)

**Interfaces:**
- Consumes: nothing new.
- Produces: no prop/signature changes — both components keep their existing props (`language`, `value`, `onChange`, `height` / `html`, `css`, `js`, `height`), so `LessonPage.jsx` (Task 10) needs no further changes.

- [ ] **Step 1: Wrap `CodeEditor` with a labeled panel**

```jsx
import CodeMirror from '@uiw/react-codemirror';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';

const LANGUAGE_EXTENSIONS = {
  html: [html()],
  css: [css()],
  javascript: [javascript()],
  python: [python()],
};

export default function CodeEditor({ language, value, onChange, height = '260px' }) {
  const extensions = LANGUAGE_EXTENSIONS[language] || [];
  return (
    <div className="code-editor">
      <div className="code-editor-label">Editor</div>
      <CodeMirror value={value} height={height} theme="dark" extensions={extensions} onChange={(val) => onChange(val)} />
    </div>
  );
}
```

- [ ] **Step 2: Wrap `LivePreviewFrame` with a labeled panel**

```jsx
export default function LivePreviewFrame({ html = '', css = '', js = '', height = '260px' }) {
  const srcDoc = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <style>
      body { font-family: system-ui, sans-serif; margin: 12px; color: #111; }
      ${css}
    </style>
  </head>
  <body>
    ${html}
    <script>
      window.onerror = function (msg) {
        document.body.insertAdjacentHTML(
          'beforeend',
          '<pre style="color:#b91c1c;white-space:pre-wrap;">' + msg + '</pre>'
        );
      };
      ${js}
    </script>
  </body>
</html>`;

  return (
    <div className="live-preview">
      <div className="live-preview-label">Live preview</div>
      <iframe
        title="preview"
        srcDoc={srcDoc}
        sandbox="allow-scripts"
        className="live-preview-frame"
        style={{ height }}
      />
    </div>
  );
}
```

- [ ] **Step 3: Append panel-chrome styles to `src/index.css`**

```css
.code-editor,
.live-preview {
  border: 2px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
}

.code-editor-label,
.live-preview-label {
  background: #2a2a2a;
  color: #999;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 8px 12px;
}

.live-preview-frame {
  width: 100%;
  border: none;
  display: block;
  background: #fff;
}
```

- [ ] **Step 4: Manually verify in the browser**

Run: `npm run dev`, open an HTML/CSS/Web JS lesson exercise and a Core JS/Python one.
Expected: both the editor and the live preview/terminal panel have a matching rounded-corner, labeled-header chrome; nothing about the editing/execution behavior changed.

- [ ] **Step 5: Commit**

```bash
git add src/components/CodeEditor.jsx src/components/LivePreviewFrame.jsx src/index.css
git commit -m "feat: add matching labeled panel chrome to editor and live preview"
```

---

### Task 12: Full manual verification pass

**Files:** none (verification only).

- [ ] **Step 1: Run the full automated suite one final time**

Run: `npm run test`
Expected: PASS — all tests across `theme.test.js`, `Icon.test.jsx`, `lessonStatus.test.js`, `LessonPath.test.jsx`, `Quiz.test.jsx`, `TerminalOutput.test.jsx`.

- [ ] **Step 2: Build the production bundle**

Run: `npm run build`
Expected: build succeeds with no errors; `dist/` is produced.

- [ ] **Step 3: Preview the production build**

Run: `npm run preview`
Expected: opens the built app; spot-check that fonts and styles load correctly from the built assets (not just dev server), confirming the self-hosted font bundling worked and there's no CDN dependency.

- [ ] **Step 4: Walk the full spec verification checklist in the dev/preview browser**

Confirm each item from the design spec's testing section:
- Both themes: system-preference detection on first load (test by toggling OS theme or `prefers-color-scheme` in devtools), manual toggle flips and persists per profile across reload, every restyled surface reads correctly in both themes.
- All 5 course accent colors render correctly on landing cards, path nodes, and primary buttons for that course.
- Course page: first lesson unlocked, next lesson locked until previous completed, completing a lesson unlocks the next, locked nodes aren't clickable, tab order follows lesson order.
- Quiz: per-question banners for both correct and incorrect answers, correct-answer reveal on a wrong pick, finishing the last question completes the lesson and navigates correctly; `quizScore`/`quizAttempts` persist correctly across reload.
- Terminal panel: run one Core JS and one Python exercise, confirm the prompt shows the active profile's username, both a normal output and a triggered error render correctly.
- HTML/CSS/Web JS: live iframe preview still updates on edit with the new panel chrome.
- Landing page progress bars and course-page node states update after completing lessons; "Reset progress" clears state correctly.

- [ ] **Step 5: Fix any issues found, following the same TDD/commit pattern as earlier tasks, then re-run Steps 1-4**

No commit for this task unless fixes were needed (in which case commit those fixes individually, following the same message style as prior tasks).
