import render from '../controllers/renderController';

export default function () {
  // .wrapper
  render('div', 'body', {
    class: 'wrapper',
  });

  // header
  render('header', '.wrapper', {});

  // main
  render('main', '.wrapper', {});

  // main .content
  render('div', 'main', {
    class: 'content',
  });
}
