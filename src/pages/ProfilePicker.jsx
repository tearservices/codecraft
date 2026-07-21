import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../context/ProfileContext.jsx';

export default function ProfilePicker() {
  const { profiles, selectProfile, createProfile, deleteProfile } = useProfile();
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  function handleCreate(e) {
    e.preventDefault();
    try {
      createProfile(name);
      setName('');
      setError('');
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  }

  function handleSelect(profileName) {
    selectProfile(profileName);
    navigate('/');
  }

  function handleDelete(profileName) {
    deleteProfile(profileName);
  }

  return (
    <div className="profile-picker">
      <h1>Welcome to CodeCraft</h1>
      <p className="muted">Pick a username to save your progress on this device. No password needed.</p>

      {profiles.length > 0 && (
        <div className="profile-list">
          <h2>Continue as</h2>
          {profiles.map((p) => (
            <div className="profile-row" key={p}>
              <button type="button" className="btn btn-block" onClick={() => handleSelect(p)}>
                {p}
              </button>
              <button
                type="button"
                className="btn btn-ghost btn-danger"
                onClick={() => handleDelete(p)}
                aria-label={`Delete profile ${p}`}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

      <form className="profile-create" onSubmit={handleCreate}>
        <h2>New profile</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Pick a username"
          aria-label="Username"
        />
        {error && <p className="error-text">{error}</p>}
        <button type="submit" className="btn btn-primary">
          Create profile
        </button>
      </form>
    </div>
  );
}
