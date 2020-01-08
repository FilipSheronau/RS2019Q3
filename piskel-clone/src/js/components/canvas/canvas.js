import state from '../../state';

export default class Canvas {
  constructor() {
    this.canvasEl = document.createElement('canvas');
    this.canvas = null;
    this.activeFrameCtx = null;
  }

  load() {
    this.create();
  }

  create() {
    this.canvasEl.setAttribute('id', 'main-canvas');
    document.querySelector('.main-canvas-container').append(this.canvasEl);
    state.mainCanvas = document.querySelector('.main-canvas-container').lastElementChild;
    state.mainCanvasCtx = state.mainCanvas.getContext('2d');
    state.mainCanvas.setAttribute('width', state.canvasSize);
    state.mainCanvas.setAttribute('height', state.canvasSize);
  }

  update(data) {
    this.activeFrameCtx = state.activeFrameCtx;
    state.mainCanvasCtx.putImageData(data, 0, 0);
  }

  clear() {
    state.mainCanvasCtx.clearRect(0, 0, state.canvasSize, state.canvasSize);
    this.canvas = state.mainCanvasCtx;
  }
}
