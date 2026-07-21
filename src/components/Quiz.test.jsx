import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import Quiz from './Quiz.jsx';

const questions = [
  { question: '2 + 2?', choices: ['3', '4'], correctIndex: 1 },
  { question: 'Capital of France?', choices: ['Paris', 'Rome'], correctIndex: 0 },
];

describe('Quiz', () => {
  it('shows only the first question initially', () => {
    render(<Quiz questions={questions} onFinish={() => {}} />);
    expect(screen.getByText('2 + 2?')).toBeInTheDocument();
    expect(screen.queryByText('Capital of France?')).not.toBeInTheDocument();
  });

  it('shows a correct banner and advances to the next question on Continue', async () => {
    const user = userEvent.setup();
    render(<Quiz questions={questions} onFinish={() => {}} />);

    await user.click(screen.getByRole('button', { name: '4' }));
    expect(screen.getByText('Nicely done!')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Continue' }));
    expect(screen.getByText('Capital of France?')).toBeInTheDocument();
  });

  it('shows an incorrect banner with a "Got it" button when the wrong choice is picked', async () => {
    const user = userEvent.setup();
    render(<Quiz questions={questions} onFinish={() => {}} />);

    await user.click(screen.getByRole('button', { name: '3' }));
    expect(screen.getByText('Not quite')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Got it' })).toBeInTheDocument();
  });

  it('disables re-selecting a choice once one is answered', async () => {
    const user = userEvent.setup();
    render(<Quiz questions={questions} onFinish={() => {}} />);

    await user.click(screen.getByRole('button', { name: '3' }));
    expect(screen.getByRole('button', { name: '4' })).toBeDisabled();
  });

  it('calls onFinish with the full score exactly once after the last question', async () => {
    const user = userEvent.setup();
    const onFinish = vi.fn();
    render(<Quiz questions={questions} onFinish={onFinish} />);

    await user.click(screen.getByRole('button', { name: '4' })); // correct
    await user.click(screen.getByRole('button', { name: 'Continue' }));
    await user.click(screen.getByRole('button', { name: 'Rome' })); // incorrect
    await user.click(screen.getByRole('button', { name: 'Got it' }));

    expect(onFinish).toHaveBeenCalledTimes(1);
    expect(onFinish).toHaveBeenCalledWith(1);
  });
});
