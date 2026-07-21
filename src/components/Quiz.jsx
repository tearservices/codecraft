import { useState } from 'react';
import { scoreQuiz } from '../lib/quiz.js';
import Icon from './Icon.jsx';

export default function Quiz({ questions, onFinish }) {
  const [answers, setAnswers] = useState(() => Array(questions?.length || 0).fill(null));
  const [current, setCurrent] = useState(0);
  const [finished, setFinished] = useState(false);

  if (!questions || questions.length === 0) {
    return null;
  }

  const question = questions[current];
  const chosen = answers[current];
  const answered = chosen !== null;
  const isCorrect = answered && chosen === question.correctIndex;
  const isLast = current === questions.length - 1;

  function selectAnswer(choiceIndex) {
    if (answered) return;
    setAnswers((prev) => {
      const next = [...prev];
      next[current] = choiceIndex;
      return next;
    });
  }

  function handleContinue() {
    if (finished) return;
    if (isLast) {
      setFinished(true);
      onFinish(scoreQuiz(questions, answers));
    } else {
      setCurrent((c) => c + 1);
    }
  }

  return (
    <div className="quiz">
      <p className="label">
        Question {current + 1} of {questions.length}
      </p>
      <p className="quiz-question-text">{question.question}</p>
      <div className="quiz-choices">
        {question.choices.map((choice, cIndex) => {
          const isChoiceCorrect = cIndex === question.correctIndex;
          const isChosen = chosen === cIndex;
          let stateClass = '';
          if (answered && isChosen && isChoiceCorrect) stateClass = 'correct';
          else if (answered && isChosen && !isChoiceCorrect) stateClass = 'incorrect';
          else if (answered && isChoiceCorrect) stateClass = 'correct-answer';
          return (
            <button
              key={cIndex}
              type="button"
              className={`quiz-choice ${stateClass}`}
              onClick={() => selectAnswer(cIndex)}
              disabled={answered}
            >
              <span>{choice}</span>
              {answered && (isChosen || isChoiceCorrect) && (
                <Icon name={isChoiceCorrect ? 'check' : 'x'} size={16} />
              )}
            </button>
          );
        })}
      </div>

      {answered && (
        <div className={`quiz-banner ${isCorrect ? 'correct' : 'incorrect'}`}>
          <div className="quiz-banner-message">
            <span className="quiz-banner-icon">
              <Icon name={isCorrect ? 'check' : 'x'} size={16} />
            </span>
            {isCorrect ? 'Nicely done!' : 'Not quite'}
          </div>
          <button type="button" className="btn btn-primary" onClick={handleContinue}>
            {isCorrect ? 'Continue' : 'Got it'}
          </button>
        </div>
      )}
    </div>
  );
}
