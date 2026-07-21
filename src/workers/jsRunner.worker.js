self.onmessage = (event) => {
  const { type, id, code } = event.data;
  if (type !== 'run') return;

  const logs = [];
  const fakeConsole = {
    log: (...args) => logs.push(args.map(stringify).join(' ')),
    error: (...args) => logs.push('ERROR: ' + args.map(stringify).join(' ')),
    warn: (...args) => logs.push('WARN: ' + args.map(stringify).join(' ')),
  };

  try {
    const fn = new Function('console', code);
    fn(fakeConsole);
    self.postMessage({ type: 'result', id, logs, error: null });
  } catch (err) {
    self.postMessage({ type: 'result', id, logs, error: err.message });
  }
};

function stringify(value) {
  if (typeof value === 'string') return value;
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}
