import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getSystemTheme, getStoredTheme, setStoredTheme } from './theme.js';

function mockMatchMedia(matches) {
  window.matchMedia = vi.fn().mockImplementation((query) => ({
    matches,
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  }));
}

beforeEach(() => {
  localStorage.clear();
});

describe('getSystemTheme', () => {
  it('returns dark when the OS prefers dark', () => {
    mockMatchMedia(true);
    expect(getSystemTheme()).toBe('dark');
  });

  it('returns light when the OS does not prefer dark', () => {
    mockMatchMedia(false);
    expect(getSystemTheme()).toBe('light');
  });
});

describe('getStoredTheme / setStoredTheme', () => {
  it('returns null when nothing is stored for the profile', () => {
    expect(getStoredTheme('sofia')).toBeNull();
  });

  it('returns null when no profile name is given', () => {
    expect(getStoredTheme(null)).toBeNull();
  });

  it('stores and retrieves a theme for a profile', () => {
    setStoredTheme('sofia', 'dark');
    expect(getStoredTheme('sofia')).toBe('dark');
  });

  it('keeps themes separate per profile', () => {
    setStoredTheme('sofia', 'dark');
    setStoredTheme('alex', 'light');
    expect(getStoredTheme('sofia')).toBe('dark');
    expect(getStoredTheme('alex')).toBe('light');
  });

  it('ignores a corrupted stored value', () => {
    localStorage.setItem('webu:theme:sofia', 'not-a-theme');
    expect(getStoredTheme('sofia')).toBeNull();
  });
});
