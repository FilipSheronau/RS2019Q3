import Render from './render';

export default class CreateElement {
  start() {
    // .wrapper
    this.newEl('div', 'body', {
      class: 'wrapper',
    });

    // .control
    this.newEl('div', '.wrapper', {
      class: 'control',
    });

    // .control #update-button
    this.newEl('button', '.control', {
      id: 'update-button',
      class: 'mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-js-ripple-effect mdl-button--colored',
    });

    // .control .material-icons
    this.newEl('i', '#update-button', {
      class: 'material-icons',
    }, 'autorenew');

    // .control #lang-batton
    this.newEl('div', '.control', {
      id: 'lang-batton',
      class: 'mdl-textfield mdl-js-textfield getmdl-select',
    });

    // .control #lang-batton input
    this.newEl('input', '#lang-batton', {
      type: 'text',
      class: 'mdl-textfield__input',
      value: '',
      id: 'sample2',
      readonly: true,
    });

    // .control #lang-batton input(hidden)
    this.newEl('input', '#lang-batton', {
      type: 'hidden',
      value: '',
      name: 'sample2',
    });

    // .control #lang-batton i
    this.newEl('i', '#lang-batton', {
      class: 'mdl-icon-toggle__label material-icons',
    }, 'keyboard_arrow_down');

    // .control #lang-batton label
    this.newEl('label', '#lang-batton', {
      for: 'sample2',
      class: 'mdl-textfield__label',
    }, 'Country');

    // .control #lang-batton ul
    this.newEl('ul', '#lang-batton', {
      for: 'sample2',
      class: 'mdl-menu mdl-menu--bottom-left mdl-js-menu',
    });

    // .control #lang-batton ul li
    this.newEl('li', '#lang-batton ul', {
      'data-selected': 'true',
      'data-val': 'BY',
      class: 'mdl-menu__item',
    }, 'BY');

    // .control #lang-batton ul li
    this.newEl('li', '#lang-batton ul', {
      'data-val': 'RU',
      class: 'mdl-menu__item',
    }, 'RU');

    // .control #lang-batton ul li
    this.newEl('li', '#lang-batton ul', {
      'data-val': 'EN',
      class: 'mdl-menu__item',
    }, 'EN');

    // .control #toggle-degrees
    this.newEl('div', '.control', {
      id: 'toggle-degrees',
    });

    // .control #toggle-degrees span
    this.newEl('span', '#toggle-degrees', {}, '\u00B0C ');

    // .control #toggle-degrees label
    this.newEl('label', '#toggle-degrees', {
      class: 'mdl-switch mdl-js-switch mdl-js-ripple-effect" for="switch-1',
    });

    // .control #toggle-degrees label input
    this.newEl('input', '#toggle-degrees label', {
      type: 'checkbox',
      id: 'switch-1',
      class: 'mdl-switch__input',
      checked: true,
    });

    // .control #toggle-degrees label span
    this.newEl('span', '#toggle-degrees label', {
      type: 'checkbox',
      class: 'mdl-switch__label',
    });

    // .control #toggle-degrees span
    this.newEl('span', '#toggle-degrees', {}, '\u00B0C');

    this.newEl('div', '.wrapper', {
      class: 'today',
    });

    this.newEl('div', '.wrapper', {
      class: 'anydays',
    });

    this.newEl('div', '.wrapper', {
      class: 'geo',
    });
  }

  newEl(tag, path, atr, inner) {
    this.render = new Render(tag, path, atr, inner);
  }
}
