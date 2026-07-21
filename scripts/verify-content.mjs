import { JSDOM } from 'jsdom';
import { loadPyodide } from 'pyodide';
import { validateLessons } from '../src/content/schema.js';

function checkBalancedBraces(cssText) {
  let depth = 0;
  for (const ch of cssText) {
    if (ch === '{') depth += 1;
    if (ch === '}') depth -= 1;
    if (depth < 0) return false;
  }
  return depth === 0;
}

const COURSES = ['html', 'css', 'webjs', 'corejs', 'python'];

let failures = 0;

function fail(courseId, lessonId, message) {
  failures += 1;
  console.error(`[FAIL] ${courseId}/${lessonId}: ${message}`);
}

function checkPreviewHtml(courseId, lesson) {
  if ((courseId === 'css' || courseId === 'webjs') && !lesson.exercise.previewHtml) {
    fail(courseId, lesson.id, 'missing exercise.previewHtml');
  }
  if (courseId === 'webjs' && lesson.exercise.previewHtml && !/id=["']app["']/.test(lesson.exercise.previewHtml)) {
    fail(courseId, lesson.id, 'previewHtml missing id="app" container');
  }
}

async function main() {
  const pyodide = await loadPyodide();

  for (const courseId of COURSES) {
    const mod = await import(`../src/content/${courseId}/lessons.js`);
    const key = Object.keys(mod)[0];
    const lessons = mod[key];

    console.log(`\n== ${courseId}: ${lessons.length} lessons ==`);

    const schemaErrors = validateLessons(lessons);
    for (const { id, errors } of schemaErrors) {
      for (const e of errors) fail(courseId, id, `schema: ${e}`);
    }

    for (const lesson of lessons) {
      checkPreviewHtml(courseId, lesson);

      try {
        if (courseId === 'html') {
          const dom = new JSDOM(lesson.example.code);
          if (!dom.window.document.body || dom.window.document.body.children.length === 0) {
            fail(courseId, lesson.id, 'example HTML produced an empty body');
          }
        } else if (courseId === 'css') {
          if (!checkBalancedBraces(lesson.example.code)) throw new Error('unbalanced braces');
          if (lesson.exercise.previewHtml) new JSDOM(lesson.exercise.previewHtml);
        } else if (courseId === 'webjs') {
          const dom = new JSDOM(lesson.exercise.previewHtml || '<div id="app"></div>', {
            runScripts: 'outside-only',
            url: 'http://localhost/',
          });
          const fn = new dom.window.Function('document', 'window', 'console', lesson.example.code);
          fn(dom.window.document, dom.window, console);
        } else if (courseId === 'corejs') {
          const fn = new Function('console', lesson.example.code);
          fn({ log() {}, error() {}, warn() {} });
        } else if (courseId === 'python') {
          await pyodide.runPythonAsync(lesson.example.code);
        }
      } catch (err) {
        fail(courseId, lesson.id, `example execution threw: ${err.message}`);
      }
    }
  }

  console.log(failures === 0 ? '\nAll lessons verified OK.' : `\n${failures} failure(s).`);
  process.exit(failures === 0 ? 0 : 1);
}

main();
