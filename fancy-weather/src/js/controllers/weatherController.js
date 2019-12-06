import state from '../state';
import countryNames from '../../json/names.json';
import func from './mainController';

export default function (data) {
  const country = countryNames[data.city.country];
  const isFar = state.isFahrenheit;
  const { temp } = data.list[0].main;
  const wind = data.list[0].wind.speed;

  state.todayWeather.temp = isFar ? func.round(func.celFar(temp)) : func.round(temp);

  const feelsLike = func.feeltemp(func.celFar(temp), wind);
  state.todayWeather.feelsLike = isFar ? func.round(feelsLike) : func.round(func.farCel(feelsLike));

  state.todayWeather.speedWind = wind;

  state.city = data.city.name;
  state.country = country;
  state.nameLocation = `${state.city}, ${country}`;

  state.coords = data.city.coord;

  state.todayWeather.humidity = data.list[0].main.humidity;

  state.todayWeather.summary = data.list[0].weather[0].description;

  state.todayWeather.icon = data.list[0].weather[0].icon;

  console.log(state);
  console.log(data);
}
