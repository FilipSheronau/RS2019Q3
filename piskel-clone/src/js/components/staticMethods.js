import state from '../state';

export default class StaticMethods {
  static getCoords(data) {
    const box = state.mainCanvas.getBoundingClientRect();
    const result = {
      top: Math.floor((data.pageY - (box.top + window.pageYOffset))
       / (state.canvasStyleSize / state.canvasSize)),
      left: Math.floor((data.pageX - (box.left + window.pageXOffset))
       / (state.canvasStyleSize / state.canvasSize)),
    };
    document.querySelector('.coords').innerHTML = `${result.left + 1}x${result.top + 1}`;
    return result;
  }

  static colorToRgba(c) {
    let result;
    if (c[0] === '#') {
      const color = c.replace('#', '');
      const bigint = parseInt(color, 16);
      // eslint-disable-next-line no-bitwise
      const r = (bigint >> 16) & 255;
      // eslint-disable-next-line no-bitwise
      const g = (bigint >> 8) & 255;
      // eslint-disable-next-line no-bitwise
      const b = bigint & 255;
      result = {
        r,
        g,
        b,
        a: 255,
      };
    } else if (c.indexOf('rgba(') === 0) {
      const color = c.replace('rgba(', '').replace(' ', '').replace(')', '').split(',');
      result = {
        r: color[0],
        g: color[1],
        b: color[2],
        a: color[3] * 255,
      };
    } else {
      result = {
        r: 0,
        g: 0,
        b: 0,
        a: 0,
      };
    }
    return result;
  }

  static getPixelPos(x, y) {
    return (y * state.canvasSize + x) * 4;
  }

  static matchStartColor(data, pos, startColor) {
    return (data[pos] === startColor.r
      && data[pos + 1] === startColor.g
      && data[pos + 2] === startColor.b
      && data[pos + 3] === startColor.a);
  }

  static colorPixel(dat, pos, color) {
    const data = dat;
    data[pos] = color.r || 0;
    data[pos + 1] = color.g || 0;
    data[pos + 2] = color.b || 0;
    data[pos + 3] = Object.prototype.hasOwnProperty.call(color, 'a') ? color.a : 255;
  }

  static rgbToHex(data) {
    let r = data.r.toString(16);
    let g = data.g.toString(16);
    let b = data.b.toString(16);
    const { a } = data;
    let result;
    if (a === 0) {
      result = false;
    } else {
      if (r.length === 1) r = `0${r}`;
      if (g.length === 1) g = `0${g}`;
      if (b.length === 1) b = `0${b}`;
      result = `#${r}${g}${b}`;
    }
    return result;
  }
}
