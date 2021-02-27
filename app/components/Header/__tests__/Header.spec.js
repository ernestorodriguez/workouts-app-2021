import React from 'react';
import { shallow } from 'enzyme';
import Header from '../index';

describe('Header component', () => {
  test('should match snapshot', () => {
    const component = (
      <Header />
    );
    const wrapper = shallow(component);
    expect(wrapper).toMatchSnapshot();
  });
});
