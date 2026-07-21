import { Link } from 'react-router-dom';
import { useProfile } from '../context/ProfileContext.jsx';

export default function Header() {
  const { activeProfile, switchUser } = useProfile();

  return (
    <header className="app-header">
      <Link to="/" className="app-logo">
        CodeCraft
      </Link>
      {activeProfile && (
        <div className="app-header-right">
          <span className="app-user">{activeProfile}</span>
          <button type="button" className="btn btn-ghost" onClick={switchUser}>
            Switch user
          </button>
        </div>
      )}
    </header>
  );
}
