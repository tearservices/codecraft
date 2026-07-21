const PROFILES_KEY = 'webu:profiles';
const ACTIVE_PROFILE_KEY = 'webu:activeProfile';

export function getProfiles() {
  const raw = localStorage.getItem(PROFILES_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function createProfile(name) {
  const trimmed = (name || '').trim();
  if (!trimmed) throw new Error('Username cannot be empty');
  const profiles = getProfiles();
  if (profiles.some((p) => p.toLowerCase() === trimmed.toLowerCase())) {
    throw new Error('That username is already taken on this device');
  }
  const updated = [...profiles, trimmed];
  localStorage.setItem(PROFILES_KEY, JSON.stringify(updated));
  return trimmed;
}

export function deleteProfile(name) {
  const profiles = getProfiles().filter((p) => p !== name);
  localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
  localStorage.removeItem(`webu:progress:${name}`);
  if (getActiveProfile() === name) {
    clearActiveProfile();
  }
}

export function getActiveProfile() {
  return localStorage.getItem(ACTIVE_PROFILE_KEY);
}

export function setActiveProfile(name) {
  if (!getProfiles().includes(name)) {
    throw new Error(`Unknown profile: ${name}`);
  }
  localStorage.setItem(ACTIVE_PROFILE_KEY, name);
}

export function clearActiveProfile() {
  localStorage.removeItem(ACTIVE_PROFILE_KEY);
}
