import { Link, useParams } from 'react-router-dom';
import { getCourse } from '../content/courses.js';
import { useProgress } from '../context/ProgressContext.jsx';
import LessonPath from '../components/LessonPath.jsx';

export default function CoursePage() {
  const { courseId } = useParams();
  const course = getCourse(courseId);
  const { progress } = useProgress();

  if (!course) {
    return <p>Course not found.</p>;
  }

  const courseProgress = progress.courses[courseId] || { lessons: {} };

  return (
    <div className="course-page" style={{ '--accent': course.accent }}>
      <Link to="/" className="back-link">
        ← All courses
      </Link>
      <h1>{course.title}</h1>
      <p className="muted">{course.description}</p>

      <LessonPath courseId={courseId} lessons={course.lessons} courseProgress={courseProgress} />
    </div>
  );
}
