import state from '../../state';
import staticMethods from '../staticMethods';

export default class Eraser {
  constructor() {
    this.canvas = null;
    this.image = null;
    this.permitDraw = false;
    this.firstPoint = {
      left: null,
      top: null,
    };
    this.isClear = true;
    this.busy = false;
    this.filterValue = '';
  }

  events() {
    this.canvas = state.mainCanvas;
    this.canvas.onmouseover = (event) => { this.over(event); };
    this.canvas.onmouseout = (event) => { this.out(event); };
    this.canvas.onmousedown = (event) => { this.startDraw(event); };
    this.canvas.onmousemove = (event) => { this.draw(event); };
    this.canvas.onmouseup = (event) => { this.stopDraw(event); };
  }

  cursor() {
    this.canvas = state.mainCanvas;
    this.canvas.classList.remove('cur-cur-pen');
    this.canvas.classList.remove('cur-stroke');
    this.canvas.classList.remove('cur-paint-bucket');
    this.canvas.classList.add('cur-eraser');
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
    document.querySelector('.coords').innerHTML = '0x0';
  }

  startDraw(data) {
    this.permitDraw = true;
    this.firstPoint.left = staticMethods.getCoords(data).left;
    this.firstPoint.top = staticMethods.getCoords(data).top;
    state.mainCanvasCtx.fillStyle = state.primaryColor;
    state.mainCanvasCtx.clearRect(
      this.firstPoint.left - Math.floor(state.toolSize / 2),
      this.firstPoint.top - Math.floor(state.toolSize / 2),
      state.toolSize,
      state.toolSize,
    );
    this.image = state.mainCanvasCtx.getImageData(0, 0, state.canvasSize, state.canvasSize);
    state.frameObj.update(this.image);
  }

  stopDraw() {
    state.mainCanvasCtx.putImageData(this.image, 0, 0);
    this.permitDraw = false;
    this.firstPoint.left = null;
    this.firstPoint.top = null;
  }

  draw(data) {
    if (this.permitDraw === true) {
      let x1 = this.firstPoint.left;
      let y1 = this.firstPoint.top;
      const x2 = staticMethods.getCoords(data).left;
      const y2 = staticMethods.getCoords(data).top;
      this.firstPoint.left = staticMethods.getCoords(data).left;
      this.firstPoint.top = staticMethods.getCoords(data).top;
      const deltaX = Math.abs(x2 - x1);
      const deltaY = Math.abs(y2 - y1);
      const signX = x1 < x2 ? 1 : -1;
      const signY = y1 < y2 ? 1 : -1;
      let error = deltaX - deltaY;
      state.mainCanvasCtx.clearRect(
        x2 - Math.floor(state.toolSize / 2),
        y2 - Math.floor(state.toolSize / 2),
        state.stoolSize,
        state.toolSize,
      );
      while (x1 !== x2 || y1 !== y2) {
        state.mainCanvasCtx.clearRect(
          x1 - Math.floor(state.toolSize / 2),
          y1 - Math.floor(state.toolSize / 2),
          state.toolSize,
          state.toolSize,
        );
        const error2 = error * 2;
        if (error2 > -deltaY) {
          error -= deltaY;
          x1 += signX;
        }
        if (error2 < deltaX) {
          error += deltaX;
          y1 += signY;
        }
      }
      this.image = state.mainCanvasCtx.getImageData(0, 0, state.canvasSize, state.canvasSize);
      state.frameObj.update(this.image);
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
