import PlayerControlTool from '../src/js/components/animation/playerControl';
import state from '../src/js/state';
jest.mock('../src/js/components/animation/playerControl');

beforeEach(() => {
  PlayerControlTool.mockClear();
});

test('playerControlTool.set()', () => {
  const playerControlTool = new PlayerControlTool();
  expect(playerControlTool.set('28')).toBe(playerControlTool.playerFps);
});