/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { shallow } from 'enzyme';
import Page from '../index';

describe('Home page', () => {
  test.skip('should match snapshot', () => {
    const component = (
      <Page />
    );
    const wrapper = shallow(component);
    expect(wrapper).toMatchSnapshot();
  });
});
