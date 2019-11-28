export default class Render {
  constructor(tag, path, atr, inner) {
    this.tag = tag;
    this.path = path;
    this.atr = atr;
    this.inner = inner;
    this.start = this.add();
  }

  add() {
    const elem = document.createElement(this.tag);
    Object.entries(this.atr).forEach(([key, val]) => {
      elem.setAttribute(key, val);
    });
    if (this.inner != null) elem.innerHTML = this.inner;
    document.querySelector(`${this.path}`).append(elem);
  }
}
