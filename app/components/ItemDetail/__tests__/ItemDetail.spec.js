/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { shallow } from 'enzyme';
import ItemDetail from '../index';

jest.spyOn(React, 'useEffect').mockImplementation((f) => f());

describe('ItemDetail component', () => {
  test.skip('should match snapshot', () => {
    const itemDetail = {
      name: 'NAME',
      startDate: '2020-10',
      category: 'c1',
      description: 'DESCRIPTION',
    };
    const component = (
      <ItemDetail itemDetail={itemDetail} alias="alias-path" getData={() => {}} />
    );
    const wrapper = shallow(component);
    expect(wrapper).toMatchSnapshot();
  });
});
