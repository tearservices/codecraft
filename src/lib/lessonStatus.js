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
