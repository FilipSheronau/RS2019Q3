import state from '../../state';

export default class FrameDrag {
  constructor() {
    this.el = null;
    this.coords = null;
    this.shiftX = null;
    this.shiftY = null;
    this.isDrag = false;
    this.tempEl = null;
    this.liCollection = null;
    this.dragEl = null;
  }

  drag(e) {
    if (e.target.closest('.drag-frame')) {
      this.isDrag = true;
      this.el = e.target.closest('li');
      this.createTempEl();
      this.dragEl = this.el.dataset.id;
      document.querySelector(`.frame[data-id="${this.dragEl}"]`).after(this.tempEl);
      this.isDrag = true;
      this.parrentMargin = this.getCoords(document.querySelector('.frame-list')).top;
      this.coords = this.getCoords(this.el);
      this.shiftX = e.pageX - this.coords.left;
      this.shiftY = e.pageY - this.coords.top;
      this.el.style.position = 'absolute';
      document.querySelector('.frame-list').appendChild(this.el);
      this.moveAt(e);
      this.el.style.zIndex = 1000;
      document.onmousemove = (event) => {
        this.moveAt(event);
      };
      document.onmouseup = () => {
        this.isDrag = false;
        document.onmousemove = null;
        document.onmouseup = null;
        this.update();
      };
    }
  }

  moveAt(e) {
    this.el.style.top = `${e.pageY - this.shiftY - this.parrentMargin}px`;
  }

  getCoords(elem) {
    this.box = elem.getBoundingClientRect();
    const yOffset = window.pageYOffset;
    const xOffset = window.pageXOffset;
    return {
      top: this.box.top + yOffset,
      left: this.box.left + xOffset,
    };
  }

  sort(event) {
    if (this.isDrag === true) {
      this.el.hidden = true;
      let overEl = document.elementFromPoint(event.clientX, event.clientY);
      this.el.hidden = false;
      if (!overEl.closest('.frame')) return;
      overEl = overEl.closest('.frame');
      overEl = overEl.dataset.id;
      this.createTempEl();
      const prevEl = document.querySelector(`.frame[data-id="${overEl}"]`);
      if (overEl < this.indOfEl()) {
        if (!document.querySelector('.temp-li')) {
          prevEl.before(this.tempEl);
        } else {
          document.querySelector('.temp-li').remove();
          prevEl.before(this.tempEl);
        }
      } else if (overEl >= this.indOfEl()) {
        if (!document.querySelector('.temp-li')) {
          prevEl.after(this.tempEl);
        } else {
          document.querySelector('.temp-li').remove();
          prevEl.after(this.tempEl);
        }
      }
    }
  }

  createTempEl() {
    this.tempEl = document.createElement('li');
    this.tempEl.style.width = '102px';
    this.tempEl.style.height = '102px';
    this.tempEl.style.background = 'none';
    this.tempEl.style.borderStyle = 'dashed';
    this.tempEl.style.borderColor = '#ffd700';
    this.tempEl.classList.add('temp-li');
  }

  indOfEl() {
    this.liCollection = document.querySelectorAll('.frame-list li');
    const collection = Array.from(this.liCollection);
    return collection.findIndex((value) => value.classList.contains('temp-li'));
  }

  update() {
    const firstEl = this.indOfEl();
    const secondEl = state.frames.findIndex((value) => value.dataset.id === this.dragEl);
    const changeEl = state.frames[secondEl];
    state.frames.splice(secondEl, 1);
    state.frames.splice(firstEl, 0, changeEl);
    this.el.style.position = 'relative';
    this.el.style.top = '0';
    state.activeFrame = firstEl;
    state.frames[firstEl].classList.add('active');
    state.mainCanvasObj.update(state.frames[state.activeFrame].querySelector('canvas').getContext('2d').getImageData(0, 0, state.canvasSize, state.canvasSize));
    state.frameObj.refresh();
    state.frameObj.render();
  }
}
