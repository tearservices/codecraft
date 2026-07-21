export function scoreQuiz(questions, answers) {
  let score = 0;
  questions.forEach((q, i) => {
    if (answers[i] === q.correctIndex) score += 1;
  });
  return score;
}
