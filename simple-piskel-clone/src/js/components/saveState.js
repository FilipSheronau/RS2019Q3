import state from '../state';

const saveState = {
  canvas: null,

  load() {
    if (localStorage.getItem('state')) {
      const savObj = JSON.parse(localStorage.getItem('state'));
      state.canvasSize = savObj.canvasSize;
      state.canvasStyleSize = savObj.canvasStyleSize;
      state.tool = savObj.tool;
      state.toolSize = savObj.toolSize;
      state.primaryColor = savObj.primaryColor;
      state.secondaryColor = savObj.secondaryColor;
      state.fileName = savObj.fileName;
      state.activeFrame = savObj.activeFrame;
      state.playerFps = savObj.playerFps;
    }
    if (localStorage.getItem('canvas')) this.canvas = localStorage.getItem('canvas');
    this.canvas = JSON.parse(this.canvas);
  },


  save() {
    if (localStorage.getItem('state')) localStorage.removeItem('state');
    const savObj = {
      canvasSize: state.canvasSize,
      canvasStyleSize: state.canvasStyleSize,
      tool: state.tool,
      toolSize: state.toolSize,
      primaryColor: state.primaryColor,
      secondaryColor: state.secondaryColor,
      fileName: state.fileName,
      activeFrame: state.activeFrame,
      playerFps: state.playerFps,
      frames: state.frames,
    };
    const canvasArray = state.frames.map((value) => value.querySelector('canvas').toDataURL('image/png'));
    localStorage.setItem('state', JSON.stringify(savObj));
    localStorage.setItem('canvas', JSON.stringify(canvasArray));
  },
};

export { saveState as default };
