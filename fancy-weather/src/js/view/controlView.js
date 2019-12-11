import render from '../controllers/renderController';

export default function () {
  // .control
  render('div', 'header', {
    class: 'control',
  });

  // .control #update-button
  render('button', '.control', {
    id: 'update-button',
    class: 'mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-js-ripple-effect mdl-button--colored',
  });

  // .control .material-icons
  render('i', '#update-button', {
    class: 'material-icons',
  }, 'autorenew');

  // .control #lang-batton
  render('div', '.control', {
    id: 'lang-batton',
    class: 'mdl-textfield mdl-js-textfield getmdl-select',
  });

  // .control #lang-batton input
  render('input', '#lang-batton', {
    type: 'text',
    class: 'mdl-textfield__input',
    id: 'langId',
    readonly: 'true',
  });

  // .control #lang-batton input(hidden)
  render('input', '#lang-batton', {
    type: 'hidden',
    id: 'langIdHid',
    name: 'langId',
  });

  // .control #lang-batton i
  render('i', '#lang-batton', {
    class: 'mdl-icon-toggle__label material-icons',
  }, 'keyboard_arrow_down');

  // .control #lang-batton label
  render('label', '#lang-batton', {
    for: 'langId',
    class: 'mdl-textfield__label',
  }, 'Country');

  // .control #lang-batton ul
  render('ul', '#lang-batton', {
    for: 'langId',
    class: 'mdl-menu mdl-menu--bottom-left mdl-js-menu',
  });

  // .control #lang-batton ul li
  render('li', '#lang-batton ul', {
    'data-selected': 'true',
    'data-val': 'EN',
    class: 'mdl-menu__item',
  }, 'EN');

  // .control #lang-batton ul li
  render('li', '#lang-batton ul', {
    'data-val': 'BY',
    class: 'mdl-menu__item',
  }, 'BY');

  // .control #lang-batton ul li
  render('li', '#lang-batton ul', {
    'data-val': 'RU',
    class: 'mdl-menu__item',
  }, 'RU');

  // .control #toggle-degrees
  render('div', '.control', {
    id: 'toggle-degrees',
  });

  // .control #toggle-degrees span
  render('span', '#toggle-degrees', {}, '\u00B0C ');

  // .control #toggle-degrees label
  render('label', '#toggle-degrees', {
    class: 'mdl-switch mdl-js-switch mdl-js-ripple-effect',
    for: 'switch-1',
  });

  // .control #toggle-degrees label input
  render('input', '#toggle-degrees label', {
    type: 'checkbox',
    id: 'switch-1',
    class: 'mdl-switch__input',
    // checked: '',
  });

  // .control #toggle-degrees label span
  render('span', '#toggle-degrees label', {
    type: 'checkbox',
    class: 'mdl-switch__label',
  });

  // .control #toggle-degrees span
  render('span', '#toggle-degrees', {}, '\u00B0F');
}
