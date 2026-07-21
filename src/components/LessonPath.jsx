import { Link } from 'react-router-dom';
import { getLessonStatuses } from '../lib/lessonStatus.js';
import Icon from './Icon.jsx';

const POSITIONS = ['pos-center', 'pos-right', 'pos-center', 'pos-left'];

export default function LessonPath({ courseId, lessons, courseProgress }) {
  const statuses = getLessonStatuses(lessons, courseProgress);

  return (
    <ol className="lesson-path">
      {lessons.map((lesson, index) => {
        const status = statuses[index];
        const position = POSITIONS[index % POSITIONS.length];
        const lessonProgress = courseProgress.lessons[lesson.id];

        return (
          <li key={lesson.id} className={`lesson-path-item ${position} ${status}`}>
            {index > 0 && <div className="lesson-path-connector" />}
            {status === 'locked' ? (
              <span
                className="lesson-path-node"
                aria-disabled="true"
                aria-label={`${lesson.title}, locked`}
              >
                <Icon name="lock" />
              </span>
            ) : (
              <Link
                to={`/course/${courseId}/lesson/${lesson.id}`}
                className="lesson-path-node"
                aria-label={`${lesson.title}, ${status === 'completed' ? 'completed' : 'current lesson'}`}
              >
                {status === 'completed' ? (
                  <Icon name="check" />
                ) : (
                  <span className="lesson-path-index">{index + 1}</span>
                )}
              </Link>
            )}
            <span className="lesson-path-title">{lesson.title}</span>
            {lessonProgress?.quizScore != null && (
              <span className="lesson-path-score">
                Quiz: {lessonProgress.quizScore}/{lesson.quiz.length}
              </span>
            )}
          </li>
        );
      })}
    </ol>
  );
}
