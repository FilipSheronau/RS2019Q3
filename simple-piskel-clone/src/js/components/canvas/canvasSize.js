import state from '../../state';

export default class CanvasSize {
  constructor() {
    this.canvasSize = null;
  }

  load() {
    this.canvasSize = state.canvasSize;
    document.querySelector(`.canvas-size li[data-size='${this.canvasSize}']`).classList.add('active');
  }

  set(newEl) {
    const oldEl = document.querySelector('.canvas-size li.active');
    if (newEl.tagName === 'LI') {
      if (newEl.getAttribute('data-size') !== oldEl.getAttribute('data-size')) {
        oldEl.classList.remove('active');
        newEl.classList.add('active');
        state.canvasSize = Number(newEl.getAttribute('data-size'));
        this.updateSize();
      }
    }
  }

  updateSize() {
    this.canvasSize = state.canvasSize;
    state.mainCanvas.setAttribute('width', this.canvasSize);
    state.mainCanvas.setAttribute('height', this.canvasSize);
    state.mainCanvasCtx.clearRect(0, 0, this.canvasSize, this.canvasSize);
    state.playerCanvas.setAttribute('width', this.canvasSize);
    state.playerCanvas.setAttribute('height', this.canvasSize);
    state.playerCanvasCtx.clearRect(0, 0, this.canvasSize, this.canvasSize);
    state.frameObj.clearFrameList();
  }
}
