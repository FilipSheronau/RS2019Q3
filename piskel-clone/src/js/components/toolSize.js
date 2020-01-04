import state from '../state';

export default class ToolSize {
  constructor() {
    this.toolSize = null;
  }

  load() {
    this.toolSize = state.toolSize;
    document.querySelector(`.tool-size li[data-size='${this.toolSize}']`).classList.add('active');
  }

  set(data) {
    if (data.tagName === 'LI' || data.tagName === 'DIV') {
      const newEl = data.closest('li');
      const oldEl = document.querySelector('.tool-size li.active');
      if (newEl.getAttribute('data-size') !== oldEl.getAttribute('data-size')) {
        oldEl.classList.remove('active');
        newEl.classList.add('active');
        this.toolSize = newEl.getAttribute('data-size');
        state.toolSize = Number(this.toolSize);
      }
    }
  }
}
