import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import * as progressLib from '../lib/progress.js';
import { useProfile } from './ProfileContext.jsx';

const ProgressContext = createContext(null);

export function ProgressProvider({ children }) {
  const { activeProfile } = useProfile();
  const [version, setVersion] = useState(0);

  const progress = useMemo(() => {
    if (!activeProfile) return { courses: {} };
    return progressLib.getProgress(activeProfile);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeProfile, version]);

  const bump = useCallback(() => setVersion((v) => v + 1), []);

  const saveExerciseCode = useCallback(
    (courseId, lessonId, code) => {
      if (!activeProfile) return;
      progressLib.saveExerciseCode(activeProfile, courseId, lessonId, code);
      bump();
    },
    [activeProfile, bump]
  );

  const saveQuizScore = useCallback(
    (courseId, lessonId, score) => {
      if (!activeProfile) return;
      progressLib.saveQuizScore(activeProfile, courseId, lessonId, score);
      bump();
    },
    [activeProfile, bump]
  );

  const markLessonComplete = useCallback(
    (courseId, lessonId) => {
      if (!activeProfile) return;
      progressLib.markLessonComplete(activeProfile, courseId, lessonId);
      bump();
    },
    [activeProfile, bump]
  );

  const resetProgress = useCallback(() => {
    if (!activeProfile) return;
    progressLib.resetProgress(activeProfile);
    bump();
  }, [activeProfile, bump]);

  const getCourseCompletion = useCallback(
    (courseId, totalLessons) => progressLib.getCourseCompletion(progress, courseId, totalLessons),
    [progress]
  );

  return (
    <ProgressContext.Provider
      value={{
        progress,
        saveExerciseCode,
        saveQuizScore,
        markLessonComplete,
        resetProgress,
        getCourseCompletion,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress must be used within a ProgressProvider');
  return ctx;
}
