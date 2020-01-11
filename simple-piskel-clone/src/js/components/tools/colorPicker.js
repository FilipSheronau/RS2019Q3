import state from '../../state';
import staticMethods from '../staticMethods';

export default class ColorPicker {
  constructor() {
    this.canvas = null;
    this.image = null;
    this.firstPoint = {
      left: null,
      top: null,
    };
  }

  events() {
    this.canvas = state.mainCanvas;
    this.canvas.onmouseover = (event) => { this.over(event); };
    this.canvas.onmouseout = (event) => { this.out(event); };
    this.canvas.onmousedown = (event) => { this.picker(event); };
    this.canvas.onmousemove = (event) => { this.move(event); };
  }

  cursor() {
    this.canvas = state.mainCanvas;
    this.canvas.classList.remove('cur-pen');
    this.canvas.classList.remove('cur-stroke');
    this.canvas.classList.remove('cur-paint-bucket');
    this.canvas.classList.remove('cur-eraser');
    this.canvas.classList.add('cur-color-picker');
  }

  over(data) {
    this.image = state.mainCanvasCtx.getImageData(0, 0, state.canvasSize, state.canvasSize);
    this.firstPoint.left = staticMethods.getCoords(data).left;
    this.firstPoint.top = staticMethods.getCoords(data).top;
    state.mainCanvasCtx.fillStyle = '#88888850';
    state.mainCanvasCtx.fillRect(
      this.firstPoint.left,
      this.firstPoint.top,
      1,
      1,
    );
  }

  move(data) {
    state.mainCanvasCtx.putImageData(this.image, 0, 0);
    this.firstPoint.left = staticMethods.getCoords(data).left;
    this.firstPoint.top = staticMethods.getCoords(data).top;
    state.mainCanvasCtx.fillStyle = '#88888850';
    state.mainCanvasCtx.fillRect(
      this.firstPoint.left,
      this.firstPoint.top,
      1,
      1,
    );
  }

  out() {
    state.mainCanvasCtx.putImageData(this.image, 0, 0);
    document.querySelector('.coords').innerHTML = '0x0';
  }

  picker(data) {
    state.mainCanvasCtx.putImageData(this.image, 0, 0);
    const startX = staticMethods.getCoords(data).left;
    const startY = staticMethods.getCoords(data).top;
    const dstImg = state.mainCanvasCtx.getImageData(0, 0, state.canvasSize, state.canvasSize);
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
    if (newColor) state.primaryColorObj.setColor(newColor);
  }
}
