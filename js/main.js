/**
 * Main System Bootstrapper
 * Registers windows, auto-opens portfolio windows on startup with authentic XP sound.
 */
document.addEventListener('DOMContentLoaded', () => {
  // Register all system windows
  const wm = window.windowManager;

  wm.registerWindow('win-about', {
    title: 'Mi PC - Propiedades del Sistema',
    icon: 'my-computer',
    defaultWidth: 560,
    defaultHeight: 460
  });

  wm.registerWindow('win-projects', {
    title: 'Mis Documentos - Experiencia y Proyectos',
    icon: 'my-documents',
    defaultWidth: 680,
    defaultHeight: 480
  });

  wm.registerWindow('win-skills', {
    title: 'Habilidades.exe - Stack Tecnológico',
    icon: 'skills',
    defaultWidth: 600,
    defaultHeight: 430
  });

  wm.registerWindow('win-notepad', {
    title: 'Curriculum.txt - Bloc de notas',
    icon: 'notepad',
    defaultWidth: 580,
    defaultHeight: 460
  });

  wm.registerWindow('win-msn', {
    title: 'MSN Messenger - Amaru Ríos',
    icon: 'msn',
    defaultWidth: 420,
    defaultHeight: 450
  });

  wm.registerWindow('win-cmd', {
    title: 'Símbolo del sistema',
    icon: 'cmd',
    defaultWidth: 560,
    defaultHeight: 360
  });

  wm.registerWindow('win-paint', {
    title: 'Paint.exe',
    icon: 'paint',
    defaultWidth: 620,
    defaultHeight: 460
  });

  wm.registerWindow('win-minesweeper', {
    title: 'Buscaminas',
    icon: 'minesweeper',
    defaultWidth: 260,
    defaultHeight: 320
  });

  wm.registerWindow('win-display', {
    title: 'Propiedades de Pantalla',
    icon: 'control-panel',
    defaultWidth: 420,
    defaultHeight: 360
  });

  wm.registerWindow('win-recycle', {
    title: 'Papelera de reciclaje',
    icon: 'recycle-bin',
    defaultWidth: 500,
    defaultHeight: 360
  });

  // Tab navigation handler for tabbed dialogs (e.g. Mi PC / Propiedades)
  document.querySelectorAll('.xp-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.closest('.xp-window-body');
      if (!parent) return;

      window.xpSound.playClick();
      parent.querySelectorAll('.xp-tab-btn').forEach(b => b.classList.remove('active'));
      parent.querySelectorAll('.xp-tab-content').forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const targetId = btn.dataset.targetTab;
      const targetEl = document.getElementById(targetId);
      if (targetEl) targetEl.classList.add('active');
    });
  });

  // Recycle bin clean button
  const cleanTrashBtn = document.getElementById('trash-empty-btn');
  if (cleanTrashBtn) {
    cleanTrashBtn.addEventListener('click', () => {
      window.xpSound.playTrash();
      const list = document.getElementById('trash-items-list');
      if (list) {
        list.innerHTML = '<div style="padding: 20px; color: #777; text-align: center;">La papelera de reciclaje está vacía. ¡Todos los bugs fueron eliminados! 🚀</div>';
      }
    });
  }

  // Windows XP Boot Sequence
  const bootScreen = document.getElementById('xp-boot-screen');
  let booted = false;

  const finishBoot = () => {
    if (booted) return;
    booted = true;

    // Play authentic startup chime
    window.xpSound.playStartup();

    if (bootScreen) {
      bootScreen.style.opacity = '0';
      setTimeout(() => {
        bootScreen.style.display = 'none';
        // Auto-open Mi PC window once desktop is ready
        wm.openWindow('win-about');
      }, 500);
    } else {
      wm.openWindow('win-about');
    }
  };

  if (bootScreen) {
    // Normal boot lasts ~2.6 seconds, giving time to appreciate the classic crawling loader
    const bootTimer = setTimeout(finishBoot, 2600);

    // Or skip immediately if the user clicks anywhere or presses a key
    bootScreen.addEventListener('click', () => {
      clearTimeout(bootTimer);
      finishBoot();
    });

    window.addEventListener('keydown', () => {
      clearTimeout(bootTimer);
      finishBoot();
    }, { once: true });
  } else {
    setTimeout(finishBoot, 300);
  }
});
