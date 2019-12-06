import Query from '../controllers/queryController';
import locationController from '../controllers/locationController';
import updateView from '../view/updateView';

export default async function getLocation() {
  try {
    updateView.fetchWeatherToggle();
    const query = new Query('https://ipinfo.io/', { token: '80c45108f4ef46' });
    const response = await query.getData();
    if (!response) {
      throw response;
    }
    updateView.fetchWeatherToggle();
    locationController(response);
  } catch (error) {
    updateView.fetchWeatherToggle();
    throw new Error(error);
  }
}
