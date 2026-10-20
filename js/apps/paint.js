/**
 * Windows XP MS Paint Replica
 * Interactive canvas drawing tool with color palette, brush sizes and export.
 */
class XPPaint {
  constructor() {
    this.canvas = document.getElementById('paint-canvas');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d', { willReadFrequently: true });
    this.color = '#000000';
    this.tool = 'pencil';
    this.brushSize = 2;
    this.isDrawing = false;
    this.lastX = 0;
    this.lastY = 0;

    this.palette = [
      '#000000', '#787878', '#790300', '#757A01', '#007902', '#00777B', '#030078', '#7B0077',
      '#767A38', '#003E3E', '#0F78DE', '#003E78', '#3C00DE', '#783C00', '#FFFFFF', '#B8B8B8',
      '#DE1103', '#DEE011', '#0CDE11', '#10DEDE', '#1116DE', '#DE10DE', '#DEDE75', '#0FDE7B',
      '#7BE3DE', '#7878DE', '#DE1075', '#DE783E'
    ];

    this.init();
  }

  init() {
    // Fill white canvas initially
    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.renderPalette();
    this.setupTools();
    this.setupDrawing();
  }

  renderPalette() {
    const container = document.getElementById('paint-palette');
    if (!container) return;

    this.palette.forEach(hex => {
      const swatch = document.createElement('div');
      swatch.className = 'palette-swatch';
      swatch.style.backgroundColor = hex;
      swatch.addEventListener('click', () => {
        this.color = hex;
        const currentIndicator = document.getElementById('paint-curr-color');
        if (currentIndicator) currentIndicator.style.backgroundColor = hex;
      });
      container.appendChild(swatch);
    });
  }

  setupTools() {
    document.querySelectorAll('.paint-tool-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.paint-tool-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.tool = btn.dataset.tool;

        if (this.tool === 'pencil') this.brushSize = 2;
        if (this.tool === 'brush') this.brushSize = 6;
        if (this.tool === 'eraser') this.brushSize = 14;
      });
    });

    const clearBtn = document.getElementById('paint-clear-btn');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        window.xpSound.playTrash();
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      });
    }

    const saveBtn = document.getElementById('paint-save-btn');
    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        window.xpSound.playClick();
        const link = document.createElement('a');
        link.download = 'amaru_dibujo_xp.png';
        link.href = this.canvas.toDataURL();
        link.click();
      });
    }
  }

  setupDrawing() {
    const getPos = (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return {
        x: Math.round(clientX - rect.left),
        y: Math.round(clientY - rect.top)
      };
    };

    const start = (e) => {
      this.isDrawing = true;
      const pos = getPos(e);
      this.lastX = pos.x;
      this.lastY = pos.y;

      if (this.tool === 'fill') {
        this.floodFill(pos.x, pos.y, this.color);
        this.isDrawing = false;
        return;
      }

      this.draw(pos.x, pos.y);
    };

    const move = (e) => {
      if (!this.isDrawing) return;
      const pos = getPos(e);
      this.draw(pos.x, pos.y);
      this.lastX = pos.x;
      this.lastY = pos.y;
    };

    const stop = () => {
      this.isDrawing = false;
    };

    this.canvas.addEventListener('mousedown', start);
    this.canvas.addEventListener('mousemove', move);
    window.addEventListener('mouseup', stop);

    this.canvas.addEventListener('touchstart', (e) => { e.preventDefault(); start(e); });
    this.canvas.addEventListener('touchmove', (e) => { e.preventDefault(); move(e); });
    window.addEventListener('touchend', stop);
  }

  draw(x, y) {
    this.ctx.beginPath();
    this.ctx.moveTo(this.lastX, this.lastY);
    this.ctx.lineTo(x, y);
    this.ctx.strokeStyle = this.tool === 'eraser' ? '#FFFFFF' : this.color;
    this.ctx.lineWidth = this.brushSize;
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';
    this.ctx.stroke();
  }

  floodFill(startX, startY, fillColor) {
    const imgData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    const data = imgData.data;
    const w = this.canvas.width;
    const h = this.canvas.height;

    const startIndex = (startY * w + startX) * 4;
    const targetR = data[startIndex];
    const targetG = data[startIndex + 1];
    const targetB = data[startIndex + 2];

    const temp = document.createElement('div');
    temp.style.color = fillColor;
    document.body.appendChild(temp);
    const rgbStr = window.getComputedStyle(temp).color;
    document.body.removeChild(temp);
    const match = rgbStr.match(/\d+/g);
    if (!match) return;
    const fillR = parseInt(match[0]);
    const fillG = parseInt(match[1]);
    const fillB = parseInt(match[2]);

    if (targetR === fillR && targetG === fillG && targetB === fillB) return;

    const stack = [[startX, startY]];
    while (stack.length > 0) {
      const [x, y] = stack.pop();
      const idx = (y * w + x) * 4;

      if (x < 0 || x >= w || y < 0 || y >= h) continue;
      if (data[idx] === targetR && data[idx + 1] === targetG && data[idx + 2] === targetB) {
        data[idx] = fillR;
        data[idx + 1] = fillG;
        data[idx + 2] = fillB;
        data[idx + 3] = 255;

        stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
      }
    }
    this.ctx.putImageData(imgData, 0, 0);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.xpPaint = new XPPaint();
});
