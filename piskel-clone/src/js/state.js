const state = {
  canvasSize: 32,
  canvasStyleSize: 512,
  tool: 'pen',
  toolSize: 1,
  primaryColor: '#000000',
  secondaryColor: '#ffffff',
  mainCanvas: null,
  mainCanvasCtx: null,
  frames: [],
  fileName: null,
  // frameImages: [],
  activeFrame: null,
  playerFps: 24,
};

export { state as default };
