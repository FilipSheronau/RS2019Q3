import state from '../state';
import func from './mainController';

export default function (data) {
  const isFar = state.isFahrenheit;
  const { temp } = data.list[0].main;
  const wind = data.list[0].wind.speed;

  state.todayWeather.temp = isFar ? func.round(func.celFar(temp)) : func.round(temp);

  const feelsLike = func.feeltemp(func.celFar(temp), wind);
  state.todayWeather.feelsLike = isFar ? func.round(feelsLike) : func.round(func.farCel(feelsLike));

  state.todayWeather.speedWind = wind;

  state.todayWeather.humidity = data.list[0].main.humidity;

  state.todayWeather.summary = data.list[0].weather[0].description;

  state.todayWeather.summaryEN = data.list[0].weather[0].description;

  state.todayWeather.icon = data.list[0].weather[0].icon;

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

  const day1Temp = data.list[day1].main.temp;
  const day2Temp = data.list[day2].main.temp;
  const day3Temp = data.list[day3].main.temp;

  state.day1.temp = isFar ? func.round(func.celFar(day1Temp)) : func.round(day1Temp);
  state.day2.temp = isFar ? func.round(func.celFar(day2Temp)) : func.round(day2Temp);
  state.day3.temp = isFar ? func.round(func.celFar(day3Temp)) : func.round(day3Temp);

  state.day1.icon = data.list[day1].weather[0].icon;
  state.day2.icon = data.list[day2].weather[0].icon;
  state.day3.icon = data.list[day3].weather[0].icon;

  console.log(state);
  console.log(data);
}
