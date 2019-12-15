import Query from '../controllers/queryController';
import locationController from '../controllers/locationController';
import updateView from '../view/updateView';

export default async function () {
  try {
    const query = new Query('https://ipinfo.io/', { token: '80c45108f4ef46' });
    const response = await query.getData();
    if (!response) {
      throw response;
    }
    locationController(response);
  } catch (error) {
    updateView.fetchWeatherToggle();
    throw new Error(error);
  }
}
