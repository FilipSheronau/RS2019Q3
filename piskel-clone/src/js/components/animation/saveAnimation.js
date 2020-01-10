
import UPNG from 'upng-js';
import download from 'downloadjs';
import GIF from '../../scripts/gif';
import state from '../../state';

const saveAnimation = {
  load() {
    document.querySelector('.file-name').value = state.fileName;
  },

  setName(data) {
    state.fileName = data.value;
  },

  save(data) {
    const el = data.closest('li');
    if (el.className === 'gif-save') this.saveGif();
    if (el.className === 'apng-save') this.saveApng();
  },

  saveGif() {
    const gif = new GIF({
      workers: 2,
      quality: 10,
      width: state.canvasSize,
      height: state.canvasSize,
    });
    state.frames.forEach((value) => {
      gif.addFrame(value.querySelector('canvas'), { delay: 200 });
    });
    gif.on('finished', (blob) => {
      window.open(URL.createObjectURL(blob));
    });
    gif.render();
    const name = state.fileName || 'animation';
    download(gif, `${name}.gif`, 'image/gif');
  },

  saveApng() {
    const ImageData = state.frames.map((value) => {
      const canvas = value.querySelector('canvas').getContext('2d');
      return canvas.getImageData(0, 0, state.canvasSize, state.canvasSize).data.buffer;
    });
    const dels = new Array(state.frames.length);
    dels.fill(1000 / Number(state.playerFps));
    const apng = UPNG.encode(ImageData, state.canvasSize, state.canvasSize, 0, dels);
    const name = state.fileName || 'animation';
    download(apng, `${name}.apng`, 'image/apng');
  },
};

export { saveAnimation as default };
