import updateView from '../view/updateView';

export default function (data) {
  function randomInteger(max) {
    const maxValue = max > 500 ? 499 : max - 1;
    const rand = 0 + Math.random() * (maxValue + 1 - 0);
    return Math.floor(rand);
  }

  if (data && data.total === 1) {
    updateView.backgroundUpdate(data.hits[0].largeImageURL);
  } else if (data && data.total > 1) {
    updateView.backgroundUpdate(data.hits[randomInteger(data.total)].webformatURL);
  }
}
