import getLocation from './api/getLocation';
import getWeather from './api/getWeather';

export default function events() {
  window.addEventListener('load', async () => {
    await getLocation();
    await getWeather();
  });
}
