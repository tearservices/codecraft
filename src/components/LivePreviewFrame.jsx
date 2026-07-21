export default function LivePreviewFrame({ html = '', css = '', js = '', height = '260px' }) {
  const srcDoc = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <style>
      body { font-family: system-ui, sans-serif; margin: 12px; color: #111; }
      ${css}
    </style>
  </head>
  <body>
    ${html}
    <script>
      window.onerror = function (msg) {
        document.body.insertAdjacentHTML(
          'beforeend',
          '<pre style="color:#b91c1c;white-space:pre-wrap;">' + msg + '</pre>'
        );
      };
      ${js}
    </script>
  </body>
</html>`;

  return (
    <iframe
      title="preview"
      srcDoc={srcDoc}
      sandbox="allow-scripts"
      style={{ width: '100%', height, border: '1px solid var(--border)', borderRadius: 8, background: '#fff' }}
    />
  );
}
