import state from '../../state';
import staticMethods from '../staticMethods';

export default class PaintBucket {
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
    const startX = this.methods.getCoords(data).left;
    const startY = this.methods.getCoords(data).top;
    const fillColor = staticMethods.colorToRgba(state.primaryColor);
    const dstImg = this.ctx.getImageData(0, 0, state.canvasSize, state.canvasSize);
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
    this.ctx.putImageData(dstImg, 0, 0);
    this.image = this.ctx.getImageData(0, 0, state.canvasSize, state.canvasSize);
  }
}
