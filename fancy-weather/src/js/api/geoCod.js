import Query from '../controllers/queryController';
import state from '../state';
import updateView from '../view/updateView';
import geoCodController from '../controllers/geoCodController';

export default async function (setPlaceSearch) {
  let qVal;
  if (setPlaceSearch) {
    qVal = state.nameLocationEn;
  } else if (state.searchValue === '') {
    qVal = state.location;
  } else {
    qVal = state.searchValue;
  }

  try {
    const query = new Query('https://geocode-maps.yandex.ru/1.x', {
      apikey: '111f9b76-d692-40aa-a3ac-a15b213f0adb',
      geocode: qVal,
      format: 'json',
    });
    const response = await query.getData();
    if (!response) {
      throw response;
    }
    geoCodController(response);
  } catch (error) {
    updateView.fetchWeatherToggle();
    throw new Error(error);
  }
}
