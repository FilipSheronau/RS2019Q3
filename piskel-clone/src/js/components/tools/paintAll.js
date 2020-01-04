import state from '../../state';
import staticMethods from '../staticMethods';

export default class PaintAll {
  constructor(canvas, methods) {
    this.canvas = canvas.canvas;
    this.ctx = canvas.ctx;
    this.methods = methods;
    this.image = null;
    this.firstPoint = {
      left: null,
      top: null,
    };
  }

  events() {
    this.canvas.onmouseover = (event) => { this.over(event); };
    this.canvas.onmouseout = (event) => { this.out(event); };
    this.canvas.onmousedown = (event) => { this.fill(event); };
    this.canvas.onmousemove = (event) => { this.move(event); };
  }

  cursor() {
    this.canvas.classList.remove('cur-pen');
    this.canvas.classList.remove('cur-stroke');
    this.canvas.classList.add('cur-paint-bucket');
    this.canvas.classList.remove('cur-eraser');
    this.canvas.classList.remove('cur-color-picker');
  }

  over(data) {
    this.image = this.ctx.getImageData(0, 0, state.canvasSize, state.canvasSize);
    this.firstPoint.left = this.methods.getCoords(data).left;
    this.firstPoint.top = this.methods.getCoords(data).top;
    this.ctx.fillStyle = '#88888850';
    this.ctx.fillRect(
      this.firstPoint.left,
      this.firstPoint.top,
      1,
      1,
    );
  }

  move(data) {
    this.ctx.putImageData(this.image, 0, 0);
    this.firstPoint.left = this.methods.getCoords(data).left;
    this.firstPoint.top = this.methods.getCoords(data).top;
    this.ctx.fillStyle = '#88888850';
    this.ctx.fillRect(
      this.firstPoint.left,
      this.firstPoint.top,
      1,
      1,
    );
  }

  out() {
    this.ctx.putImageData(this.image, 0, 0);
  }

  fill(data) {
    this.ctx.fillStyle = state.primaryColor;
    this.ctx.putImageData(this.image, 0, 0);
    const dstImg = this.ctx.getImageData(0, 0, state.canvasSize, state.canvasSize);
    const dstData = dstImg.data;
    const startX = this.methods.getCoords(data).left;
    const startY = this.methods.getCoords(data).top;
    const fillColor = staticMethods.colorToRgba(state.primaryColor);
    const pos = staticMethods.getPixelPos(startX, startY);
    const oldColor = {
      r: dstData[pos],
      g: dstData[pos + 1],
      b: dstData[pos + 2],
      a: dstData[pos + 3],
    };
    for (let i = 0, len = dstData.length; i < len; i += 4) {
      if (
        (dstData[i] === oldColor.r)
        && (dstData[i + 1] === oldColor.g)
        && (dstData[i + 2] === oldColor.b)
        && (dstData[pos + 3] !== 0)
      ) {
        dstData[i] = fillColor.r;
        dstData[i + 1] = fillColor.g;
        dstData[i + 2] = fillColor.b;
      }
    }
    this.ctx.putImageData(dstImg, 0, 0);
    this.image = this.ctx.getImageData(0, 0, state.canvasSize, state.canvasSize);
  }
}
