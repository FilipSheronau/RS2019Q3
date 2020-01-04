import state from '../state';

export default class CanvasSize {
  constructor() {
    this.canvasSize = null;
    this.canvas = null;
  }

  load(mainCanvas) {
    this.canvas = mainCanvas;
    this.canvasSize = state.canvasSize;
    document.querySelector(`.canvas-size li[data-size='${this.canvasSize}']`).classList.add('active');
  }

  set(newEl) {
    const oldEl = document.querySelector('.canvas-size li.active');
    if (newEl.tagName === 'LI') {
      if (newEl.getAttribute('data-size') !== oldEl.getAttribute('data-size')) {
        oldEl.classList.remove('active');
        newEl.classList.add('active');
        this.canvasSize = newEl.getAttribute('data-size');
        state.canvasSize = Number(this.canvasSize);
        this.updateSize();
      }
    }
  }

  updateSize() {
    this.width = state.canvasSize;
    this.height = state.canvasSize;
    this.canvas.canvas.setAttribute('width', this.width);
    this.canvas.canvas.setAttribute('height', this.height);
    this.canvas.ctx.clearRect(0, 0, this.width, this.height);
    this.canvas.ctx.fillStyle = state.primaryColor;
  }
}
