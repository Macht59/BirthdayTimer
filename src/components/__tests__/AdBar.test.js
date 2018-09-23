import React from 'react';
import AdBar from '../adBar.component';
import renderer from 'react-test-renderer';

test('AnBar component renders correctly', () => {
    const rendered = renderer.create(<AdBar />).toJSON();
    expect(rendered).toMatchSnapshot();
});