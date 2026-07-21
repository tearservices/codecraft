export function buildRunRequest(id, code) {
  return { type: 'run', id, code };
}

export function isRunResult(message) {
  return Boolean(message) && message.type === 'result' && typeof message.id === 'string';
}
