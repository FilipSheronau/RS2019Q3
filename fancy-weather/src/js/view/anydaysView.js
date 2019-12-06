import render from '../controllers/renderController';

export default function () {
  // main .content .anydays
  render('div', '.content', {
    class: 'anydays',
  });
}
