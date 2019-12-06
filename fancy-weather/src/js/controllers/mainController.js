import state from '../state';
import updateView from '../view/updateView';

export default {
  getDate() {
    const date = new Date();
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
      timezone: 'UTC',
      hour: 'numeric',
      minute: 'numeric',
    };
    state.date = date.toLocaleString(state.lang, options);
  },

  setFar() {
    if (document.getElementById('switch-1').checked) {
      state.isFahrenheit = true;
      state.todayWeather.temp = this.round(this.celFar(state.todayWeather.temp));
    } else {
      state.isFahrenheit = false;
      state.todayWeather.temp = this.round(this.farCel(state.todayWeather.temp));
    }
    updateView.farUpdate();
  },

  celFar(c) {
    return c * 1.8 + 32;
  },

  farCel(f) {
    return (f - 32) / 1.8;
  },

  feeltemp(temp, wind) {
    return 35.74 + 0.6215 * temp - 35.75 * wind * 0.16 + 0.4275 * temp * wind * 0.16;
  },

  round(x) {
    const result = Math.round(x);
    return result === 0 ? 0 : result;
  },
};
