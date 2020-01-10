import state from '../state';
import saveAnimation from './animation/saveAnimation';
import saveState from './saveState';

export default function events() {
  window.onload = () => {
    saveState.load();
    state.mainCanvasObj.load();
    state.canvasSizeObj.load();
    state.toolObj.load();
    state.toolSizeObj.load();
    state.primaryColorObj.load();
    state.secondaryColorObj.load();
    state.frameObj.load();
    state.playerObj.load();
    state.playerControlObj.load();
    saveAnimation.load();
  };
  document.querySelector('.canvas-size').onclick = (event) => { state.canvasSizeObj.set(event.target); };
  document.querySelector('.tools').onclick = (event) => { state.toolObj.set(event.target); };
  document.querySelector('.tool-size').onclick = (event) => { state.toolSizeObj.set(event.target); };
  document.getElementById('primary').onchange = (event) => { state.primaryColorObj.set(event.target); };
  document.getElementById('secondary').onchange = (event) => { state.secondaryColorObj.set(event.target); };
  document.querySelector('.change-color').onclick = () => { state.primaryColorObj.change(); };
  document.querySelector('.frames').onclick = (event) => {
    if (event.target.closest('.add-frame')) state.frameObj.create();
    else if (event.target.closest('.del-frame')) state.frameObj.remove(event.target.closest('li'));
    else if (event.target.closest('.copy-frame')) state.frameObj.copy(event.target.closest('li'));
    else if (event.target.closest('li')) state.frameObj.select(event.target.closest('li'));
  };
  document.querySelector('.frames').onmousedown = (event) => { state.frameDragObj.drag(event); };
  document.querySelector('.frames').ondragstart = () => false;
  document.querySelector('.frames').onmousemove = (event) => { state.frameDragObj.sort(event); };
  document.getElementById('range-fps').change = (event) => { state.playerControlObj.set(event.target.value); };
  document.getElementById('range-fps').oninput = (event) => { state.playerControlObj.set(event.target.value); };
  document.querySelector('.animated-preview-container').onclick = (event) => { event.target.closest('canvas').requestFullscreen(); };
  document.querySelector('.file-name').oninput = (event) => { saveAnimation.setName(event.target); };
  document.querySelector('.save-container').onclick = (event) => { saveAnimation.save(event.target); };
  window.onbeforeunload = () => { saveState.save(); };
}
