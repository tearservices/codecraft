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
];

export function getCourse(courseId) {
  return COURSES.find((c) => c.id === courseId);
}

export function getLesson(courseId, lessonId) {
  const course = getCourse(courseId);
  if (!course) return null;
  return course.lessons.find((l) => l.id === lessonId) || null;
}
