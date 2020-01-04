import state from '../state';

export default class Canvas {
  constructor(path, id, cl) {
    this.canvas = null;
    this.ctx = null;
    this.width = state.canvasSize;
    this.height = state.canvasSize;
    this.path = path;
    this.id = id;
    this.cl = cl;
  }

  load() {
    this.create();
  }

  create() {
    const canvasEl = document.createElement('canvas');
    if (this.id) canvasEl.setAttribute('id', this.id);
    if (this.cl) canvasEl.classList.add(this.cl);
    this.path.append(canvasEl);
    this.canvas = this.path.lastElementChild;
    this.ctx = this.canvas.getContext('2d');
    this.canvas.setAttribute('width', this.width);
    this.canvas.setAttribute('height', this.height);
    this.ctx.fillStyle = state.primaryColor;
  }
}
