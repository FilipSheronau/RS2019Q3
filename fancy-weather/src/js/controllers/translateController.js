import getTranslate from '../api/getTranslate';
import state from '../state';

export default function () {
  let language;
  if (state.lang === 'BY') {
    language = 'be';
  } else if (state.lang === 'EN') {
    language = 'en';
  } else if (state.lang === 'RU') {
    language = 'ru';
  }

  return Promise.all([
    (async () => {
      const trans = await getTranslate(state.nameLocation, language);
      const [nameLocation] = trans.text;
      state.nameLocation = nameLocation;
    })(),
    (async () => {
      const trans2 = await getTranslate(state.date, language);
      const [dateVal] = trans2.text;
      state.date = dateVal;
    })(),
    (async () => {
      const trans3 = await getTranslate(state.todayWeather.summaryEN, language);
      const [summary] = trans3.text;
      state.todayWeather.summary = summary;
    })(),
  ]);
}
