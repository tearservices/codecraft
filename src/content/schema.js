const REQUIRED_LESSON_FIELDS = ['id', 'title', 'explanation', 'example', 'exercise', 'quiz'];

export function validateLesson(lesson) {
  const errors = [];
  for (const field of REQUIRED_LESSON_FIELDS) {
    if (!(field in lesson)) errors.push(`missing field: ${field}`);
  }
  if (lesson.example && (!lesson.example.code || !lesson.example.language)) {
    errors.push('example must have code and language');
  }
  if (lesson.exercise && typeof lesson.exercise.starterCode !== 'string') {
    errors.push('exercise.starterCode must be a string');
  }
  if (lesson.quiz) {
    if (!Array.isArray(lesson.quiz) || lesson.quiz.length < 3) {
      errors.push('quiz must be an array of at least 3 questions');
    } else {
      lesson.quiz.forEach((q, i) => {
        if (!q.question) errors.push(`quiz[${i}] missing question`);
        if (!Array.isArray(q.choices) || q.choices.length < 2) {
          errors.push(`quiz[${i}] needs at least 2 choices`);
        }
        if (
          typeof q.correctIndex !== 'number' ||
          q.correctIndex < 0 ||
          q.correctIndex >= (q.choices || []).length
        ) {
          errors.push(`quiz[${i}] correctIndex out of range`);
        }
      });
    }
  }
  return errors;
}

export function validateLessons(lessons) {
  const ids = new Set();
  const allErrors = [];
  for (const lesson of lessons) {
    const errors = validateLesson(lesson);
    if (ids.has(lesson.id)) errors.push(`duplicate id: ${lesson.id}`);
    ids.add(lesson.id);
    if (errors.length) allErrors.push({ id: lesson.id, errors });
  }
  return allErrors;
}
