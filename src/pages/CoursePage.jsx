import { Link, useParams } from 'react-router-dom';
import { getCourse } from '../content/courses.js';
import { useProgress } from '../context/ProgressContext.jsx';

export default function CoursePage() {
  const { courseId } = useParams();
  const course = getCourse(courseId);
  const { progress } = useProgress();

  if (!course) {
    return <p>Course not found.</p>;
  }

  const courseProgress = progress.courses[courseId] || { lessons: {} };

  return (
    <div className="course-page">
      <Link to="/" className="back-link">
        ← All courses
      </Link>
      <h1>{course.title}</h1>
      <p className="muted">{course.description}</p>

      <ol className="lesson-list">
        {course.lessons.map((lesson, index) => {
          const lessonProgress = courseProgress.lessons[lesson.id];
          return (
            <li key={lesson.id}>
              <Link to={`/course/${courseId}/lesson/${lesson.id}`} className="lesson-list-item">
                <span className="lesson-index">{index + 1}</span>
                <span className="lesson-title">{lesson.title}</span>
                {lessonProgress?.completed && <span className="lesson-check">✓</span>}
                {lessonProgress?.quizScore != null && (
                  <span className="lesson-score">
                    Quiz: {lessonProgress.quizScore}/{lesson.quiz.length}
                  </span>
                )}
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
