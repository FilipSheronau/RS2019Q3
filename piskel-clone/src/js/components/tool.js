import state from '../state';
import Pen from './tools/pen';
import Stroke from './tools/stroke';
import PaintBucket from './tools/paintBucket';
import Eraser from './tools/eraser';
import ColorPicker from './tools/colorPicker';
// import colorPicker from './tools/colorPicker';
// import canvasClear from './tools/canvasClear';

export default class Tool {
  constructor() {
    this.tool = null;
    this.canvas = null;
    this.methods = null;
    this.pen = null;
    this.stroke = null;
    this.eraser = null;
    this.paintBucket = null;
    this.colorPicker = null;
  }

  load(mainCanvas, staticMethods, primaryColor) {
    this.tool = state.tool;
    this.canvas = mainCanvas;
    this.pen = new Pen(mainCanvas, staticMethods);
    this.stroke = new Stroke(mainCanvas, staticMethods);
    this.eraser = new Eraser(mainCanvas, staticMethods);
    this.paintBucket = new PaintBucket(mainCanvas, staticMethods);
    this.colorPicker = new ColorPicker(mainCanvas, staticMethods, primaryColor);
    document.querySelector(`.tools li[data-tool='${this.tool}']`).classList.add('active');
    this.loadToolEvents();
  }

  set(data) {
    if (data.tagName === 'LI' || data.tagName === 'DIV') {
      const newEl = data.closest('li');
      const oldEl = document.querySelector('.tools li.active');
      if (newEl.getAttribute('data-tool') !== oldEl.getAttribute('data-tool')) {
        if (newEl.getAttribute('data-tool') !== 'canvasClear') {
          oldEl.classList.remove('active');
          newEl.classList.add('active');
          this.tool = newEl.getAttribute('data-tool');
          state.tool = this.tool;
          this.loadToolEvents();
        } else {
          this.canvas.ctx.clearRect(0, 0, state.canvasSize, state.canvasSize);
        }
      }
    }
  }

  loadToolEvents() {
    this.canvas.canvas.onmousedown = null;
    this.canvas.canvas.onmouseup = null;
    this.canvas.canvas.onmouseout = null;
    this.canvas.canvas.onmousemove = null;
    this.canvas.canvas.onmouseover = null;
    switch (this.tool) {
      case 'pen':
        this.pen.events();
        this.pen.cursor();
        break;
      case 'stroke':
        this.stroke.events();
        this.stroke.cursor();
        break;
      case 'paintBucket':
        this.paintBucket.events();
        this.paintBucket.cursor();
        break;
      case 'eraser':
        this.eraser.events();
        this.eraser.cursor();
        break;
      case 'colorPicker':
        this.colorPicker.events();
        this.colorPicker.cursor();
        break;
      default:
    }
  }
}
