import { useCallback, useEffect, useRef, useState } from 'react';
import { buildRunRequest } from '../workers/protocol.js';

function makeId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export function useCodeWorker(workerFactory, { timeoutMs = 8000 } = {}) {
  const workerRef = useRef(null);
  const [status, setStatus] = useState('idle'); // idle | running | ready

  const getWorker = useCallback(() => {
    if (!workerRef.current) {
      workerRef.current = workerFactory();
    }
    return workerRef.current;
  }, [workerFactory]);

  useEffect(() => {
    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
        workerRef.current = null;
      }
    };
  }, []);

  const run = useCallback(
    (code) => {
      return new Promise((resolve) => {
        const worker = getWorker();
        const id = makeId();
        setStatus('running');

        const timer = setTimeout(() => {
          worker.terminate();
          workerRef.current = null;
          setStatus('idle');
          resolve({ logs: [], error: null, timedOut: true });
        }, timeoutMs);

        const handleMessage = (event) => {
          if (!event.data || event.data.id !== id) return;
          clearTimeout(timer);
          worker.removeEventListener('message', handleMessage);
          setStatus('ready');
          resolve({ logs: event.data.logs || [], error: event.data.error || null, timedOut: false });
        };

        worker.addEventListener('message', handleMessage);
        worker.postMessage(buildRunRequest(id, code));
      });
    },
    [getWorker, timeoutMs]
  );

  return { run, status };
}

export function useJsWorker() {
  const factory = useCallback(
    () => new Worker(new URL('../workers/jsRunner.worker.js', import.meta.url), { type: 'module' }),
    []
  );
  return useCodeWorker(factory, { timeoutMs: 3000 });
}

export function usePyWorker() {
  const factory = useCallback(
    () => new Worker(new URL('../workers/pyRunner.worker.js', import.meta.url), { type: 'module' }),
    []
  );
  return useCodeWorker(factory, { timeoutMs: 20000 });
}
