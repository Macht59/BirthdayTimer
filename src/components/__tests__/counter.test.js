import React from 'react';
import Counter from '../counter.component';
import renderer from 'react-test-renderer';

test('Counter component renders correctly', () => {
    const birthDate = new Date(151515);
    const rendered = renderer.create(<Counter birthDate={birthDate} />).toJSON();
    expect(rendered).toMatchSnapshot();
});