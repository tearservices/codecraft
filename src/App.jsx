import { Navigate, Route, Routes } from 'react-router-dom';
import { ProfileProvider, useProfile } from './context/ProfileContext.jsx';
import { ProgressProvider } from './context/ProgressContext.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import Header from './components/Header.jsx';
import ProfilePicker from './pages/ProfilePicker.jsx';
import Landing from './pages/Landing.jsx';
import CoursePage from './pages/CoursePage.jsx';
import LessonPage from './pages/LessonPage.jsx';

function RequireProfile({ children }) {
  const { activeProfile } = useProfile();
  if (!activeProfile) return <Navigate to="/profile" replace />;
  return children;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/profile" element={<ProfilePicker />} />
      <Route
        path="/"
        element={
          <RequireProfile>
            <ProgressProvider>
              <Landing />
            </ProgressProvider>
          </RequireProfile>
        }
      />
      <Route
        path="/course/:courseId"
        element={
          <RequireProfile>
            <ProgressProvider>
              <CoursePage />
            </ProgressProvider>
          </RequireProfile>
        }
      />
      <Route
        path="/course/:courseId/lesson/:lessonId"
        element={
          <RequireProfile>
            <ProgressProvider>
              <LessonPage />
            </ProgressProvider>
          </RequireProfile>
        }
      />
    </Routes>
  );
}

export default function App() {
  return (
    <ProfileProvider>
      <ThemeProvider>
        <div className="app-shell">
          <Header />
          <main className="app-main">
            <AppRoutes />
          </main>
        </div>
      </ThemeProvider>
    </ProfileProvider>
  );
}
