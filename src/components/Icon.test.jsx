import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Icon from './Icon.jsx';

describe('Icon', () => {
  it('renders a check icon with a polyline', () => {
    const { container } = render(<Icon name="check" />);
    expect(container.querySelector('svg')).toBeTruthy();
    expect(container.querySelector('polyline')).toBeTruthy();
  });

  it('renders an x icon with two lines', () => {
    const { container } = render(<Icon name="x" />);
    expect(container.querySelectorAll('line')).toHaveLength(2);
  });

  it('renders a lock icon with a rect and a path', () => {
    const { container } = render(<Icon name="lock" />);
    expect(container.querySelector('rect')).toBeTruthy();
    expect(container.querySelector('path')).toBeTruthy();
  });

  it('applies the requested size', () => {
    const { container } = render(<Icon name="check" size={32} />);
    expect(container.querySelector('svg').getAttribute('width')).toBe('32');
  });
});
