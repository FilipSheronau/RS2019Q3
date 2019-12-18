import updateView from '../view/updateView';
import state from '../state';

export default function (data) {
  function randomInteger(max) {
    const maxValue = max > 500 ? 499 : max - 1;
    const rand = 0 + Math.random() * (maxValue + 1 - 0);
    return Math.floor(rand);
  }

  function imageChange() {
    let backgroundNow = data.hits[randomInteger(data.total)].webformatURL;
    if (state.background && state.background !== 'dist/img/bg.gif') {
      while (backgroundNow.match(/(?<=get\/).{6}/)[0] === state.background.match(/(?<=get\/).{6}/)[0]) {
        backgroundNow = data.hits[randomInteger(data.total)].webformatURL;
      }
    }
    return backgroundNow;
  }

  if (data && data.total === 1) {
    state.background = data.hits[0].largeImageURL;
    updateView.backgroundUpdate(state.background);
  } else if (data && data.total > 1) {
    state.background = imageChange();
    updateView.backgroundUpdate(state.background);
  } else {
    state.background = 'dist/img/bg.gif';
    updateView.backgroundUpdate(state.background);
  }
}
