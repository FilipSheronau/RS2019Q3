import main from './mainController';
import state from '../state';
import getLocation from '../api/getLocation';
import getWeather from '../api/getWeather';
import updateView from '../view/updateView';
import setLang from './langController';

export default function () {
  async function chain() {
    setLang();
    await getLocation();
    await getWeather();
    updateView.fullUpdate();
  }
  window.addEventListener('load', async () => {
    await chain();
    document.getElementById('switch-1').addEventListener('change', () => { main.setFar(); });

    document.getElementById('langId').addEventListener('change', (event) => {
      setLang(event.target.value);
      updateView.langUpdate();
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
        alert(state.errors.emptyFieldSearch);
      } else {
        chain();
      }
    });
    // setInterval(chain, 60000);
  });
}
