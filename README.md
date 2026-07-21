# CodeCraft — Learn HTML, CSS, JavaScript & Python

A local, single-page learning site with five full interactive courses:
HTML, CSS, Web JavaScript (DOM/events/browser APIs), Core JavaScript
(the language itself, no DOM), and Python. No backend — progress is
saved entirely in your browser's `localStorage`, under a username you
pick on first visit (no password).

## Running it

```bash
npm install
npm run dev
```

Then open the printed local URL (usually `http://localhost:5173`).

For a production build:

```bash
npm run build
npm run preview
```

## Notes

- HTML/CSS/Web JS exercises render live in a sandboxed preview pane.
- Core JS exercises run in a Web Worker with a timeout guard.
- Python exercises run via Pyodide (Python compiled to WebAssembly),
  fetched from a CDN the first time you open a Python exercise in a
  given browser — this requires an internet connection on first use;
  everything else works fully offline.
