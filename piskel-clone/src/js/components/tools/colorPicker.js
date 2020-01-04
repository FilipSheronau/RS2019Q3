import state from '../../state';
import staticMethods from '../staticMethods';

export default class ColorPicker {
  constructor(canvas, methods, primaryColor) {
    this.canvas = canvas.canvas;
    this.primaryColor = primaryColor;
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
    this.canvas.onmousedown = (event) => { this.picker(event); };
    this.canvas.onmousemove = (event) => { this.move(event); };
  }

  cursor() {
    this.canvas.classList.remove('cur-pen');
    this.canvas.classList.remove('cur-stroke');
    this.canvas.classList.remove('cur-paint-bucket');
    this.canvas.classList.remove('cur-eraser');
    this.canvas.classList.add('cur-color-picker');
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

  picker(data) {
    this.ctx.putImageData(this.image, 0, 0);
    const startX = this.methods.getCoords(data).left;
    const startY = this.methods.getCoords(data).top;
    const dstImg = this.ctx.getImageData(0, 0, state.canvasSize, state.canvasSize);
    const dstData = dstImg.data;
    const startPos = staticMethods.getPixelPos(startX, startY);
    const startColor = {
      r: dstData[startPos],
      g: dstData[startPos + 1],
      b: dstData[startPos + 2],
      a: dstData[startPos + 3],
    };
    const newColor = staticMethods.rgbToHex(startColor);
    this.over(data);
    if (newColor) this.primaryColor.setColor(newColor);
  }
}
