import main from './mainController';
import state from '../state';
import getLocation from '../api/getLocation';
import getWeather from '../api/getWeather';
import updateView from '../view/updateView';

export default function () {
  async function chain() {
    main.getDate();
    await getLocation();
    await getWeather();
    updateView.fullUpdate();
  }
  window.addEventListener('load', () => {
    chain();
    // setInterval(chain, 60000);
  });

  document.getElementById('switch-1').addEventListener('change', () => { main.setFar(); });
  document.getElementById('search-inp').addEventListener('change', () => {
    state.searchValue = document.getElementById('search-inp').value;
  });

  document.getElementById('search-inp').addEventListener('keydown', (event) => {
    if (event.code === 'Enter') {
      event.preventDefault();
      document.getElementById('search-inp').blur();
      chain();
    }
  });

  document.getElementById('search-button').addEventListener('click', (event) => {
    event.preventDefault();
    if (state.searchValue === '') {
      alert('Заполните поле для поиска');
    } else {
      chain();
    }
  });
}
