import CanvasSize from './components/canvasSize';
import Tool from './components/tool';
import ToolSize from './components/toolSize';
import Color from './components/color';
import Canvas from './components/canvas';
import event from './components/events';
import StaticMethods from './components/staticMethods';

const mainCanvas = new Canvas(document.querySelector('.main-canvas-container'), 'main-canvas');
const tool = new Tool();
const toolSize = new ToolSize();
const primaryColor = new Color('primary');
const secondaryColor = new Color('secondary');
const canvasSize = new CanvasSize();
const staticMethods = new StaticMethods();
event(mainCanvas, canvasSize, tool, toolSize, primaryColor, secondaryColor, staticMethods);
