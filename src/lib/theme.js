function storageKey(profileName) {
  return `webu:theme:${profileName}`;
}

export function getSystemTheme() {
  if (typeof window === 'undefined' || !window.matchMedia) return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function getStoredTheme(profileName) {
  if (!profileName) return null;
  const raw = localStorage.getItem(storageKey(profileName));
  return raw === 'light' || raw === 'dark' ? raw : null;
}

export function setStoredTheme(profileName, theme) {
  if (!profileName) return;
  localStorage.setItem(storageKey(profileName), theme);
}
