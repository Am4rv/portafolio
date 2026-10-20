/**
 * Windows XP Control Panel & Display Properties
 * Manages themes (Bliss, Royale, Dark, Matrix), CRT scanlines, and Matrix canvas animation.
 */
class XPControlPanel {
  constructor() {
    this.themeSelect = document.getElementById('theme-select');
    this.crtToggle = document.getElementById('crt-toggle');
    this.soundToggle = document.getElementById('sound-fx-toggle');
    this.matrixCanvas = document.getElementById('matrix-canvas');
    this.matrixInterval = null;

    this.init();
  }

  init() {
    if (this.themeSelect) {
      this.themeSelect.addEventListener('change', (e) => {
        window.xpSound.playClick();
        this.setTheme(e.target.value);
      });
    }

    if (this.crtToggle) {
      this.crtToggle.addEventListener('change', (e) => {
        window.xpSound.playClick();
        if (e.target.checked) {
          document.body.classList.add('crt-enabled');
        } else {
          document.body.classList.remove('crt-enabled');
        }
      });
    }

    if (this.soundToggle) {
      this.soundToggle.addEventListener('change', (e) => {
        const isMuted = !e.target.checked;
        window.xpSound.muted = isMuted;
        const soundBtn = document.getElementById('tray-sound-btn');
        if (soundBtn) {
          soundBtn.innerHTML = window.XPIcons.get(isMuted ? 'sound-mute' : 'sound', 16);
        }
      });
    }

    // Apply button
    const applyBtn = document.getElementById('display-apply-btn');
    if (applyBtn) {
      applyBtn.addEventListener('click', () => {
        window.xpSound.playClick();
        window.windowManager.closeWindow('win-display');
      });
    }

    this.setupMatrixCanvas();
  }

  setTheme(themeName) {
    if (themeName === 'bliss') {
      document.body.dataset.theme = '';
      this.stopMatrix();
    } else if (themeName === 'matrix') {
      document.body.dataset.theme = 'matrix';
      this.startMatrix();
    } else {
      document.body.dataset.theme = themeName;
      this.stopMatrix();
    }
  }

  setupMatrixCanvas() {
    if (!this.matrixCanvas) return;
    const ctx = this.matrixCanvas.getContext('2d');

    const resize = () => {
      this.matrixCanvas.width = window.innerWidth;
      this.matrixCanvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();
  }

  startMatrix() {
    if (!this.matrixCanvas) return;
    const ctx = this.matrixCanvas.getContext('2d');
    const cols = Math.floor(this.matrixCanvas.width / 16);
    const drops = Array(cols).fill(1);
    const chars = '01AMARURIOSFIGUEROAFULLSTACKPYTHONFASTAPIREACT';

    clearInterval(this.matrixInterval);
    this.matrixInterval = setInterval(() => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, this.matrixCanvas.width, this.matrixCanvas.height);

      ctx.fillStyle = '#00FF66';
      ctx.font = '14px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * 16, drops[i] * 16);

        if (drops[i] * 16 > this.matrixCanvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }, 45);
  }

  stopMatrix() {
    clearInterval(this.matrixInterval);
    if (this.matrixCanvas) {
      const ctx = this.matrixCanvas.getContext('2d');
      ctx.clearRect(0, 0, this.matrixCanvas.width, this.matrixCanvas.height);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.xpControlPanel = new XPControlPanel();
});
