import state from '../../state';
import staticMethods from '../staticMethods';

export default class PaintAll {
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
    this.canvas.onmousedown = (event) => { this.fill(event); };
    this.canvas.onmousemove = (event) => { this.move(event); };
  }

  cursor() {
    this.canvas = state.mainCanvas;
    this.canvas.classList.remove('cur-pen');
    this.canvas.classList.remove('cur-stroke');
    this.canvas.classList.add('cur-paint-bucket');
    this.canvas.classList.remove('cur-eraser');
    this.canvas.classList.remove('cur-color-picker');
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

  fill(data) {
    state.mainCanvasCtx.fillStyle = state.primaryColor;
    state.mainCanvasCtx.putImageData(this.image, 0, 0);
    const dstImg = state.mainCanvasCtx.getImageData(0, 0, state.canvasSize, state.canvasSize);
    const dstData = dstImg.data;
    const startX = staticMethods.getCoords(data).left;
    const startY = staticMethods.getCoords(data).top;
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
    state.mainCanvasCtx.putImageData(dstImg, 0, 0);
    this.image = state.mainCanvasCtx.getImageData(0, 0, state.canvasSize, state.canvasSize);
    state.frameObj.update(this.image);
  }
}
