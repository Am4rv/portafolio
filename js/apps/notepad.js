/**
 * Windows XP Notepad (Bloc de notas)
 * Text editor containing Amaru's CV with copy, print and word wrap features.
 */
document.addEventListener('DOMContentLoaded', () => {
  const textarea = document.getElementById('notepad-text');
  const lineColDisplay = document.getElementById('notepad-line-col');
  const copyBtn = document.getElementById('np-copy-btn');
  const printBtn = document.getElementById('np-print-btn');
  const wrapBtn = document.getElementById('np-wrap-btn');

  if (textarea && lineColDisplay) {
    const updateCursor = () => {
      const pos = textarea.selectionStart;
      const val = textarea.value.substr(0, pos);
      const lines = val.split('\n');
      const line = lines.length;
      const col = lines[lines.length - 1].length + 1;
      lineColDisplay.textContent = `Lín ${line}, Col ${col}`;
    };

    textarea.addEventListener('keyup', updateCursor);
    textarea.addEventListener('click', updateCursor);
  }

  if (copyBtn && textarea) {
    copyBtn.addEventListener('click', () => {
      window.xpSound.playClick();
      navigator.clipboard.writeText(textarea.value).then(() => {
        alert('¡Curriculum copiado al portapapeles exitosamente!');
      });
    });
  }

  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.xpSound.playClick();
      window.print();
    });
  }

  if (wrapBtn && textarea) {
    let wrap = true;
    wrapBtn.addEventListener('click', () => {
      window.xpSound.playClick();
      wrap = !wrap;
      textarea.style.whiteSpace = wrap ? 'pre-wrap' : 'pre';
      wrapBtn.textContent = wrap ? 'Ajuste de línea: Sí' : 'Ajuste de línea: No';
    });
  }
});
