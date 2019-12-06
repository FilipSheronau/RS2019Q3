import Query from '../controllers/queryController';
import state from '../state';
import weatherController from '../controllers/weatherController';
import updateView from '../view/updateView';

export default async function getWeather() {
  let qVal;
  if (state.searchValue === '') {
    qVal = state.location;
  } else {
    qVal = state.searchValue;
  }

  try {
    updateView.fetchWeatherToggle();
    const query = new Query('https://api.openweathermap.org/data/2.5/forecast', {
      appid: 'f42e7440e7ff7ce0acb6e595cb833a13',
      q: qVal,
      lang: state.lang,
      units: state.units,
    });
    const response = await query.getData();
    if (!response) {
      throw response;
    }
    updateView.fetchWeatherToggle();
    weatherController(response);
  } catch (error) {
    const er = JSON.parse(error.message);
    updateView.fetchWeatherToggle();
    if (er.message === 'city not found') {
      alert('Город не найден!');
    }
    throw new Error(error.message);
  }
}
