const state = {
  canvasSize: 32,
  canvasStyleSize: 512,
  tool: 'pen',
  toolSize: 1,
  primaryColor: '#004600',
  secondaryColor: '#ff56ff',
  mainCanvas: null,
  mainCanvasCtx: null,
  frames: [],
  frameImages: [],
  activeFrame: null,
  playerFps: 10,
};

export { state as default };
