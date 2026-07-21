self.importScripts('https://cdn.jsdelivr.net/pyodide/v0.26.2/full/pyodide.js');

let pyodideReadyPromise = self.loadPyodide();

self.onmessage = async (event) => {
  const { type, id, code } = event.data;
  if (type !== 'run') return;

  const logs = [];
  try {
    const pyodide = await pyodideReadyPromise;
    pyodide.setStdout({ batched: (msg) => logs.push(msg) });
    pyodide.setStderr({ batched: (msg) => logs.push('ERROR: ' + msg) });
    await pyodide.runPythonAsync(code);
    self.postMessage({ type: 'result', id, logs, error: null });
  } catch (err) {
    self.postMessage({ type: 'result', id, logs, error: err.message || String(err) });
  }
};
