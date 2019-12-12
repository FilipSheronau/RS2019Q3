import state from '../state';
import updateView from '../view/updateView';
import lang from '../lang';

export default {
  getDate() {
    const date = new Date();
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'short',
      timezone: 'UTC',
      hour: 'numeric',
      minute: 'numeric',
    };
    state.date = date.toLocaleString('RU', options);

    const otherDate = new Date();
    otherDate.setDate(otherDate.getDate() + 1);
    const day1 = otherDate.getDay();
    state.day1.weekDay = this.weekDayMethod(day1);

    otherDate.setDate(otherDate.getDate() + 1);
    const day2 = otherDate.getDay();
    state.day2.weekDay = this.weekDayMethod(day2);

    otherDate.setDate(otherDate.getDate() + 1);
    const day3 = otherDate.getDay();
    state.day3.weekDay = this.weekDayMethod(day3);
  },

  setFar() {
    if (document.getElementById('switch-1').checked) {
      state.isFahrenheit = true;
      state.todayWeather.temp = this.round(this.celFar(state.todayWeather.temp));
      state.todayWeather.feelsLike = this.round(this.celFar(state.todayWeather.feelsLike));
      state.day1.temp = this.round(this.celFar(state.day1.temp));
      state.day2.temp = this.round(this.celFar(state.day2.temp));
      state.day3.temp = this.round(this.celFar(state.day3.temp));
    } else {
      state.isFahrenheit = false;
      state.todayWeather.temp = this.round(this.farCel(state.todayWeather.temp));
      state.todayWeather.feelsLike = this.round(this.farCel(state.todayWeather.feelsLike));
      state.day1.temp = this.round(this.farCel(state.day1.temp));
      state.day2.temp = this.round(this.farCel(state.day2.temp));
      state.day3.temp = this.round(this.farCel(state.day3.temp));
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

  weekDayMethod(x) {
    return lang.weekkdays[x][state.lang];
  },
};
