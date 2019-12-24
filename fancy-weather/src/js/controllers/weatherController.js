import state from '../state';
import func from './genericController';
import storage from './storageController';

export default function (data) {
  if (storage.get('isFar')) state.isFahrenheit = storage.get('isFar');
  if (state.isFahrenheit === 'true') {
    state.isFahrenheit = true;
    document.querySelector('.mdl-switch').classList.add('is-checked');
    document.getElementById('switch-1').checked = true;
  } else {
    state.isFahrenheit = false;
    document.querySelector('.mdl-switch').classList.remove('is-checked');
    document.getElementById('switch-1').checked = false;
  }
  const isFar = state.isFahrenheit;
  const temp = func.round(data.list[0].main.temp);
  const wind = data.list[0].wind.speed;

  state.todayWeather.temp = isFar ? func.round(func.celFar(temp)) : func.round(temp);

  const feelsLike = func.feeltemp(func.celFar(temp), wind);
  state.todayWeather.feelsLike = isFar ? func.round(feelsLike) : func.round(func.farCel(feelsLike));

  state.todayWeather.speedWind = wind;

  state.todayWeather.humidity = data.list[0].main.humidity;

  state.todayWeather.summary = data.list[0].weather[0].description;

  state.todayWeather.summaryEN = data.list[0].weather[0].description;

  state.todayWeather.icon = data.list[0].weather[0].icon;

  state.timeZone = data.city.timezone;

  const startOtherDay = (24 - data.list[0].dt_txt.substr(-8, 2)) / 3;
  const midFunc = (x) => {
    let middleTemp = 0;
    if (x === 1) {
      middleTemp = startOtherDay + 4;
    } else if (x === 2) {
      middleTemp = startOtherDay + 4 + 8;
    } else if (x === 3) {
      middleTemp = startOtherDay + 4 + 16;
    }
    return middleTemp;
  };

  const day1 = midFunc(1);
  const day2 = midFunc(2);
  const day3 = midFunc(3);

  const day1Temp = func.round(data.list[day1].main.temp);
  const day2Temp = func.round(data.list[day2].main.temp);
  const day3Temp = func.round(data.list[day3].main.temp);

  state.day1.temp = isFar ? func.round(func.celFar(day1Temp)) : func.round(day1Temp);
  state.day2.temp = isFar ? func.round(func.celFar(day2Temp)) : func.round(day2Temp);
  state.day3.temp = isFar ? func.round(func.celFar(day3Temp)) : func.round(day3Temp);

  state.day1.icon = data.list[day1].weather[0].icon;
  state.day2.icon = data.list[day2].weather[0].icon;
  state.day3.icon = data.list[day3].weather[0].icon;
}
