import Query from '../query';
import state from '../state';

export default async function getWeather() {
  let { searchValue } = state;
  if (searchValue === '') searchValue = state.location;
  const query = new Query('https://api.openweathermap.org/data/2.5/forecast', {
    appid: 'f42e7440e7ff7ce0acb6e595cb833a13',
    q: searchValue,
    lang: 'ru',
    units: state.units,
  });
  const result = await query.getData();
  console.log(result);
}
