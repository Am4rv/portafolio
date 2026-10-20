/**
 * Windows XP Desktop Management
 * Handles desktop icons, selection marquee, start menu, clock and right-click context menu.
 */
document.addEventListener('DOMContentLoaded', () => {
  // Desktop Icons Configuration
  const desktopIcons = [
    { id: 'win-about', title: 'Mi PC', icon: 'my-computer', desc: 'Información y specs de Amaru' },
    { id: 'win-projects', title: 'Mis Documentos', icon: 'my-documents', desc: 'Experiencia y proyectos' },
    { id: 'win-skills', title: 'Habilidades.exe', icon: 'skills', desc: 'Stack tecnológico y herramientas' },
    { id: 'win-notepad', title: 'Curriculum.txt', icon: 'notepad', desc: 'CV en texto / Descargar' },
    { id: 'win-msn', title: 'MSN Messenger', icon: 'msn', desc: 'Contacto directo / Chat' },
    { id: 'win-cmd', title: 'Símbolo del sistema', icon: 'cmd', desc: 'Terminal interactiva' },
    { id: 'win-wmp', title: 'Windows Media Player', icon: 'media-player', desc: 'Música retro & visualizer' },
    { id: 'win-paint', title: 'Paint.exe', icon: 'paint', desc: 'Editor de dibujo clásico' },
    { id: 'win-minesweeper', title: 'Buscaminas', icon: 'minesweeper', desc: 'Juego retro clásico' },
    { id: 'win-recycle', title: 'Papelera de reciclaje', icon: 'recycle-bin', desc: 'Archivos eliminados' }
  ];

  const iconsContainer = document.getElementById('desktop-icons');

  desktopIcons.forEach(item => {
    const el = document.createElement('div');
    el.className = 'desktop-icon';
    el.dataset.targetWindow = item.id;
    el.innerHTML = `
      <div class="icon-img">${window.XPIcons.get(item.icon, 36)}</div>
      <div class="icon-label">${item.title}</div>
    `;

    // Click selection
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      document.querySelectorAll('.desktop-icon').forEach(i => i.classList.remove('selected'));
      el.classList.add('selected');
    });

    // Double-click (or touch tap on mobile) to launch
    let lastTap = 0;
    el.addEventListener('touchend', (e) => {
      const now = Date.now();
      if (now - lastTap < 350) {
        window.windowManager.openWindow(item.id);
      }
      lastTap = now;
    });

    el.addEventListener('dblclick', () => {
      window.windowManager.openWindow(item.id);
    });

    iconsContainer.appendChild(el);
  });

  // Deselect icons when clicking desktop
  document.getElementById('xp-desktop').addEventListener('click', (e) => {
    if (!e.target.closest('.desktop-icon') && !e.target.closest('.xp-context-menu')) {
      document.querySelectorAll('.desktop-icon').forEach(i => i.classList.remove('selected'));
      closeContextMenu();
    }
  });

  // Rubber-Band Selection Box (Marquee selection)
  const desktop = document.getElementById('xp-desktop');
  const selBox = document.getElementById('selection-box');
  let isSelecting = false;
  let startX = 0, startY = 0;

  desktop.addEventListener('pointerdown', (e) => {
    if (e.target !== desktop && !e.target.classList.contains('wallpaper-bliss') && !e.target.classList.contains('desktop-icons-container')) return;
    if (e.button !== 0) return; // Only left click

    isSelecting = true;
    startX = e.clientX;
    startY = e.clientY;
    selBox.style.left = `${startX}px`;
    selBox.style.top = `${startY}px`;
    selBox.style.width = '0px';
    selBox.style.height = '0px';
    selBox.style.display = 'block';
  });

  document.addEventListener('pointermove', (e) => {
    if (!isSelecting) return;
    const currentX = e.clientX;
    const currentY = e.clientY;

    const left = Math.min(startX, currentX);
    const top = Math.min(startY, currentY);
    const width = Math.abs(currentX - startX);
    const height = Math.abs(currentY - startY);

    selBox.style.left = `${left}px`;
    selBox.style.top = `${top}px`;
    selBox.style.width = `${width}px`;
    selBox.style.height = `${height}px`;

    // Highlight overlapping icons
    const boxRect = { left, top, right: left + width, bottom: top + height };
    document.querySelectorAll('.desktop-icon').forEach(icon => {
      const iRect = icon.getBoundingClientRect();
      const overlap = !(boxRect.right < iRect.left || 
                        boxRect.left > iRect.right || 
                        boxRect.bottom < iRect.top || 
                        boxRect.top > iRect.bottom);
      if (overlap) {
        icon.classList.add('selected');
      }
    });
  });

  document.addEventListener('pointerup', () => {
    if (isSelecting) {
      isSelecting = false;
      selBox.style.display = 'none';
    }
  });

  // Desktop Right-Click Context Menu
  const contextMenu = document.getElementById('desktop-context-menu');
  desktop.addEventListener('contextmenu', (e) => {
    if (e.target.closest('.xp-window') || e.target.closest('#xp-taskbar') || e.target.closest('#start-menu')) return;
    e.preventDefault();

    window.xpSound.playClick();
    contextMenu.style.left = `${Math.min(e.clientX, window.innerWidth - 170)}px`;
    contextMenu.style.top = `${Math.min(e.clientY, window.innerHeight - 150)}px`;
    contextMenu.style.display = 'block';
  });

  const closeContextMenu = () => {
    contextMenu.style.display = 'none';
  };
  document.addEventListener('click', closeContextMenu);

  // Context Menu Actions
  document.getElementById('ctx-refresh').addEventListener('click', () => {
    window.xpSound.playClick();
    document.body.style.opacity = '0.9';
    setTimeout(() => { document.body.style.opacity = '1'; }, 100);
  });

  document.getElementById('ctx-props').addEventListener('click', () => {
    window.windowManager.openWindow('win-display');
  });

  document.getElementById('ctx-cv').addEventListener('click', () => {
    window.windowManager.openWindow('win-notepad');
  });

  // Start Menu Logic
  const startBtn = document.getElementById('start-button');
  const startMenu = document.getElementById('start-menu');

  const toggleStartMenu = () => {
    window.xpSound.playClick();
    startMenu.classList.toggle('open');
    startBtn.classList.toggle('active');
  };

  startBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleStartMenu();
  });

  document.addEventListener('click', (e) => {
    if (!startMenu.contains(e.target) && !startBtn.contains(e.target)) {
      startMenu.classList.remove('open');
      startBtn.classList.remove('active');
    }
  });

  // Windows Key shortcut to toggle start menu
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Meta' || e.key === 'Escape') {
      if (startMenu.classList.contains('open')) {
        startMenu.classList.remove('open');
        startBtn.classList.remove('active');
      }
    }
  });

  // Clock Update
  const clockEl = document.getElementById('tray-clock');
  const updateClock = () => {
    const d = new Date();
    let hours = d.getHours();
    const mins = d.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    clockEl.textContent = `${hours}:${mins} ${ampm}`;
    clockEl.title = d.toLocaleDateString('es-CL', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };
  updateClock();
  setInterval(updateClock, 10000);

  // Sound Mute Toggle in Tray
  const soundBtn = document.getElementById('tray-sound-btn');
  soundBtn.addEventListener('click', () => {
    const isMuted = window.xpSound.toggleMute();
    soundBtn.innerHTML = window.XPIcons.get(isMuted ? 'sound-mute' : 'sound', 16);
    if (!isMuted) window.xpSound.playClick();
  });

  // Start Menu Items Click Handler
  document.querySelectorAll('[data-launch]').forEach(item => {
    item.addEventListener('click', () => {
      const winId = item.dataset.launch;
      window.windowManager.openWindow(winId);
      startMenu.classList.remove('open');
      startBtn.classList.remove('active');
    });
  });

  // Balloon Tip
  const balloon = document.getElementById('xp-balloon');
  const balloonClose = document.getElementById('balloon-close');
  if (balloon && balloonClose) {
    balloonClose.addEventListener('click', () => {
      balloon.style.display = 'none';
    });
    // Show after 1.5 seconds
    setTimeout(() => {
      balloon.style.display = 'block';
      window.xpSound.playNotify();
    }, 1800);
  }

  // Shutdown Dialog Controls
  const shutdownOverlay = document.getElementById('shutdown-overlay');
  const powerOffScreen = document.getElementById('powered-off-screen');

  document.querySelectorAll('.open-shutdown').forEach(btn => {
    btn.addEventListener('click', () => {
      window.xpSound.playClick();
      startMenu.classList.remove('open');
      startBtn.classList.remove('active');
      shutdownOverlay.style.display = 'flex';
    });
  });

  document.getElementById('btn-cancel-shutdown').addEventListener('click', () => {
    window.xpSound.playClick();
    shutdownOverlay.style.display = 'none';
  });

  document.getElementById('btn-action-poweroff').addEventListener('click', () => {
    window.xpSound.playShutdown();
    shutdownOverlay.style.display = 'none';
    setTimeout(() => {
      powerOffScreen.style.display = 'flex';
    }, 800);
  });

  document.getElementById('btn-action-restart').addEventListener('click', () => {
    window.xpSound.playShutdown();
    shutdownOverlay.style.display = 'none';
    setTimeout(() => {
      location.reload();
    }, 1200);
  });

  document.getElementById('btn-action-standby').addEventListener('click', () => {
    window.xpSound.playClick();
    shutdownOverlay.style.display = 'none';
    document.body.style.filter = 'brightness(20%)';
    const wakeUp = () => {
      document.body.style.filter = 'none';
      window.xpSound.playStartup();
      document.removeEventListener('click', wakeUp);
    };
    setTimeout(() => {
      document.addEventListener('click', wakeUp);
    }, 300);
  });

  document.getElementById('btn-turn-on').addEventListener('click', () => {
    powerOffScreen.style.display = 'none';
    window.xpSound.playStartup();
  });
});
