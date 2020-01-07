import state from '../../state';
import staticMethods from '../staticMethods';

export default class PaintBucket {
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
  }

  fill(data) {
    state.mainCanvasCtx.fillStyle = state.primaryColor;
    state.mainCanvasCtx.putImageData(this.image, 0, 0);
    const startX = staticMethods.getCoords(data).left;
    const startY = staticMethods.getCoords(data).top;
    const fillColor = staticMethods.colorToRgba(state.primaryColor);
    const dstImg = state.mainCanvasCtx.getImageData(0, 0, state.canvasSize, state.canvasSize);
    const dstData = dstImg.data;
    const startPos = staticMethods.getPixelPos(startX, startY);
    let startColor = {
      r: dstData[startPos],
      g: dstData[startPos + 1],
      b: dstData[startPos + 2],
      a: dstData[startPos + 3],
    };
    if (fillColor.r === startColor.r
      && fillColor.g === startColor.g
      && fillColor.b === startColor.b
    ) {
      startColor = {
        r: 0,
        g: 0,
        b: 0,
        a: 0,
      };
    }
    const todo = [[startX, startY]];
    while (todo.length) {
      const pos = todo.pop();
      const x = pos[0];
      let y = pos[1];
      let currentPos = staticMethods.getPixelPos(x, y);
      y += 1;
      while ((y >= 0) && staticMethods.matchStartColor(dstData, currentPos, startColor)) {
        y -= 1;
        currentPos -= state.canvasSize * 4;
      }
      currentPos += state.canvasSize * 4;
      let reachLeft = false;
      let reachRight = false;
      y -= 1;
      while (
        (y < state.canvasSize - 1)
        && staticMethods.matchStartColor(dstData, currentPos, startColor)
      ) {
        y += 1;
        staticMethods.colorPixel(dstData, currentPos, fillColor);
        if (x > 0) {
          if (staticMethods.matchStartColor(dstData, currentPos - 4, startColor)) {
            if (!reachLeft) {
              todo.push([x - 1, y]);
              reachLeft = true;
            }
          } else if (reachLeft) {
            reachLeft = false;
          }
        }
        if (x < state.canvasSize - 1) {
          if (staticMethods.matchStartColor(dstData, currentPos + 4, startColor)) {
            if (!reachRight) {
              todo.push([x + 1, y]);
              reachRight = true;
            }
          } else if (reachRight) {
            reachRight = false;
          }
        }
        currentPos += state.canvasSize * 4;
      }
    }
    state.mainCanvasCtx.putImageData(dstImg, 0, 0);
    this.image = state.mainCanvasCtx.getImageData(0, 0, state.canvasSize, state.canvasSize);
    state.frameObj.update(this.image);
  }
}
