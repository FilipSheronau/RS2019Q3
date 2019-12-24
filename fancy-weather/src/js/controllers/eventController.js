import generic from './genericController';
import state from '../state';
import getLocation from '../api/getLocation';
import getWeather from '../api/getWeather';
import updateView from '../view/updateView';
import setLang from './langController';
import translate from './translateController';
import geoCod from '../api/geoCod';
import getImage from '../api/getImage';
import speechRecognitionEvent from './speechRecognitionController';
import storage from './storageController';

export default function () {
  async function chain(setPlaceSearch, isUpdate) {
    updateView.fetchWeatherToggleOn(setPlaceSearch);
    setLang(storage.get('lang'));
    await getLocation();
    await geoCod(setPlaceSearch);
    getWeather()
      .then(async () => {
        generic.getDate();
        getImage(isUpdate);
        await translate();
        updateView.fullUpdate();
      });
  }
  window.addEventListener('load', async () => {
    await chain(false, true);

    document.getElementById('switch-1').addEventListener('change', () => { generic.setFar(); });

    document.getElementById('langId').addEventListener('change', (event) => {
      setLang(event.target.value);
      generic.getDate();
      translate()
        .then(() => {
          updateView.langUpdate();
        });
    });

    document.getElementById('search-inp').addEventListener('change', () => {
      state.searchValue = document.getElementById('search-inp').value;
    });

    document.getElementById('search-inp').addEventListener('keydown', (event) => {
      if (event.code === 'Enter') {
        event.preventDefault();
        document.getElementById('search-inp').blur();
        chain(false, false);
      }
    });

    document.getElementById('search-button').addEventListener('click', (event) => {
      event.preventDefault();
      if (state.searchValue === '') {
        // eslint-disable-next-line no-alert
        alert(state.errors.emptyFieldSearch);
      } else {
        chain(false, false);
      }
    });

    document.getElementById('update-button').addEventListener('click', (event) => {
      event.preventDefault();
      chain(true, true);
    });

    document.getElementById('search-inp').addEventListener('focus', updateView.inpFocus);

    speechRecognitionEvent(chain);

    setInterval(() => { chain(true, false); }, 60000);
  });
}
