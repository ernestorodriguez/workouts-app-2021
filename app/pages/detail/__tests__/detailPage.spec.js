/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { shallow } from 'enzyme';
import reactRouter from 'react-router';
import Page from '../index';

jest.mock('react-router');

describe('Detail page', () => {
  test('should match snapshot', () => {
    global.location = '/';
    reactRouter.useParams.mockResolvedValue({ alias: 'ALIAS MOCK' });
    const component = (
      <Page />
    );
    const wrapper = shallow(component);
    expect(wrapper).toMatchSnapshot();
  });
});
