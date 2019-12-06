import render from '../controllers/renderController';

export default function () {
  // main .content .main
  render('div', 'main', {
    class: 'geo',
  });
}
