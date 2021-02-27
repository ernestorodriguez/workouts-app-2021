import React from 'react';
import { shallow } from 'enzyme';
import TopBar from '../GalleryTopBar';

describe('TopBar component', () => {
  test('should match snapshot', () => {
    const config = {
      startDateChangeHandler() { },
      categoryChangeHandler() { },
      startDateSelector: {},
      availableCategories: [],
    };
    // eslint-disable-next-line react/jsx-props-no-spreading
    const wrapper = shallow(<TopBar {...config} />);
    expect(wrapper).toMatchSnapshot();
  });
});
