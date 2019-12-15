import Query from '../controllers/queryController';
import updateView from '../view/updateView';

export default async function (text, lang) {
  try {
    const query = new Query('https://translate.yandex.net/api/v1.5/tr.json/translate', {
      key: 'trnsl.1.1.20191211T175550Z.b0a51b33ea537302.14f461aa0f9ab0153808ab8d24ec469a7f6afa9f',
      text,
      lang,
    });
    const response = await query.getData();
    if (!response) {
      throw response;
    }
    return response;
  } catch (error) {
    updateView.fetchWeatherToggle();
    throw new Error(error);
  }
}
