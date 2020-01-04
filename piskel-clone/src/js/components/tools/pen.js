import state from '../../state';

export default class Pen {
  constructor(canvas, methods) {
    this.canvas = canvas.canvas;
    this.ctx = canvas.ctx;
    this.methods = methods;
    this.image = null;
    this.permitDraw = false;
    this.firstPoint = {
      left: null,
      top: null,
    };
  }

  events() {
    this.canvas.onmouseover = (event) => { this.over(event); };
    this.canvas.onmouseout = (event) => { this.out(event); };
    this.canvas.onmousedown = (event) => { this.startDraw(event); };
    this.canvas.onmousemove = (event) => { this.draw(event); };
    this.canvas.onmouseup = (event) => { this.stopDraw(event); };
  }

  cursor() {
    this.canvas.classList.add('cur-pen');
    this.canvas.classList.remove('cur-stroke');
    this.canvas.classList.remove('cur-paint-bucket');
    this.canvas.classList.remove('cur-eraser');
    this.canvas.classList.remove('cur-color-picker');
  }

  over(data) {
    if (this.permitDraw !== true) {
      this.image = this.ctx.getImageData(0, 0, state.canvasSize, state.canvasSize);
      this.firstPoint.left = this.methods.getCoords(data).left;
      this.firstPoint.top = this.methods.getCoords(data).top;
      this.ctx.fillStyle = '#88888850';
      this.ctx.fillRect(
        this.firstPoint.left - Math.ceil(state.toolSize / 2),
        this.firstPoint.top - Math.ceil(state.toolSize / 2),
        state.toolSize,
        state.toolSize,
      );
    }
  }

  out() {
    if (this.permitDraw !== true) this.ctx.putImageData(this.image, 0, 0);
  }

  startDraw(data) {
    this.permitDraw = true;
    this.firstPoint.left = this.methods.getCoords(data).left;
    this.firstPoint.top = this.methods.getCoords(data).top;
    this.ctx.fillStyle = state.primaryColor;
    this.ctx.fillRect(
      this.firstPoint.left - Math.floor(state.toolSize / 2),
      this.firstPoint.top - Math.floor(state.toolSize / 2),
      state.toolSize,
      state.toolSize,
    );
    this.image = this.ctx.getImageData(0, 0, state.canvasSize, state.canvasSize);
  }

  stopDraw() {
    this.ctx.putImageData(this.image, 0, 0);
    this.permitDraw = false;
    this.firstPoint.left = null;
    this.firstPoint.top = null;
  }

  draw(data) {
    if (this.permitDraw === true) {
      let x1 = this.firstPoint.left;
      let y1 = this.firstPoint.top;
      const x2 = this.methods.getCoords(data).left;
      const y2 = this.methods.getCoords(data).top;
      this.firstPoint.left = this.methods.getCoords(data).left;
      this.firstPoint.top = this.methods.getCoords(data).top;
      const deltaX = Math.abs(x2 - x1);
      const deltaY = Math.abs(y2 - y1);
      const signX = x1 < x2 ? 1 : -1;
      const signY = y1 < y2 ? 1 : -1;
      let error = deltaX - deltaY;
      this.ctx.fillRect(
        x2 - Math.floor(state.toolSize / 2),
        y2 - Math.floor(state.toolSize / 2),
        state.stoolSize,
        state.toolSize,
      );
      while (x1 !== x2 || y1 !== y2) {
        this.ctx.fillRect(
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
      this.image = this.ctx.getImageData(0, 0, state.canvasSize, state.canvasSize);
    } else {
      this.ctx.putImageData(this.image, 0, 0);
      this.firstPoint.left = this.methods.getCoords(data).left;
      this.firstPoint.top = this.methods.getCoords(data).top;
      this.ctx.fillStyle = '#88888850';
      this.ctx.fillRect(
        this.firstPoint.left - Math.floor(state.toolSize / 2),
        this.firstPoint.top - Math.floor(state.toolSize / 2),
        state.toolSize,
        state.toolSize,
      );
    }
  }
}
