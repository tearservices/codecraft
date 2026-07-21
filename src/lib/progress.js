function storageKey(profileName) {
  return `webu:progress:${profileName}`;
}

function emptyProgress() {
  return { courses: {} };
}

export function getProgress(profileName) {
  const raw = localStorage.getItem(storageKey(profileName));
  if (!raw) return emptyProgress();
  try {
    const parsed = JSON.parse(raw);
    return parsed && parsed.courses ? parsed : emptyProgress();
  } catch {
    return emptyProgress();
  }
}

function saveProgress(profileName, progress) {
  localStorage.setItem(storageKey(profileName), JSON.stringify(progress));
  return progress;
}

function getLessonEntry(progress, courseId, lessonId) {
  const course = progress.courses[courseId] || { lessons: {} };
  const lesson = course.lessons[lessonId] || {
    completed: false,
    quizScore: null,
    quizAttempts: 0,
    savedCode: '',
  };
  return { course, lesson };
}

function withLesson(progress, courseId, lessonId, lessonPatch) {
  const { course, lesson } = getLessonEntry(progress, courseId, lessonId);
  const updatedLesson = { ...lesson, ...lessonPatch };
  const updatedCourse = { ...course, lessons: { ...course.lessons, [lessonId]: updatedLesson } };
  return { ...progress, courses: { ...progress.courses, [courseId]: updatedCourse } };
}

export function saveExerciseCode(profileName, courseId, lessonId, code) {
  const progress = getProgress(profileName);
  const updated = withLesson(progress, courseId, lessonId, { savedCode: code });
  return saveProgress(profileName, updated);
}

export function saveQuizScore(profileName, courseId, lessonId, score) {
  const progress = getProgress(profileName);
  const { lesson } = getLessonEntry(progress, courseId, lessonId);
  const updated = withLesson(progress, courseId, lessonId, {
    quizScore: score,
    quizAttempts: lesson.quizAttempts + 1,
  });
  return saveProgress(profileName, updated);
}

export function markLessonComplete(profileName, courseId, lessonId) {
  const progress = getProgress(profileName);
  const updated = withLesson(progress, courseId, lessonId, { completed: true });
  return saveProgress(profileName, updated);
}

export function resetProgress(profileName) {
  localStorage.removeItem(storageKey(profileName));
}

export function getCourseCompletion(progress, courseId, totalLessons) {
  const course = progress.courses[courseId];
  if (!course) return { completed: 0, total: totalLessons };
  const completed = Object.values(course.lessons).filter((l) => l.completed).length;
  return { completed, total: totalLessons };
}
