import React from 'react';
import { shallow } from 'enzyme';
import Banner from './MobileBanner';

describe('MobileBanner', () => {
  const props = { title: 'My recipes' };
  const banner = shallow(<Banner {...props} />);

  it('renders properly', () => {
    expect(banner).toMatchSnapshot();
  });

  it('displays the title from props', () => {
    expect(banner.find('.mobileBanner__title').text()).toEqual(props.title);
  });
});
