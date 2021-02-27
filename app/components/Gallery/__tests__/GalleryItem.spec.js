import React from 'react';
import { shallow } from 'enzyme';
import GalleryItem from '../GalleryItem';

describe('GalleryItem component', () => {
  test('should match snapshot', () => {
    const props = {
      id: 1,
      name: 'workout-1',
      alias: 'alias-path',
      startDate: '2020-10-24',
      thumbnailMedium: 'http://google.com',
      category: 'c1',
    };

    // eslint-disable-next-line react/jsx-props-no-spreading
    const wrapper = shallow(<GalleryItem {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
