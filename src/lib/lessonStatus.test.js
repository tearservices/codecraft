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
