import { Link } from 'react-router-dom';
import { COURSES } from '../content/courses.js';
import { useProgress } from '../context/ProgressContext.jsx';

export default function Landing() {
  const { getCourseCompletion, resetProgress } = useProgress();

  return (
    <div className="landing">
      <h1>Pick a course</h1>
      <div className="course-grid">
        {COURSES.map((course) => {
          const { completed, total } = getCourseCompletion(course.id, course.lessons.length);
          const pct = total ? Math.round((completed / total) * 100) : 0;
          return (
            <Link
              to={`/course/${course.id}`}
              className="course-card"
              key={course.id}
              style={{ '--accent': course.accent }}
            >
              <h2>{course.title}</h2>
              <p className="progress-label">
                {completed} / {total} lessons
              </p>
              <div className="progress-bar">
                <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
              </div>
              <span className="btn btn-primary course-card-cta">
                {completed > 0 ? 'Continue' : 'Start'}
              </span>
            </Link>
          );
        })}
      </div>

      <button type="button" className="btn btn-ghost btn-danger reset-progress" onClick={resetProgress}>
        Reset my progress
      </button>
    </div>
  );
}
