import state from '../state';

export default {
  fullUpdate() {
    document.querySelector('.today h4').innerHTML = state.nameLocation;
    document.querySelector('.today h6').innerHTML = state.date;
    document.querySelector('.temp .span-temp').innerHTML = state.todayWeather.temp;
    document.querySelector('.temp .span-sign').innerHTML = '\u00B0';
  },

  farUpdate() {
    document.querySelector('.temp .span-temp').innerHTML = state.todayWeather.temp;
  },

  fetchWeatherToggle() {
    document.querySelector('#search-button>i').classList.toggle('show-of');
    document.querySelector('.anim-span').classList.toggle('show-of');
  },
};
