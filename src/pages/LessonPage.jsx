import { useEffect, useMemo, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { getCourse, getLesson } from '../content/courses.js';
import { useProgress } from '../context/ProgressContext.jsx';
import { useJsWorker, usePyWorker } from '../hooks/useCodeWorker.js';
import CodeEditor from '../components/CodeEditor.jsx';
import LivePreviewFrame from '../components/LivePreviewFrame.jsx';
import Quiz from '../components/Quiz.jsx';

const PREVIEW_COURSES = new Set(['html', 'css', 'webjs']);
const WORKER_LANGUAGE = { corejs: 'javascript', python: 'python' };
const EDITOR_LANGUAGE = { html: 'html', css: 'css', webjs: 'javascript', corejs: 'javascript', python: 'python' };

export default function LessonPage() {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const course = getCourse(courseId);
  const lesson = getLesson(courseId, lessonId);
  const { progress, saveExerciseCode, saveQuizScore, markLessonComplete } = useProgress();

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

  function handleQuizSubmit(score) {
    saveQuizScore(courseId, lessonId, score);
  }

  function handleComplete() {
    markLessonComplete(courseId, lessonId);
    if (nextLesson) {
      navigate(`/course/${courseId}/lesson/${nextLesson.id}`);
    } else {
      navigate(`/course/${courseId}`);
    }
  }

  return (
    <div className="lesson-page">
      <Link to={`/course/${courseId}`} className="back-link">
        ← {course.title} lessons
      </Link>
      <h1>{lesson.title}</h1>

      <div className="lesson-explanation">
        <ReactMarkdown>{lesson.explanation}</ReactMarkdown>
      </div>

      <section>
        <h2>Example</h2>
        <pre className="code-block">
          <code>{lesson.example.code}</code>
        </pre>
      </section>

      <section>
        <h2>Try it</h2>
        <p className="muted">{lesson.exercise.instructions}</p>
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
            {output && !output.loading && (
              <pre className={`code-output ${output.error ? 'has-error' : ''}`}>
                {output.timedOut
                  ? 'Timed out — your code may contain an infinite loop.'
                  : [...(output.logs || []), output.error ? `ERROR: ${output.error}` : null]
                      .filter(Boolean)
                      .join('\n') || '(no output)'}
              </pre>
            )}
          </div>
        )}
      </section>

      <section>
        <h2>Quiz</h2>
        <Quiz key={lessonId} questions={lesson.quiz} onSubmit={handleQuizSubmit} />
      </section>

      <button type="button" className="btn btn-primary btn-complete" onClick={handleComplete}>
        Mark complete{nextLesson ? ' & next lesson' : ''}
      </button>
    </div>
  );
}
