export default function events(mainCanvas, canvasSize, tool, toolSize,
  primaryColor, secondaryColor, staticMethods) {
  window.onload = () => {
    mainCanvas.load();
    canvasSize.load(mainCanvas);
    staticMethods.load(mainCanvas);
    tool.load(mainCanvas, staticMethods, primaryColor);
    toolSize.load();
    primaryColor.load(mainCanvas);
    secondaryColor.load(mainCanvas);
  };
  document.querySelector('.canvas-size').onclick = (event) => { canvasSize.set(event.target); };
  document.querySelector('.tools').onclick = (event) => { tool.set(event.target); };
  document.querySelector('.tool-size').onclick = (event) => { toolSize.set(event.target); };
  document.getElementById('primary').onchange = (event) => { primaryColor.set(event.target); };
  document.getElementById('secondary').onchange = (event) => { secondaryColor.set(event.target); };
  document.querySelector('.change-color').onclick = () => { primaryColor.change(secondaryColor); };
}
