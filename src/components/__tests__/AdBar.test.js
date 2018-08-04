import React from 'react';
import 'react-native'
import AdBar from '../AdBar';
import renderer from 'react-test-renderer';

test('renders without crashing', () => {
    const rendered = renderer.create(<AdBar />).toJSON();
    expect(rendered).toMatchSnapshot();
});