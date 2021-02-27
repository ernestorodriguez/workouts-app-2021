import React from 'react';
import { shallow } from 'enzyme';
import Gallery from '../index';

describe('Gallery component', () => {
  test.skip('should match snapshot', () => {
    const workouts = [];

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 20; i++) {
      workouts.push({
        id: i,
        name: `workout-${i}`,
        alias: 'alias-path',
        startDate: '2020-10-24',
        thumbnailMedium: 'http://google.com',
        category: 'c1',
      });
    }
    const wrapper = shallow(
      <Gallery
        selectedCategories={[]}
        availableCategories={[]}
        startDateSelector={{}}
        startDate="2020-07"
        workouts={workouts}
        page={1}
        getPage={() => {}}
        totalWorkOuts={100}
        totalPages={5}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
