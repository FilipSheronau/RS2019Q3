import state from '../state';

export default {
  fullUpdate() {
    console.log(state);
    document.querySelector('.today h4').innerHTML = state.nameLocation;
    document.querySelector('.today h6').innerHTML = state.date;
    document.querySelector('.temp .span-temp').innerHTML = state.todayWeather.temp;
    document.querySelector('.temp .span-sign').innerHTML = '\u00B0';
    document.querySelector('.today-icon').setAttribute('src', `dist/img/${state.todayWeather.icon}@2x.png`);
    document.querySelector('.summary').innerHTML = state.todayWeather.summary;
    document.querySelector('.feelsLike').innerHTML = `${state.todayWeather.feelsLikeText}: ${state.todayWeather.feelsLike}\u00B0`;
    document.querySelector('.speedWind').innerHTML = `${state.todayWeather.speedWindText}: ${state.todayWeather.speedWind} ${state.todayWeather.speedWindText2}`;
    document.querySelector('.humidity').innerHTML = `${state.todayWeather.humidityText}: ${state.todayWeather.humidity}%`;
    document.querySelector('.search-inp-cl').innerHTML = state.searchCityInput;
    document.querySelector('.week-day1').innerHTML = state.day1.weekDay;
    document.querySelector('.week-day2').innerHTML = state.day2.weekDay;
    document.querySelector('.week-day3').innerHTML = state.day3.weekDay;
    document.querySelector('.day-icon1').setAttribute('src', `dist/img/${state.day1.icon}@2x.png`);
    document.querySelector('.day-icon2').setAttribute('src', `dist/img/${state.day2.icon}@2x.png`);
    document.querySelector('.day-icon3').setAttribute('src', `dist/img/${state.day3.icon}@2x.png`);
    document.querySelector('.day-temp1').innerHTML = `${state.day1.temp}\u00B0`;
    document.querySelector('.day-temp2').innerHTML = `${state.day2.temp}\u00B0`;
    document.querySelector('.day-temp3').innerHTML = `${state.day3.temp}\u00B0`;
  },

  farUpdate() {
    document.querySelector('.temp .span-temp').innerHTML = state.todayWeather.temp;
    document.querySelector('.feelsLike').innerHTML = `${state.todayWeather.feelsLikeText}: ${state.todayWeather.feelsLike}\u00B0`;
    document.querySelector('.day-temp1').innerHTML = `${state.day1.temp}\u00B0`;
    document.querySelector('.day-temp2').innerHTML = `${state.day2.temp}\u00B0`;
    document.querySelector('.day-temp3').innerHTML = `${state.day3.temp}\u00B0`;
  },

  langUpdate() {
    document.querySelector('.today h4').innerHTML = state.nameLocation;
    document.querySelector('.today h6').innerHTML = state.date;
    document.querySelector('.summary').innerHTML = state.todayWeather.summary;
    document.querySelector('.feelsLike').innerHTML = `${state.todayWeather.feelsLikeText}: ${state.todayWeather.feelsLike}\u00B0`;
    document.querySelector('.speedWind').innerHTML = `${state.todayWeather.speedWindText}: ${state.todayWeather.speedWind} ${state.todayWeather.speedWindText2}`;
    document.querySelector('.humidity').innerHTML = `${state.todayWeather.humidityText}: ${state.todayWeather.humidity}%`;
    document.querySelector('.search-inp-cl').innerHTML = state.searchCityInput;
    document.querySelector('.week-day1').innerHTML = state.day1.weekDay;
    document.querySelector('.week-day2').innerHTML = state.day2.weekDay;
    document.querySelector('.week-day3').innerHTML = state.day3.weekDay;
    document.querySelector('.day-icon1').setAttribute('src', `dist/img/${state.day1.icon}@2x.png`);
    document.querySelector('.day-icon2').setAttribute('src', `dist/img/${state.day2.icon}@2x.png`);
    document.querySelector('.day-icon3').setAttribute('src', `dist/img/${state.day3.icon}@2x.png`);
    document.querySelector('.day-temp1').innerHTML = `${state.day1.temp}\u00B0`;
    document.querySelector('.day-temp2').innerHTML = `${state.day2.temp}\u00B0`;
    document.querySelector('.day-temp3').innerHTML = `${state.day3.temp}\u00B0`;
  },

  fetchWeatherToggle() {
    document.querySelector('#search-button>i').classList.toggle('show-of');
    document.querySelector('.anim-span').classList.toggle('show-of');
  },
};
