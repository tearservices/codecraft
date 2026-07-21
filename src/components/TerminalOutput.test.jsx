// src/components/TerminalOutput.test.jsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import TerminalOutput from './TerminalOutput.jsx';

describe('TerminalOutput', () => {
  it('shows the idle prompt with the given username and command before any run', () => {
    render(<TerminalOutput username="sofia" command="python3 exercise.py" output={null} />);
    expect(screen.getAllByText('sofia@fedora')).toHaveLength(2);
    expect(screen.getByText('python3 exercise.py')).toBeInTheDocument();
  });

  it('falls back to "guest" when no username is given', () => {
    render(<TerminalOutput username={null} command="node exercise.js" output={null} />);
    expect(screen.getAllByText('guest@fedora')).toHaveLength(2);
  });

  it('renders log lines from a successful run', () => {
    render(
      <TerminalOutput
        username="sofia"
        command="python3 exercise.py"
        output={{ logs: ['Hello, World!'], error: null }}
      />
    );
    expect(screen.getByText('Hello, World!')).toBeInTheDocument();
  });

  it('renders an error line', () => {
    render(
      <TerminalOutput
        username="sofia"
        command="python3 exercise.py"
        output={{ logs: [], error: "NameError: name 'nam' is not defined" }}
      />
    );
    expect(screen.getByText("NameError: name 'nam' is not defined")).toBeInTheDocument();
  });

  it('renders the timeout message', () => {
    render(
      <TerminalOutput username="sofia" command="node exercise.js" output={{ timedOut: true }} />
    );
    expect(screen.getByText(/Timed out/)).toBeInTheDocument();
  });

  it('does not show the idle cursor line while loading', () => {
    const { container } = render(
      <TerminalOutput username="sofia" command="python3 exercise.py" output={{ loading: true }} />
    );
    expect(container.querySelectorAll('.terminal-cursor')).toHaveLength(0);
  });

  it('shows the idle cursor line before any run (output={null})', () => {
    const { container } = render(
      <TerminalOutput username="sofia" command="python3 exercise.py" output={null} />
    );
    expect(container.querySelectorAll('.terminal-cursor')).toHaveLength(1);
  });
});
