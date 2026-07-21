import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import LessonPath from './LessonPath.jsx';

const lessons = [
  { id: 'a', title: 'Intro', quiz: [{}] },
  { id: 'b', title: 'Basics', quiz: [{}] },
  { id: 'c', title: 'Advanced', quiz: [{}] },
];

function renderPath(courseProgress) {
  return render(
    <MemoryRouter>
      <LessonPath courseId="html" lessons={lessons} courseProgress={courseProgress} />
    </MemoryRouter>
  );
}

describe('LessonPath', () => {
  it('renders a real link for the completed lesson, labeled with its status', () => {
    renderPath({ lessons: { a: { completed: true } } });
    const link = screen.getByRole('link', { name: 'Intro, completed' });
    expect(link).toHaveAttribute('href', '/course/html/lesson/a');
  });

  it('renders a real link for the current lesson, labeled with its status', () => {
    renderPath({ lessons: { a: { completed: true } } });
    const link = screen.getByRole('link', { name: 'Basics, current lesson' });
    expect(link).toHaveAttribute('href', '/course/html/lesson/b');
  });

  it('renders a locked lesson as a non-link, aria-disabled element', () => {
    renderPath({ lessons: { a: { completed: true } } });
    const locked = screen.getByLabelText('Advanced, locked');
    expect(locked.tagName).not.toBe('A');
    expect(locked).toHaveAttribute('aria-disabled', 'true');
  });

  it('renders lesson titles in DOM order regardless of the alternating visual position', () => {
    renderPath({ lessons: {} });
    const items = screen.getAllByRole('listitem');
    expect(items.map((li) => li.textContent)).toEqual(
      expect.arrayContaining([expect.stringContaining('Intro')])
    );
    expect(items[0].textContent).toContain('Intro');
    expect(items[1].textContent).toContain('Basics');
    expect(items[2].textContent).toContain('Advanced');
  });
});
