/**
 * Windows XP Window Manager
 * Handles window lifecycle, dragging, resizing, focus, z-index and taskbar integration.
 */
class WindowManager {
  constructor() {
    this.windows = new Map();
    this.topZIndex = 100;
    this.activeWindowId = null;
    this.taskbarContainer = document.getElementById('taskbar-windows');
  }

  registerWindow(id, options = {}) {
    const el = document.getElementById(id);
    if (!el) return null;

    const iconName = options.icon || el.dataset.icon || 'folder';
    const winData = {
      id,
      el,
      title: options.title || el.dataset.title || 'Ventana',
      icon: iconName,
      minWidth: options.minWidth || 300,
      minHeight: options.minHeight || 200,
      defaultWidth: options.defaultWidth || 540,
      defaultHeight: options.defaultHeight || 380,
      isMaximized: false,
      isMinimized: false,
      prevRect: null
    };

    // Auto-populate titlebar icon if empty
    const iconSlot = el.querySelector('.xp-titlebar-icon');
    if (iconSlot && window.XPIcons) {
      iconSlot.innerHTML = window.XPIcons.get(iconName, 16);
    }

    this.windows.set(id, winData);
    this.setupWindowEvents(winData);
    this.createTaskbarItem(winData);

    return winData;
  }

  setupWindowEvents(win) {
    const el = win.el;
    const titlebar = el.querySelector('.xp-titlebar');
    const btnMin = el.querySelector('.xp-btn-min');
    const btnMax = el.querySelector('.xp-btn-max');
    const btnClose = el.querySelector('.xp-btn-close');

    // Focus on click
    el.addEventListener('pointerdown', () => {
      this.focusWindow(win.id);
    });

    // Minimize
    if (btnMin) {
      btnMin.addEventListener('click', (e) => {
        e.stopPropagation();
        this.minimizeWindow(win.id);
      });
    }

    // Maximize / Restore
    if (btnMax) {
      btnMax.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleMaximize(win.id);
      });
      // Double click titlebar to maximize
      if (titlebar) {
        titlebar.addEventListener('dblclick', () => {
          this.toggleMaximize(win.id);
        });
      }
    }

    // Close
    if (btnClose) {
      btnClose.addEventListener('click', (e) => {
        e.stopPropagation();
        this.closeWindow(win.id);
      });
    }

    // Dragging
    if (titlebar) {
      this.setupDragging(win, titlebar);
    }

    // Resizing
    this.setupResizing(win);
  }

  setupDragging(win, handle) {
    let isDragging = false;
    let startX = 0, startY = 0;
    let initialLeft = 0, initialTop = 0;

    const onPointerDown = (e) => {
      if (win.isMaximized) return;
      if (e.target.closest('.xp-titlebar-buttons')) return;

      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;

      const rect = win.el.getBoundingClientRect();
      initialLeft = rect.left;
      initialTop = rect.top;

      this.focusWindow(win.id);
      document.addEventListener('pointermove', onPointerMove);
      document.addEventListener('pointerup', onPointerUp);
    };

    const onPointerMove = (e) => {
      if (!isDragging) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      let newLeft = initialLeft + dx;
      let newTop = initialTop + dy;

      // Keep within bounds
      const maxLeft = window.innerWidth - 60;
      const maxTop = window.innerHeight - 60;
      newLeft = Math.max(-100, Math.min(newLeft, maxLeft));
      newTop = Math.max(0, Math.min(newTop, maxTop));

      win.el.style.left = `${newLeft}px`;
      win.el.style.top = `${newTop}px`;
      win.el.style.margin = '0';
    };

    const onPointerUp = () => {
      isDragging = false;
      document.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerup', onPointerUp);
    };

    handle.addEventListener('pointerdown', onPointerDown);
  }

  setupResizing(win) {
    const resizer = document.createElement('div');
    resizer.className = 'xp-resizer';
    win.el.appendChild(resizer);

    let isResizing = false;
    let startX = 0, startY = 0;
    let startWidth = 0, startHeight = 0;

    resizer.addEventListener('pointerdown', (e) => {
      e.stopPropagation();
      if (win.isMaximized) return;

      isResizing = true;
      startX = e.clientX;
      startY = e.clientY;
      startWidth = win.el.offsetWidth;
      startHeight = win.el.offsetHeight;

      this.focusWindow(win.id);

      const onPointerMove = (ev) => {
        if (!isResizing) return;
        const newWidth = Math.max(win.minWidth, startWidth + (ev.clientX - startX));
        const newHeight = Math.max(win.minHeight, startHeight + (ev.clientY - startY));

        win.el.style.width = `${newWidth}px`;
        win.el.style.height = `${newHeight}px`;
      };

      const onPointerUp = () => {
        isResizing = false;
        document.removeEventListener('pointermove', onPointerMove);
        document.removeEventListener('pointerup', onPointerUp);
      };

      document.addEventListener('pointermove', onPointerMove);
      document.addEventListener('pointerup', onPointerUp);
    });
  }

  createTaskbarItem(win) {
    const item = document.createElement('div');
    item.className = 'taskbar-item';
    item.id = `tb-${win.id}`;
    item.innerHTML = `
      <div class="taskbar-item-icon">${window.XPIcons.get(win.icon, 16)}</div>
      <div class="taskbar-item-title">${win.title}</div>
    `;

    item.addEventListener('click', () => {
      window.xpSound.playClick();
      if (win.isMinimized) {
        this.restoreWindow(win.id);
      } else if (this.activeWindowId === win.id) {
        this.minimizeWindow(win.id);
      } else {
        this.focusWindow(win.id);
      }
    });

    this.taskbarContainer.appendChild(item);
    win.taskbarItem = item;
  }

  openWindow(id) {
    let win = this.windows.get(id);
    if (!win) {
      win = this.registerWindow(id);
    }
    if (!win) return;

    window.xpSound.playClick();
    win.el.style.display = 'flex';
    win.isMinimized = false;
    win.el.classList.remove('minimized');
    if (win.taskbarItem) win.taskbarItem.style.display = 'flex';

    // Position nicely on screen if not positioned yet
    if (!win.el.style.left || win.el.style.left === '0px') {
      const offset = (this.windows.size % 6) * 26 + 30;
      const screenW = window.innerWidth;
      const screenH = window.innerHeight;
      
      const width = Math.min(win.defaultWidth, screenW - 40);
      const height = Math.min(win.defaultHeight, screenH - 80);
      const left = Math.max(20, (screenW - width) / 2 + (offset - 60));
      const top = Math.max(20, (screenH - height) / 2.3 + (offset - 60));

      win.el.style.width = `${width}px`;
      win.el.style.height = `${height}px`;
      win.el.style.left = `${left}px`;
      win.el.style.top = `${top}px`;
    }

    this.focusWindow(id);
  }

  focusWindow(id) {
    const win = this.windows.get(id);
    if (!win) return;

    this.topZIndex += 2;
    win.el.style.zIndex = this.topZIndex;

    this.windows.forEach(w => {
      w.el.classList.add('inactive');
      if (w.taskbarItem) w.taskbarItem.classList.remove('active');
    });

    win.el.classList.remove('inactive');
    if (win.taskbarItem) win.taskbarItem.classList.add('active');
    this.activeWindowId = id;
  }

  minimizeWindow(id) {
    const win = this.windows.get(id);
    if (!win) return;

    win.isMinimized = true;
    win.el.classList.add('minimized');
    if (win.taskbarItem) win.taskbarItem.classList.remove('active');

    // Find next active window
    const openWins = Array.from(this.windows.values()).filter(w => !w.isMinimized && w.el.style.display !== 'none');
    if (openWins.length > 0) {
      openWins.sort((a, b) => parseInt(b.el.style.zIndex || 0) - parseInt(a.el.style.zIndex || 0));
      this.focusWindow(openWins[0].id);
    } else {
      this.activeWindowId = null;
    }
  }

  restoreWindow(id) {
    const win = this.windows.get(id);
    if (!win) return;

    win.isMinimized = false;
    win.el.classList.remove('minimized');
    this.focusWindow(id);
  }

  toggleMaximize(id) {
    const win = this.windows.get(id);
    if (!win) return;

    window.xpSound.playClick();
    if (!win.isMaximized) {
      win.prevRect = {
        left: win.el.style.left,
        top: win.el.style.top,
        width: win.el.style.width,
        height: win.el.style.height
      };
      win.el.classList.add('maximized');
      win.isMaximized = true;
    } else {
      win.el.classList.remove('maximized');
      if (win.prevRect) {
        win.el.style.left = win.prevRect.left;
        win.el.style.top = win.prevRect.top;
        win.el.style.width = win.prevRect.width;
        win.el.style.height = win.prevRect.height;
      }
      win.isMaximized = false;
    }
    this.focusWindow(id);
  }

  closeWindow(id) {
    const win = this.windows.get(id);
    if (!win) return;

    window.xpSound.playClick();
    win.el.style.display = 'none';
    if (win.taskbarItem) win.taskbarItem.style.display = 'none';

    if (this.activeWindowId === id) {
      const openWins = Array.from(this.windows.values()).filter(w => !w.isMinimized && w.el.style.display !== 'none');
      if (openWins.length > 0) {
        this.focusWindow(openWins[0].id);
      } else {
        this.activeWindowId = null;
      }
    }
  }
}

window.windowManager = new WindowManager();
