import render from '../controllers/renderController';

export default function () {
  // main .content .main
  render('div', 'main', {
    class: 'geo',
  });

  // main .content .main
  render('img', '.geo', {
    src: '',
    class: 'geo-map',
  });

  // .lat
  render('div', '.geo', {
    class: 'lat',
  });

  // .lon
  render('div', '.geo', {
    class: 'lon',
  });
}
