import { useEffect, useMemo, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { getCourse, getLesson } from '../content/courses.js';
import { useProgress } from '../context/ProgressContext.jsx';
import { useProfile } from '../context/ProfileContext.jsx';
import { useJsWorker, usePyWorker } from '../hooks/useCodeWorker.js';
import CodeEditor from '../components/CodeEditor.jsx';
import LivePreviewFrame from '../components/LivePreviewFrame.jsx';
import TerminalOutput from '../components/TerminalOutput.jsx';
import Quiz from '../components/Quiz.jsx';

const PREVIEW_COURSES = new Set(['html', 'css', 'webjs']);
const EDITOR_LANGUAGE = { html: 'html', css: 'css', webjs: 'javascript', corejs: 'javascript', python: 'python' };
const WORKER_COMMAND = { corejs: 'node exercise.js', python: 'python3 exercise.py' };

export default function LessonPage() {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const course = getCourse(courseId);
  const lesson = getLesson(courseId, lessonId);
  const { progress, saveExerciseCode, saveQuizScore, markLessonComplete } = useProgress();
  const { activeProfile } = useProfile();

  const savedCode = progress.courses[courseId]?.lessons[lessonId]?.savedCode;
  const [code, setCode] = useState(savedCode || lesson?.exercise.starterCode || '');
  const [output, setOutput] = useState(null);

  const jsWorker = useJsWorker();
  const pyWorker = usePyWorker();
  const worker = courseId === 'python' ? pyWorker : jsWorker;

  useEffect(() => {
    setCode(savedCode || lesson?.exercise.starterCode || '');
    setOutput(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lessonId]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (lesson) saveExerciseCode(courseId, lessonId, code);
    }, 500);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  const isPreviewCourse = PREVIEW_COURSES.has(courseId);

  const lessonIndex = useMemo(() => course?.lessons.findIndex((l) => l.id === lessonId), [course, lessonId]);
  const nextLesson = course && lessonIndex >= 0 ? course.lessons[lessonIndex + 1] : null;

  if (!course || !lesson) {
    return <p>Lesson not found.</p>;
  }

  async function handleRun() {
    setOutput({ loading: true });
    const result = await worker.run(code);
    setOutput(result);
  }

  function handleQuizFinish(score) {
    saveQuizScore(courseId, lessonId, score);
    markLessonComplete(courseId, lessonId);
    if (nextLesson) {
      navigate(`/course/${courseId}/lesson/${nextLesson.id}`);
    } else {
      navigate(`/course/${courseId}`);
    }
  }

  return (
    <div className="lesson-page" style={{ '--accent': course.accent }}>
      <Link to={`/course/${courseId}`} className="back-link">
        ← {course.title} lessons
      </Link>
      <div className="lesson-header">
        <span className="course-badge">{course.title}</span>
        <span className="lesson-counter">
          Lesson {lessonIndex + 1} of {course.lessons.length}
        </span>
      </div>
      <h1>{lesson.title}</h1>

      <div className="lesson-explanation">
        <ReactMarkdown>{lesson.explanation}</ReactMarkdown>
      </div>

      <section>
        <p className="label">Example</p>
        <pre className="code-block">
          <code>{lesson.example.code}</code>
        </pre>
      </section>

      <section>
        <p className="label">Your turn</p>
        <p className="muted">{lesson.exercise.instructions}</p>
        <div className="exercise-panels">
          <CodeEditor language={EDITOR_LANGUAGE[courseId]} value={code} onChange={setCode} />

          {isPreviewCourse ? (
            <LivePreviewFrame
              html={courseId === 'html' ? code : lesson.exercise.previewHtml}
              css={courseId === 'css' ? code : ''}
              js={courseId === 'webjs' ? code : ''}
            />
          ) : (
            <div className="worker-panel">
              <button type="button" className="btn btn-primary" onClick={handleRun} disabled={output?.loading}>
                {output?.loading ? 'Running…' : 'Run'}
              </button>
              {courseId === 'python' && output?.loading && (
                <p className="muted">First run downloads the Python runtime, this can take a few seconds…</p>
              )}
              <TerminalOutput username={activeProfile} command={WORKER_COMMAND[courseId]} output={output} />
            </div>
          )}
        </div>
      </section>

      <section>
        <p className="label">Quick check</p>
        <Quiz key={lessonId} questions={lesson.quiz} onFinish={handleQuizFinish} />
      </section>
    </div>
  );
}
