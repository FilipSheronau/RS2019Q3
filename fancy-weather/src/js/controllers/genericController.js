import state from '../state';
import updateView from '../view/updateView';
import lang from '../lang';
import storage from './storageController';

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

    state.season = this.getSeason(date);

    state.hours = this.getH(date);
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
    storage.set('isFar', state.isFahrenheit);
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

  getSeason(date) {
    let result;
    const d = date.getMonth();
    if (d < 2 || d === 11) {
      result = 'winter';
    } else if (d < 5) {
      result = 'spring';
    } else if (d < 8) {
      result = 'summer';
    } else if (d < 11) {
      result = 'autumn';
    }
    return result;
  },

  getH(date) {
    let result;
    const h = date.getHours();
    if (h > 0 && h < 4) {
      result = 'night';
    } else if (h > 3 && h < 12) {
      result = 'morning';
    } else if (h > 11 && h < 17) {
      result = 'day';
    } else if (h > 16) {
      result = 'evening';
    }
    return result;
  },

  ddToDms(latV, lngV) {
    let lat = latV;
    let lng = lngV;
    lat = parseFloat(lat);
    lng = parseFloat(lng);
    let latResult = (lat >= 0) ? 'N' : 'S';
    latResult += this.getDms(lat);
    let lngResult = (lng >= 0) ? 'E' : 'W';
    lngResult += this.getDms(lng);
    const dmsResult = [latResult, lngResult];
    return dmsResult;
  },

  getDms(v) {
    let result;
    const val = Math.abs(v);
    const valDeg = Math.floor(val);
    result = `${valDeg}º`;
    const valMin = Math.floor((val - valDeg) * 60);
    result += `${valMin}'`;
    return result;
  },
};
