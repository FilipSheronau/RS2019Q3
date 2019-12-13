import getTranslate from '../api/getTranslate';
import state from '../state';

export default async function () {
  let language;
  if (state.lang === 'BY') {
    language = 'be';
  } else if (state.lang === 'EN') {
    language = 'en';
  } else if (state.lang === 'RU') {
    language = 'ru';
  }

  const trans = await getTranslate(
    `${state.nameLocation}`,
    language,
  );
  const [nameLocation] = trans.text;
  state.nameLocation = nameLocation;

  const trans2 = await getTranslate(
    `${state.date}`,
    language,
  );
  const [dateVal] = trans2.text;
  state.date = dateVal;

  const trans3 = await getTranslate(
    `${state.todayWeather.summaryEN}`,
    language,
  );

  const [summary] = trans3.text;
  state.todayWeather.summary = summary;
}
