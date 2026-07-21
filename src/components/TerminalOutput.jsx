export default function TerminalOutput({ username, command, output }) {
  const user = username || 'guest';

  return (
    <div className="terminal">
      <div className="terminal-titlebar">
        <span className="terminal-dot dot-red" />
        <span className="terminal-dot dot-yellow" />
        <span className="terminal-dot dot-green" />
        <span className="terminal-titlebar-label">{user}@codecraft: ~/exercise</span>
      </div>
      <div className="terminal-body">
        <div className="terminal-line">
          <span className="terminal-prompt">{user}@fedora</span>{' '}
          <span className="terminal-path">~</span>
          <span className="terminal-dollar">$ </span>
          <span className="terminal-command">{command}</span>
        </div>

        {output?.loading && <div className="terminal-line terminal-muted">running…</div>}

        {output && !output.loading && output.timedOut && (
          <div className="terminal-line terminal-error">
            Timed out — your code may contain an infinite loop.
          </div>
        )}

        {output && !output.loading && !output.timedOut && (
          <>
            {(output.logs || []).map((line, i) => (
              <div className="terminal-line" key={i}>
                {line}
              </div>
            ))}
            {output.error && <div className="terminal-line terminal-error">{output.error}</div>}
          </>
        )}

        {output && !output.loading && (
          <div className="terminal-line">
            <span className="terminal-prompt">{user}@fedora</span>{' '}
            <span className="terminal-path">~</span>
            <span className="terminal-dollar">$ </span>
            <span className="terminal-cursor" />
          </div>
        )}
      </div>
    </div>
  );
}
