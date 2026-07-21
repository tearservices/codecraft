import { htmlLessons } from './html/lessons.js';
import { cssLessons } from './css/lessons.js';
import { webjsLessons } from './webjs/lessons.js';
import { corejsLessons } from './corejs/lessons.js';
import { pythonLessons } from './python/lessons.js';

export const COURSES = [
  {
    id: 'html',
    title: 'HTML',
    description: 'Structure the web with semantic markup.',
    accent: '#e34c26',
    lessons: htmlLessons,
  },
  {
    id: 'css',
    title: 'CSS',
    description: 'Style and lay out pages, from the box model to Grid.',
    accent: '#264de4',
    lessons: cssLessons,
  },
  {
    id: 'webjs',
    title: 'Web JavaScript',
    description: 'The DOM, events, and browser APIs.',
    accent: '#f0db4f',
    lessons: webjsLessons,
  },
  {
    id: 'corejs',
    title: 'Core JavaScript',
    description: 'The language itself — no browser required.',
    accent: '#8b5cf6',
    lessons: corejsLessons,
  },
  {
    id: 'python',
    title: 'Python',
    description: 'A general-purpose language, from syntax to OOP.',
    accent: '#3776ab',
    lessons: pythonLessons,
  },
];

export function getCourse(courseId) {
  return COURSES.find((c) => c.id === courseId);
}

export function getLesson(courseId, lessonId) {
  const course = getCourse(courseId);
  if (!course) return null;
  return course.lessons.find((l) => l.id === lessonId) || null;
}
