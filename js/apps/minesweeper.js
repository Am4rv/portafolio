/**
 * Windows XP Minesweeper (Buscaminas)
 * Fully playable 9x9 retro game with cascade reveals, flags, timers and authentic animations.
 */
class Minesweeper {
  constructor() {
    this.width = 9;
    this.height = 9;
    this.totalMines = 10;
    this.grid = [];
    this.revealedCount = 0;
    this.flagsCount = 0;
    this.isGameOver = false;
    this.timer = 0;
    this.timerInterval = null;
    this.started = false;

    this.gridEl = document.getElementById('mine-grid');
    this.faceBtn = document.getElementById('mine-smiley');
    this.minesLeftEl = document.getElementById('mine-count-display');
    this.timerEl = document.getElementById('mine-timer-display');

    this.init();
  }

  init() {
    if (!this.gridEl) return;
    this.faceBtn.addEventListener('click', () => {
      window.xpSound.playClick();
      this.reset();
    });
    this.reset();
  }

  reset() {
    clearInterval(this.timerInterval);
    this.timer = 0;
    this.started = false;
    this.isGameOver = false;
    this.revealedCount = 0;
    this.flagsCount = 0;
    this.faceBtn.textContent = '🙂';
    this.updateLCD(this.timerEl, 0);
    this.updateLCD(this.minesLeftEl, this.totalMines);

    this.grid = Array(this.height).fill(null).map(() => 
      Array(this.width).fill(null).map(() => ({
        mine: false,
        revealed: false,
        flagged: false,
        count: 0
      }))
    );

    this.render();
  }

  start(firstR, firstC) {
    this.started = true;
    let placed = 0;
    while (placed < this.totalMines) {
      const r = Math.floor(Math.random() * this.height);
      const c = Math.floor(Math.random() * this.width);
      if (!this.grid[r][c].mine && !(r === firstR && c === firstC)) {
        this.grid[r][c].mine = true;
        placed++;
      }
    }

    // Calculate neighbors
    for (let r = 0; r < this.height; r++) {
      for (let c = 0; c < this.width; c++) {
        if (!this.grid[r][c].mine) {
          let count = 0;
          for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
              const nr = r + dr, nc = c + dc;
              if (nr >= 0 && nr < this.height && nc >= 0 && nc < this.width && this.grid[nr][nc].mine) {
                count++;
              }
            }
          }
          this.grid[r][c].count = count;
        }
      }
    }

    this.timerInterval = setInterval(() => {
      this.timer = Math.min(999, this.timer + 1);
      this.updateLCD(this.timerEl, this.timer);
    }, 1000);
  }

  updateLCD(el, num) {
    if (!el) return;
    el.textContent = Math.max(0, num).toString().padStart(3, '0');
  }

  render() {
    this.gridEl.innerHTML = '';
    for (let r = 0; r < this.height; r++) {
      for (let c = 0; c < this.width; c++) {
        const cellEl = document.createElement('div');
        cellEl.className = 'mine-cell';
        cellEl.dataset.r = r;
        cellEl.dataset.c = c;

        cellEl.addEventListener('click', () => this.handleCellClick(r, c));
        cellEl.addEventListener('contextmenu', (e) => {
          e.preventDefault();
          this.handleRightClick(r, c);
        });

        this.gridEl.appendChild(cellEl);
      }
    }
  }

  handleCellClick(r, c) {
    if (this.isGameOver) return;
    const cell = this.grid[r][c];
    if (cell.revealed || cell.flagged) return;

    if (!this.started) {
      this.start(r, c);
    }

    window.xpSound.playClick();

    if (cell.mine) {
      this.gameOver(false, r, c);
      return;
    }

    this.reveal(r, c);

    if (this.revealedCount === (this.width * this.height - this.totalMines)) {
      this.gameOver(true);
    }
  }

  reveal(r, c) {
    const cell = this.grid[r][c];
    if (cell.revealed || cell.flagged) return;

    cell.revealed = true;
    this.revealedCount++;

    const cellEl = this.gridEl.children[r * this.width + c];
    cellEl.classList.add('revealed');

    if (cell.count > 0) {
      cellEl.textContent = cell.count;
      cellEl.dataset.val = cell.count;
    } else {
      // Cascade reveal
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          const nr = r + dr, nc = c + dc;
          if (nr >= 0 && nr < this.height && nc >= 0 && nc < this.width) {
            this.reveal(nr, nc);
          }
        }
      }
    }
  }

  handleRightClick(r, c) {
    if (this.isGameOver) return;
    const cell = this.grid[r][c];
    if (cell.revealed) return;

    window.xpSound.playClick();
    cell.flagged = !cell.flagged;
    const cellEl = this.gridEl.children[r * this.width + c];

    if (cell.flagged) {
      cellEl.textContent = '🚩';
      this.flagsCount++;
    } else {
      cellEl.textContent = '';
      this.flagsCount--;
    }

    this.updateLCD(this.minesLeftEl, this.totalMines - this.flagsCount);
  }

  gameOver(won, hitR, hitC) {
    this.isGameOver = true;
    clearInterval(this.timerInterval);

    if (won) {
      this.faceBtn.textContent = '😎';
      window.xpSound.playNotify();
    } else {
      this.faceBtn.textContent = '😵';
      window.xpSound.playError();
      // Reveal all mines
      for (let r = 0; r < this.height; r++) {
        for (let c = 0; c < this.width; c++) {
          const cell = this.grid[r][c];
          const cellEl = this.gridEl.children[r * this.width + c];
          if (cell.mine) {
            cellEl.classList.add('revealed');
            cellEl.textContent = '💣';
            if (r === hitR && c === hitC) {
              cellEl.style.backgroundColor = '#FF5555';
            }
          }
        }
      }
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.minesweeper = new Minesweeper();
});
