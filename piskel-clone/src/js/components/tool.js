import state from '../state';
import Pen from './tools/pen';
import Stroke from './tools/stroke';
import PaintBucket from './tools/paintBucket';
import PaintAll from './tools/paintAll';
import Eraser from './tools/eraser';
import ColorPicker from './tools/colorPicker';

export default class Tool {
  constructor() {
    this.tool = null;
    this.methods = null;
    this.pen = null;
    this.stroke = null;
    this.eraser = null;
    this.paintBucket = null;
    this.paintAll = null;
    this.colorPicker = null;
  }

  load() {
    this.tool = state.tool;
    this.pen = new Pen();
    this.stroke = new Stroke();
    this.eraser = new Eraser();
    this.paintBucket = new PaintBucket();
    this.paintAll = new PaintAll();
    this.colorPicker = new ColorPicker();
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
          state.mainCanvasCtx.clearRect(0, 0, state.canvasSize, state.canvasSize);
          const image = state.mainCanvasCtx.getImageData(0, 0, state.canvasSize, state.canvasSize);
          state.frameObj.clear(image);
        }
      }
    }
  }

  loadToolEvents() {
    state.mainCanvas.onmousedown = null;
    state.mainCanvas.onmouseup = null;
    state.mainCanvas.onmouseout = null;
    state.mainCanvas.onmousemove = null;
    state.mainCanvas.onmouseover = null;
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
      case 'paintAll':
        this.paintAll.events();
        this.paintAll.cursor();
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
