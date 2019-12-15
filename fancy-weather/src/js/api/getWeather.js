import Query from '../controllers/queryController';
import state from '../state';
import weatherController from '../controllers/weatherController';
import updateView from '../view/updateView';

export default async function () {
  try {
    const query = new Query('https://api.openweathermap.org/data/2.5/forecast', {
      appid: 'f42e7440e7ff7ce0acb6e595cb833a13',
      lat: state.coords.lat,
      lon: state.coords.lon,
      lang: 'EN',
      units: state.units,
    });
    const response = await query.getData();
    if (!response) {
      throw response;
    }
    weatherController(response);
  } catch (error) {
    updateView.fetchWeatherToggle();
    throw new Error(error.message);
  }
}
