/**
 * Windows XP MSN Messenger 7.0
 * Interactive chat simulator, quick contact links, and classic Nudge (Zumbido)!
 */
class XPMessenger {
  constructor() {
    this.history = document.getElementById('msn-chat-history');
    this.input = document.getElementById('msn-chat-input');
    this.sendBtn = document.getElementById('msn-send-btn');
    this.nudgeBtn = document.getElementById('msn-nudge-btn');
    this.winEl = document.getElementById('win-msn');

    this.responses = [
      "¡Hola! Qué gusto saludarte. Estoy disponible para proyectos Full-Stack y roles de Software Engineer.",
      "Trabajo principalmente con Python (FastAPI/Flask), React/TypeScript, bases de datos (MongoDB, MySQL, PostgreSQL) y AWS.",
      "Si deseas una respuesta rápida, ¡contáctame al WhatsApp directo (+56 9 49254442) o envíame un email a amaruriosfigueroa@gmail.com!",
      "¿Te gustaría revisar el código de mis proyectos en GitHub? Visita https://github.com/Am4rv",
      "También tengo experiencia en estándares de seguridad como ISO 27001/27701 y arquitecturas cloud escalables."
    ];
    this.respIndex = 0;

    this.init();
  }

  init() {
    if (!this.input || !this.sendBtn) return;

    this.sendBtn.addEventListener('click', () => this.sendMessage());
    this.input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') this.sendMessage();
    });

    if (this.nudgeBtn) {
      this.nudgeBtn.addEventListener('click', () => this.triggerNudge());
    }

    // Direct contact buttons
    const waBtn = document.getElementById('msn-open-wa');
    if (waBtn) {
      waBtn.addEventListener('click', () => {
        window.open('https://wa.me/56949254442?text=Hola%20Amaru,%20vi%20tu%20portafolio%20Windows%20XP!', '_blank');
      });
    }

    const mailBtn = document.getElementById('msn-open-mail');
    if (mailBtn) {
      mailBtn.addEventListener('click', () => {
        window.location.href = 'mailto:amaruriosfigueroa@gmail.com?subject=Contacto%20desde%20Portafolio%20Windows%20XP';
      });
    }
  }

  getTimeStr() {
    const d = new Date();
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  sendMessage() {
    const text = this.input.value.trim();
    if (!text) return;
    this.input.value = '';

    window.xpSound.playClick();

    // Visitor Message
    const msgDiv = document.createElement('div');
    msgDiv.className = 'msn-msg visitor';
    msgDiv.innerHTML = `
      <span class="msn-msg-sender">Tú dice:</span>
      <span class="msn-msg-time">(${this.getTimeStr()})</span>
      <div class="msn-msg-body">${this.escapeHTML(text)}</div>
    `;
    this.history.appendChild(msgDiv);
    this.history.scrollTop = this.history.scrollHeight;

    // Simulate Amaru typing and replying
    setTimeout(() => {
      window.xpSound.playNotify();
      const replyDiv = document.createElement('div');
      replyDiv.className = 'msn-msg amaru';
      const replyText = this.responses[this.respIndex % this.responses.length];
      this.respIndex++;

      replyDiv.innerHTML = `
        <span class="msn-msg-sender">Amaru Ríos dice:</span>
        <span class="msn-msg-time">(${this.getTimeStr()})</span>
        <div class="msn-msg-body">${replyText}</div>
      `;
      this.history.appendChild(replyDiv);
      this.history.scrollTop = this.history.scrollHeight;
    }, 900);
  }

  triggerNudge() {
    window.xpSound.playNotify();
    if (!this.winEl) return;

    // Shake animation
    this.winEl.style.transition = 'none';
    const shakes = [-10, 10, -8, 8, -5, 5, -2, 2, 0];
    shakes.forEach((dx, idx) => {
      setTimeout(() => {
        this.winEl.style.transform = `translateX(${dx}px)`;
        if (idx === shakes.length - 1) {
          this.winEl.style.transform = 'none';
          this.winEl.style.transition = '';
        }
      }, idx * 40);
    });

    const nudgeNotice = document.createElement('div');
    nudgeNotice.className = 'msn-msg';
    nudgeNotice.style.color = '#888';
    nudgeNotice.style.fontStyle = 'italic';
    nudgeNotice.textContent = `¡Has enviado un zumbido! (${this.getTimeStr()})`;
    this.history.appendChild(nudgeNotice);
    this.history.scrollTop = this.history.scrollHeight;
  }

  escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.xpMessenger = new XPMessenger();
});
