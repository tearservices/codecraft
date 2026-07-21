import { createContext, useCallback, useContext, useState } from 'react';
import * as profilesLib from '../lib/profiles.js';

const ProfileContext = createContext(null);

export function ProfileProvider({ children }) {
  const [activeProfile, setActiveProfileState] = useState(() => profilesLib.getActiveProfile());
  const [profiles, setProfiles] = useState(() => profilesLib.getProfiles());

  const selectProfile = useCallback((name) => {
    profilesLib.setActiveProfile(name);
    setActiveProfileState(name);
  }, []);

  const createProfile = useCallback((name) => {
    const created = profilesLib.createProfile(name);
    setProfiles(profilesLib.getProfiles());
    profilesLib.setActiveProfile(created);
    setActiveProfileState(created);
    return created;
  }, []);

  const deleteProfile = useCallback((name) => {
    profilesLib.deleteProfile(name);
    setProfiles(profilesLib.getProfiles());
    setActiveProfileState(profilesLib.getActiveProfile());
  }, []);

  const switchUser = useCallback(() => {
    profilesLib.clearActiveProfile();
    setActiveProfileState(null);
  }, []);

  return (
    <ProfileContext.Provider
      value={{ activeProfile, profiles, selectProfile, createProfile, deleteProfile, switchUser }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error('useProfile must be used within a ProfileProvider');
  return ctx;
}
