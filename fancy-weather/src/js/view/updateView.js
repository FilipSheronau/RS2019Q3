import state from '../state';
import getMap from '../api/getMap';

export default {
  fullUpdate() {
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
    document.querySelector('.geo-map').setAttribute('src', getMap());
    document.querySelector('.lat').innerHTML = `${state.coordsLat}: ${state.coords.latFormat}`;
    document.querySelector('.lon').innerHTML = `${state.coordsLon}: ${state.coords.lonFormat}`;
    this.fetchWeatherToggleOf();
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
    document.querySelector('.lat').innerHTML = `${state.coordsLat}: ${state.coords.latFormat}`;
    document.querySelector('.lon').innerHTML = `${state.coordsLon}: ${state.coords.lonFormat}`;
  },

  backgroundUpdate(url) {
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundImage = `url('${url}')`;
  },

  fetchWeatherToggleOn(sw) {
    if (sw) {
      document.querySelector('#update-button>i').classList.add('show-of');
      document.querySelector('#update-button>.anim-span').classList.remove('show-of');
    } else {
      document.querySelector('#search-button>i').classList.add('show-of');
      document.querySelector('#search-button>.anim-span').classList.remove('show-of');
    }
  },

  fetchWeatherToggleOf() {
    document.querySelector('#update-button>i').classList.remove('show-of');
    document.querySelector('#update-button>.anim-span').classList.add('show-of');
    document.querySelector('#search-button>i').classList.remove('show-of');
    document.querySelector('#search-button>.anim-span').classList.add('show-of');
  },

  inpFocus() {
    document.getElementById('search-inp').value = '';
    document.querySelector('.dirty-label').classList.remove('is-dirty');
  },

  voiceSearchUpdate(data) {
    document.querySelector('.dirty-label').classList.add('is-dirty');
    document.getElementById('search-inp').value = data;
  },
};
