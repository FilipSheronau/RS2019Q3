import Query from '../controllers/queryController';
import state from '../state';
import imageController from '../controllers/imageController';
import updateView from '../view/updateView';

export default async function (isUpdate) {
  if (isUpdate) {
    try {
      const query = new Query('https://pixabay.com/api/', {
        key: '14625482-0fa633f26c0a30d54ae9fe6b9',
        q: `${state.season} ${state.hours} ${state.todayWeather.summaryEN}`,
        orientation: 'horizontal',
        per_page: '200',
      });
      const response = await query.getData();
      if (!response) {
        throw response;
      }
      imageController(response);
    } catch (error) {
      updateView.fetchWeatherToggle();
      throw new Error(error.message);
    }
  }
}
