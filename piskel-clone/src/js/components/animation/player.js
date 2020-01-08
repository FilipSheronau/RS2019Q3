import state from '../../state';

export default class Player {
  constructor() {
    this.canvasEl = document.createElement('canvas');
    this.i = 0;
  }

  load() {
    this.create();
    this.animation();
  }

  create() {
    this.canvasEl.setAttribute('id', 'player-canvas');
    document.querySelector('.animated-preview-container').append(this.canvasEl);
    state.playerCanvas = document.querySelector('.animated-preview-container').lastElementChild;
    state.playerCanvasCtx = state.playerCanvas.getContext('2d');
    state.playerCanvas.setAttribute('width', state.canvasSize);
    state.playerCanvas.setAttribute('height', state.canvasSize);
  }

  animation() {
    const fps = 1000 / Number(state.playerFps);
    if (Number(state.playerFps) === 0) {
      this.ofPlayer();
    } else {
      this.onPlayer(fps);
    }
  }

  ofPlayer() {
    const img = state.frames[state.activeFrame].querySelector('canvas').getContext('2d').getImageData(0, 0, state.canvasSize, state.canvasSize);
    state.playerCanvasCtx.putImageData(img, 0, 0);
    this.i += 1;
    requestAnimationFrame(() => { this.animation(); });
  }

  onPlayer(fps) {
    setTimeout(() => {
      if (state.frames.length === 0) return;
      if (this.i > state.frames.length - 1) this.i = 0;
      let img = state.frames[this.i].querySelector('canvas');
      img = img.getContext('2d').getImageData(0, 0, state.canvasSize, state.canvasSize);
      state.playerCanvasCtx.putImageData(img, 0, 0);
      this.i += 1;
      requestAnimationFrame(() => { this.animation(); });
    }, fps);
  }
}
