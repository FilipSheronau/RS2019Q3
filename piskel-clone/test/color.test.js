import Color from '../src/js/components/color';
jest.mock('../src/js/components/color');

beforeEach(() => {
  Color.mockClear();
});

test('color', () => {  
  const color = new Color();
  expect(color.set('#ff00ff')).toBe(color.color);
});