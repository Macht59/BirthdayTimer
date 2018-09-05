import React from 'react';
import Summary from '../summary';
import renderer from 'react-test-renderer';

test('Summary component renders correctly', () => {
    const birthDate = new Date(159159159);
    const rendered = renderer.create(<Summary birthDate={birthDate} />).toJSON();
    expect(rendered).toMatchSnapshot();
});