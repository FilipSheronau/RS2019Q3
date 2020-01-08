
import state from '../../state';

export default class Fps {
  constructor() {
    this.playerFps = null;
  }

  load() {
    this.playerFps = state.playerFps;
    document.querySelector('.display-fps span').innerHTML = this.playerFps;
  }

  set(fps) {
    this.playerFps = fps;
    state.playerFps = this.playerFps;
    document.querySelector('.display-fps span').innerHTML = this.playerFps;
    document.getElementById('range-fps').setAttribute = this.playerFps;
  }
}
