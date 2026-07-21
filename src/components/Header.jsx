import { Link } from 'react-router-dom';
import { useProfile } from '../context/ProfileContext.jsx';
import { useTheme } from '../context/ThemeContext.jsx';

export default function Header() {
  const { activeProfile, switchUser } = useProfile();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="app-header">
      <Link to="/" className="app-logo">
        CodeCraft
      </Link>
      <div className="app-header-right">
        {activeProfile && (
          <>
            <button
              type="button"
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              aria-pressed={theme === 'dark'}
            >
              <span className="theme-toggle-thumb" />
            </button>
            <span className="app-user">{activeProfile}</span>
            <button type="button" className="btn btn-ghost" onClick={switchUser}>
              Switch user
            </button>
          </>
        )}
      </div>
    </header>
  );
}
