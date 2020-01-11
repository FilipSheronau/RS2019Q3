
import UPNG from 'upng-js';
import download from 'downloadjs';
import state from '../../state';

const saveAnimation = {
  load() {
    document.querySelector('.file-name').value = state.fileName;
  },
  setName(data) {
    state.fileName = data.value;
  },
  saveImg(data) {
    const el = data.closest('li');
    if (el.className === 'gif-save') this.saveGif();
    if (el.className === 'apng-save') this.saveApng();
  },
  saveGif() {
    // eslint-disable-next-line no-undef
    const gif = new GIF({
      workers: 2,
      quality: 1,
      workerScript: 'dist/js/gif.worker.js',
      width: state.canvasSize,
      height: state.canvasSize,
    });

    state.frames.forEach((value) => {
      const ctx = value.querySelector('canvas').getContext('2d');
      gif.addFrame(ctx, { copy: true, delay: 1000 / Number(state.playerFps) });
    });

    const name = state.fileName || 'animation';

    gif.on('finished', (blob) => {
      download(blob, `${name}.gif`, 'image/gif');
    });

    gif.render();
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
