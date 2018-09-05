import React from 'react';
import Settings from '../settings';
import renderer from 'react-test-renderer';

test('Settings component renders correctly', () => {
    const birthDate = new Date(151515);
    const rendered = renderer.create(<Settings birthDate={birthDate} />).toJSON();
    expect(rendered).toMatchSnapshot();
});