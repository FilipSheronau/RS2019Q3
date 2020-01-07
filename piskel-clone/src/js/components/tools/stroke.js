import state from '../../state';
import staticMethods from '../staticMethods';

export default class Stroke {
  constructor() {
    this.image = null;
    this.permitDraw = false;
    this.firstPoint = {
      left: null,
      top: null,
    };
    this.canvas = null;
  }

  events() {
    this.canvas = state.mainCanvas;
    this.canvas.onmouseover = (event) => { this.over(event); };
    this.canvas.onmouseout = () => { this.out(); };
    this.canvas.onmousedown = (event) => { this.startDraw(event); };
    this.canvas.onmousemove = (event) => { this.draw(event); };
    this.canvas.onmouseup = (event) => { this.stopDraw(event); };
  }

  cursor() {
    this.canvas = state.mainCanvas;
    this.canvas.classList.remove('cur-pen');
    this.canvas.classList.add('cur-stroke');
    this.canvas.classList.remove('cur-paint-bucket');
    this.canvas.classList.remove('cur-eraser');
    this.canvas.classList.remove('cur-color-picker');
  }

  over(data) {
    if (this.permitDraw !== true) {
      this.image = state.mainCanvasCtx.getImageData(0, 0, state.canvasSize, state.canvasSize);
      this.firstPoint.left = staticMethods.getCoords(data).left;
      this.firstPoint.top = staticMethods.getCoords(data).top;
      state.mainCanvasCtx.fillStyle = '#88888850';
      state.mainCanvasCtx.fillRect(
        this.firstPoint.left - Math.floor(state.toolSize / 2),
        this.firstPoint.top - Math.floor(state.toolSize / 2),
        state.toolSize,
        state.toolSize,
      );
    }
  }

  out() {
    if (this.permitDraw !== true) state.mainCanvasCtx.putImageData(this.image, 0, 0);
  }

  startDraw(data) {
    this.permitDraw = true;
    this.firstPoint.left = staticMethods.getCoords(data).left;
    this.firstPoint.top = staticMethods.getCoords(data).top;
    state.mainCanvasCtx.fillStyle = state.primaryColor;
    state.mainCanvasCtx.fillRect(
      this.firstPoint.left - Math.floor(state.toolSize / 2),
      this.firstPoint.top - Math.floor(state.toolSize / 2),
      state.toolSize,
      state.toolSize,
    );
    this.image = state.mainCanvasCtx.getImageData(0, 0, state.canvasSize, state.canvasSize);
    state.frameObj.update(this.image);
  }

  stopDraw() {
    this.image = state.mainCanvasCtx.getImageData(0, 0, state.canvasSize, state.canvasSize);
    state.frameObj.update(this.image);
    this.permitDraw = false;
    this.firstPoint.left = null;
    this.firstPoint.top = null;
  }

  draw(data) {
    if (this.permitDraw === true) {
      state.mainCanvasCtx.putImageData(this.image, 0, 0);
      const xx = staticMethods.getCoords(data).left;
      const yy = staticMethods.getCoords(data).top;
      const x = this.firstPoint.left;
      const y = this.firstPoint.top;
      const dx = Math.abs(xx - x);
      const sx = x < xx ? 1 : -1;
      const dy = -Math.abs(yy - y);
      const sy = y < yy ? 1 : -1;
      let err = dx + dy;
      let errC;
      let end = false;
      let x1 = x;
      let y1 = y;
      while (!end) {
        state.mainCanvasCtx.fillRect(
          x1 - Math.floor(state.toolSize / 2),
          y1 - Math.floor(state.toolSize / 2),
          state.toolSize,
          state.toolSize,
        );
        if (x1 === xx && y1 === yy) {
          end = true;
        } else {
          errC = 2 * err;
          if (errC >= dy) {
            err += dy;
            x1 += sx;
          }
          if (errC <= dx) {
            err += dx;
            y1 += sy;
          }
        }
      }
    } else {
      state.mainCanvasCtx.putImageData(this.image, 0, 0);
      this.firstPoint.left = staticMethods.getCoords(data).left;
      this.firstPoint.top = staticMethods.getCoords(data).top;
      state.mainCanvasCtx.fillStyle = '#88888850';
      state.mainCanvasCtx.fillRect(
        this.firstPoint.left - Math.floor(state.toolSize / 2),
        this.firstPoint.top - Math.floor(state.toolSize / 2),
        state.toolSize,
        state.toolSize,
      );
    }
  }
}
