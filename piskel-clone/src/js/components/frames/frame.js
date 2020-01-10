import state from '../../state';
import saveState from '../saveState';

export default class Frame {
  constructor() {
    this.frame = document.getElementById('frame-el').content.firstElementChild;
    this.newFrameContainer = null;
    this.activeFrame = null;
    this.ctx = null;
  }

  load() {
    if (state.frames.length === 0 && !saveState.canvas) {
      this.create();
    } else {
      const arrPromise = [];
      saveState.canvas.forEach((value) => {
        const promise = new Promise((resolve) => {
          const img = new Image();
          img.src = value;
          img.onload = () => {
            state.frames.push(this.frame.cloneNode(true));
            const newFrameId = state.frames.length - 1;
            state.frames[newFrameId].setAttribute('id', `frame-${newFrameId}`);
            state.frames[newFrameId].dataset.id = newFrameId;
            state.frames[newFrameId].querySelector('canvas').setAttribute('width', state.canvasSize);
            state.frames[newFrameId].querySelector('canvas').setAttribute('height', state.canvasSize);
            state.frames[newFrameId].querySelector('.number-frame').innerHTML = newFrameId + 1;
            const ctx = state.frames[newFrameId].querySelector('canvas').getContext('2d');
            ctx.drawImage(img, 0, 0, state.canvasSize, state.canvasSize);
            resolve();
          };
        });
        arrPromise.push(promise);
      });
      Promise.all(arrPromise).then(() => {
        state.frames[state.activeFrame].classList.add('active');
        saveState.canvas = null;
        this.render();
        state.mainCanvasObj.update(state.frames[state.activeFrame].querySelector('canvas').getContext('2d').getImageData(0, 0, state.canvasSize, state.canvasSize));
      });
    }
  }

  create() {
    state.frames.push(this.frame.cloneNode(true));
    const newFrameId = state.frames.length - 1;
    state.frames.forEach((value) => {
      value.classList.remove('active');
    });
    state.frames[newFrameId].classList.add('active');
    state.frames[newFrameId].setAttribute('id', `frame-${newFrameId}`);
    state.frames[newFrameId].dataset.id = newFrameId;
    state.frames[newFrameId].querySelector('canvas').setAttribute('width', state.canvasSize);
    state.frames[newFrameId].querySelector('canvas').setAttribute('height', state.canvasSize);
    state.frames[newFrameId].querySelector('.number-frame').innerHTML = newFrameId + 1;
    this.render();
    state.activeFrame = newFrameId;
    state.mainCanvasObj.clear();
  }

  createNew() {
    state.frames.push(this.frame.cloneNode(true));
    const newFrameId = state.frames.length - 1;
    state.frames[newFrameId].setAttribute('id', `frame-${newFrameId}`);
    state.frames[newFrameId].dataset.id = newFrameId;
    state.frames[newFrameId].querySelector('canvas').setAttribute('width', state.canvasSize);
    state.frames[newFrameId].querySelector('canvas').setAttribute('height', state.canvasSize);
    state.frames[newFrameId].querySelector('.number-frame').innerHTML = newFrameId + 1;
  }

  update(data) {
    state.frames[state.activeFrame].querySelector('canvas').getContext('2d').putImageData(data, 0, 0);
    this.render();
  }

  refresh() {
    this.activeFrame = state.activeFrame;
    state.frames.forEach((value, index) => {
      if (state.frames[index].classList.contains('active')) state.frames[index].classList.remove('active');
      state.frames[index].setAttribute('id', `frame-${index}`);
      state.frames[index].dataset.id = index;
      state.frames[index].querySelector('.number-frame').innerHTML = index + 1;
    });
    state.frames[this.activeFrame].classList.add('active');
  }

  clear() {
    state.frames[state.activeFrame].querySelector('canvas').getContext('2d').clearRect(0, 0, state.canvasSize, state.canvasSize);
    this.render();
  }

  copy(data) {
    this.selectedId = Number(data.dataset.id);
    const newFrame = state.frames[this.selectedId];
    state.frames.splice(this.selectedId + 1, 0, newFrame.cloneNode(true));
    const newCtx = state.frames[this.selectedId].querySelector('canvas').getContext('2d').getImageData(0, 0, state.canvasSize, state.canvasSize);
    state.frames[this.selectedId + 1].querySelector('canvas').getContext('2d').putImageData(newCtx, 0, 0);
    state.activeFrame = this.selectedId + 1;
    this.refresh();
    this.render();
    state.mainCanvasObj.update(state.frames[state.activeFrame].querySelector('canvas').getContext('2d').getImageData(0, 0, state.canvasSize, state.canvasSize));
  }

  remove(data) {
    this.selectedId = Number(data.dataset.id);
    if (state.frames.length > 1) {
      state.frames.splice(this.selectedId, 1);
      if (state.activeFrame > this.selectedId) state.activeFrame -= 1;
      else if (state.activeFrame === this.selectedId) state.activeFrame = 0;
      this.refresh();
      this.render();
      state.mainCanvasObj.update(state.frames[state.activeFrame].querySelector('canvas').getContext('2d').getImageData(0, 0, state.canvasSize, state.canvasSize));
    }
  }

  render() {
    document.querySelector('.frame-list').remove();
    this.newFrameContainer = document.createElement('ul');
    this.newFrameContainer.classList.add('frame-list');
    this.newFrameContainer = document.querySelector('.frames').prepend(this.newFrameContainer);
    state.frames.forEach((value) => {
      document.querySelector('.frame-list').appendChild(value);
    });
  }

  clearFrameList() {
    state.frames = [];
    this.render();
    this.load();
  }

  select(data) {
    const selectedId = Number(data.dataset.id);
    this.ctx = state.frames[selectedId].querySelector('canvas').getContext('2d');
    const img = this.ctx.getImageData(0, 0, state.canvasSize, state.canvasSize);
    state.mainCanvasObj.update(img);
    state.frames.forEach((value) => {
      value.classList.remove('active');
    });
    state.frames[selectedId].classList.add('active');
    this.render();
    state.activeFrame = selectedId;
  }
}
