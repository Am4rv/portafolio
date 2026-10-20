/**
 * Windows XP Media Player with procedural audio synth and real-time visualizer canvas.
 */
class XPMediaPlayer {
  constructor() {
    this.canvas = document.getElementById('wmp-canvas');
    this.playBtn = document.getElementById('wmp-play-btn');
    this.trackTitle = document.getElementById('wmp-title');
    this.isPlaying = false;
    this.audioCtx = null;
    this.analyser = null;
    this.animId = null;
    this.seqInterval = null;
    this.step = 0;
    this.currentTrackIdx = 0;

    this.tracks = [
      { title: 'Amaru Lo-Fi Synth Journey', artist: 'Amaru Ríos (Audio Synth)' },
      { title: 'Windows XP Bliss Wave 2026', artist: 'Retro XP Soundfont' }
    ];

    this.init();
  }

  init() {
    if (!this.canvas || !this.playBtn) return;
    this.canvasCtx = this.canvas.getContext('2d');

    this.playBtn.addEventListener('click', () => {
      this.togglePlay();
    });

    const nextBtn = document.getElementById('wmp-next-btn');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        this.nextTrack();
      });
    }

    this.drawIdleVisualizer();
  }

  nextTrack() {
    this.currentTrackIdx = (this.currentTrackIdx + 1) % this.tracks.length;
    this.trackTitle.textContent = this.tracks[this.currentTrackIdx].title;
    if (this.isPlaying) {
      this.stopMusic();
      this.startMusic();
    }
  }

  togglePlay() {
    if (this.isPlaying) {
      this.stopMusic();
      this.playBtn.innerHTML = '▶';
    } else {
      this.startMusic();
      this.playBtn.innerHTML = '❚❚';
    }
    this.isPlaying = !this.isPlaying;
  }

  setupAudioContext() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioContext();
      this.analyser = this.audioCtx.createAnalyser();
      this.analyser.fftSize = 64;
      this.analyser.connect(this.audioCtx.destination);
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  startMusic() {
    this.setupAudioContext();
    this.step = 0;

    // Procedural Lo-Fi Chords
    // Track 1: Dm9 -> G13 -> Cmaj9 -> Am7
    const chordsT1 = [
      [146.83, 220.00, 261.63, 329.63], // Dm9
      [196.00, 246.94, 329.63, 392.00], // G
      [130.81, 196.00, 246.94, 329.63], // Cmaj9
      [220.00, 261.63, 329.63, 392.00]  // Am7
    ];

    // Track 2: Upbeat Bliss Retro Arps
    const chordsT2 = [
      [174.61, 261.63, 349.23, 440.00], // F
      [196.00, 293.66, 392.00, 493.88], // G
      [220.00, 261.63, 329.63, 440.00], // Am
      [130.81, 196.00, 261.63, 329.63]  // C
    ];

    this.seqInterval = setInterval(() => {
      if (!this.audioCtx || this.audioCtx.state === 'suspended') return;
      const chords = this.currentTrackIdx === 0 ? chordsT1 : chordsT2;
      const currentChord = chords[this.step % chords.length];

      currentChord.forEach(freq => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        const filter = this.audioCtx.createBiquadFilter();

        osc.type = this.currentTrackIdx === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1400, this.audioCtx.currentTime);

        gain.gain.setValueAtTime(0.001, this.audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.04, this.audioCtx.currentTime + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + 1.4);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.analyser);

        osc.start(this.audioCtx.currentTime);
        osc.stop(this.audioCtx.currentTime + 1.4);
      });

      this.step++;
    }, 1500);

    this.startVisualizer();
  }

  stopMusic() {
    clearInterval(this.seqInterval);
    cancelAnimationFrame(this.animId);
    this.drawIdleVisualizer();
  }

  startVisualizer() {
    const bufferLength = this.analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const render = () => {
      this.animId = requestAnimationFrame(render);
      this.analyser.getByteFrequencyData(dataArray);

      const w = this.canvas.width;
      const h = this.canvas.height;
      this.canvasCtx.fillStyle = 'rgba(6, 12, 24, 0.4)';
      this.canvasCtx.fillRect(0, 0, w, h);

      const barWidth = (w / bufferLength) * 1.8;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArray[i] / 255) * h * 0.85;

        // XP Blue/Cyan to Green gradient
        const grad = this.canvasCtx.createLinearGradient(0, h - barHeight, 0, h);
        grad.addColorStop(0, '#5DE0E6');
        grad.addColorStop(0.5, '#0058EE');
        grad.addColorStop(1, '#002B7A');

        this.canvasCtx.fillStyle = grad;
        this.canvasCtx.fillRect(x, h - barHeight, barWidth - 2, barHeight);

        // Peak dot
        this.canvasCtx.fillStyle = '#FFFFFF';
        this.canvasCtx.fillRect(x, h - barHeight - 2, barWidth - 2, 2);

        x += barWidth;
      }
    };
    render();
  }

  drawIdleVisualizer() {
    const w = this.canvas.width;
    const h = this.canvas.height;
    this.canvasCtx.fillStyle = '#060C18';
    this.canvasCtx.fillRect(0, 0, w, h);

    // Draw peaceful idle line
    this.canvasCtx.strokeStyle = '#2B559B';
    this.canvasCtx.lineWidth = 2;
    this.canvasCtx.beginPath();
    this.canvasCtx.moveTo(0, h / 2);
    this.canvasCtx.lineTo(w, h / 2);
    this.canvasCtx.stroke();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.xpMediaPlayer = new XPMediaPlayer();
});
