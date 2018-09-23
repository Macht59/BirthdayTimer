import React from 'react';
import Settings from '../settings.component';
import renderer from 'react-test-renderer';

test('Settings component renders correctly', () => {
    const birthDate = new Date(151515);
    const maximumAllowedDate = new Date(55555555);
    const rendered = renderer.create(<Settings birthDate={birthDate} maximumAllowedDate={maximumAllowedDate}/>).toJSON();
    expect(rendered).toMatchSnapshot();
});