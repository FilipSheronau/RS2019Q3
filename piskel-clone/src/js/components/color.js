import state from '../state';

export default class Color {
  constructor(cl) {
    this.name = cl;
    this.nameColor = `${cl}Color`;
    this.color = null;
  }

  load() {
    this.color = state[this.nameColor];
    document.getElementById(this.name).value = this.color;
    document.querySelector(`.${this.name}`).style.backgroundColor = this.color;
  }

  set(data) {
    document.querySelector(`.${this.name}`).style.backgroundColor = data.value;
    this.color = data.value;
    state[this.nameColor] = this.color;
  }

  setColor(color) {
    document.querySelector(`.${this.name}`).style.backgroundColor = color;
    document.getElementById(this.name).value = color;
    this.color = color;
    state[this.nameColor] = this.color;
  }

  change() {
    const anotherColor = state.secondaryColorObj;
    const tempColor = this.color;
    state[this.nameColor] = state[anotherColor.nameColor];
    state[anotherColor.nameColor] = tempColor;
    this.color = state[this.nameColor];
    document.getElementById(this.name).value = this.color;
    document.querySelector(`.${this.name}`).style.backgroundColor = this.color;
    anotherColor.load();
  }
}
