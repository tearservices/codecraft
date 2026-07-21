import { useState } from 'react';
import { scoreQuiz } from '../lib/quiz.js';

export default function Quiz({ questions, onSubmit }) {
  const [answers, setAnswers] = useState(() => Array(questions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);

  const allAnswered = answers.every((a) => a !== null);

  function selectAnswer(qIndex, choiceIndex) {
    if (submitted) return;
    setAnswers((prev) => {
      const next = [...prev];
      next[qIndex] = choiceIndex;
      return next;
    });
  }

  function handleSubmit() {
    const score = scoreQuiz(questions, answers);
    setSubmitted(true);
    onSubmit(score);
  }

  function retry() {
    setAnswers(Array(questions.length).fill(null));
    setSubmitted(false);
  }

  return (
    <div className="quiz">
      {questions.map((q, qIndex) => (
        <div className="quiz-question" key={qIndex}>
          <p className="quiz-question-text">
            {qIndex + 1}. {q.question}
          </p>
          <div className="quiz-choices">
            {q.choices.map((choice, cIndex) => {
              const isSelected = answers[qIndex] === cIndex;
              const isCorrect = cIndex === q.correctIndex;
              let stateClass = '';
              if (submitted && isSelected && isCorrect) stateClass = 'correct';
              else if (submitted && isSelected && !isCorrect) stateClass = 'incorrect';
              else if (submitted && isCorrect) stateClass = 'correct-answer';
              return (
                <button
                  key={cIndex}
                  type="button"
                  className={`quiz-choice ${isSelected ? 'selected' : ''} ${stateClass}`}
                  onClick={() => selectAnswer(qIndex, cIndex)}
                  disabled={submitted}
                >
                  {choice}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {!submitted ? (
        <button type="button" className="btn btn-primary" disabled={!allAnswered} onClick={handleSubmit}>
          Submit quiz
        </button>
      ) : (
        <div className="quiz-result">
          <span>
            Score: {scoreQuiz(questions, answers)} / {questions.length}
          </span>
          <button type="button" className="btn" onClick={retry}>
            Retry
          </button>
        </div>
      )}
    </div>
  );
}
