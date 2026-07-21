import CodeMirror from '@uiw/react-codemirror';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';

const LANGUAGE_EXTENSIONS = {
  html: [html()],
  css: [css()],
  javascript: [javascript()],
  python: [python()],
};

export default function CodeEditor({ language, value, onChange, height = '260px' }) {
  const extensions = LANGUAGE_EXTENSIONS[language] || [];
  return (
    <div className="code-editor">
      <div className="code-editor-label">Editor</div>
      <CodeMirror value={value} height={height} theme="dark" extensions={extensions} onChange={(val) => onChange(val)} />
    </div>
  );
}
