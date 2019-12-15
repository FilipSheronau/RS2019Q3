import state from '../state';
import lang from '../lang';
import main from './genericController';

export default function (data) {
  if (data) state.lang = data;
  document.getElementById('langId').setAttribute('value', state.lang);
  const langLi = document.querySelectorAll('#lang-batton li');
  langLi.forEach((elem) => {
    elem.removeAttribute('data-selected');
    if (elem.getAttribute('data-val') === state.lang) elem.setAttribute('data-selected', 'true');
  });
  state.todayWeather.feelsLikeText = lang.feelsLikeText[state.lang];
  state.todayWeather.humidityText = lang.humidityText[state.lang];
  state.todayWeather.speedWindText = lang.speedWindText[state.lang];
  state.todayWeather.speedWindText2 = lang.speedWindText2[state.lang];
  state.searchCityInput = lang.searchCityInput[state.lang];
  state.errors.emptyFieldSearch = lang.errors.emptyFieldSearch[state.lang];
  state.coordsLat = lang.coordsLat[state.lang];
  state.coordsLon = lang.coordsLon[state.lang];
  main.getDate();
}
