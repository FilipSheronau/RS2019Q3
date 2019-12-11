import render from '../controllers/renderController';

export default function () {
  // main .content .today
  render('div', '.content', {
    class: 'today',
  });

  // main .content .today h4
  render('h4', '.today', {});

  // main .content .today h6
  render('h6', '.today', {});

  // main .content .content-center
  render('div', '.today', {
    class: 'content-center',
  });

  // main .content .content-center .temp
  render('div', '.content-center', {
    class: 'temp',
  });

  // main .content .content-center .temp span-temp
  render('span', '.temp', {
    class: 'span-temp',
  });

  // main .content .content-center .temp span-sign
  render('span', '.temp', {
    class: 'span-sign',
  });

  // main .content .content-center .info
  render('div', '.content-center', {
    class: 'info',
  });

  // .today-icon
  render('img', '.info', {
    class: 'today-icon',
  });

  // .summary
  render('span', '.info', {
    class: 'summary',
  });

  // .feelsLike
  render('span', '.info', {
    class: 'feelsLike',
  });

  // .speedWind
  render('span', '.info', {
    class: 'speedWind',
  });

  // .humidity
  render('span', '.info', {
    class: 'humidity',
  });
}
