import React from 'react';
import App, { sum } from './App';

// import renderer from 'react-test-renderer';

// it('renders without crashing', () => {
//   const rendered = renderer.create(<App />).toJSON();
//   expect(rendered).toBeTruthy();
// });

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
