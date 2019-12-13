import main from './mainController';
import state from '../state';
import getLocation from '../api/getLocation';
import getWeather from '../api/getWeather';
import updateView from '../view/updateView';
import setLang from './langController';
import translate from './translateController';
import geoCod from '../api/geoCod';

export default function () {
  async function chain() {
    setLang();
    await getLocation();
    await geoCod();
    await getWeather();
    await translate();
    updateView.fullUpdate();
  }
  window.addEventListener('load', async () => {
    await chain();

    document.getElementById('switch-1').addEventListener('change', () => { main.setFar(); });

    document.getElementById('langId').addEventListener('change', (event) => {
      setLang(event.target.value);
      translate()
        .then(() => { updateView.langUpdate(); });
    });

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
        // eslint-disable-next-line no-alert
        alert(state.errors.emptyFieldSearch);
      } else {
        chain();
      }
    });
    // setInterval(chain, 60000);
  });
}
