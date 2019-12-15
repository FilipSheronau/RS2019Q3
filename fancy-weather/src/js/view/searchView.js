import render from '../controllers/renderController';

export default function () {
  // .search
  render('div', 'header', {
    class: 'search',
  });

  // .search form
  render('form', '.search', {
    action: '#',
  });

  // .search form>div div
  render('div', '.search form', {
    class: 'dirty-label mdl-textfield mdl-js-textfield',
  });

  // .search form>div buttton
  render('button', '.search form>div', {
    class: 'voice-search mdl-button mdl-js-button mdl-button--icon',
  });

  // .search form>div button i
  render('i', '.search form>div button', {
    class: 'material-icons',
  }, 'keyboard_voice');

  // .search form>div div input
  render('input', '.search form>div', {
    class: 'mdl-textfield__input',
    type: 'text',
    id: 'search-inp',
  });

  // .search form>div div label
  render('label', '.search form>div', {
    class: 'mdl-textfield__label search-inp-cl',
    for: 'search-inp',
  });

  // .search form button
  render('button', '.search form', {
    id: 'search-button',
    class: 'mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-js-ripple-effect mdl-button--colored',
  });

  // .search .material-icons
  render('i', '#search-button', {
    class: 'material-icons is-active',
  }, 'search');

  // .search .anim-span
  render('span', '#search-button', {
    class: 'anim-span show-of',
  });

  // .search .material-icons
  render('i', '#search-button span', {
    class: 'material-icons is-active',
  }, 'autorenew');
}
