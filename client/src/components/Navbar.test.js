import React from 'react';
import { shallow } from 'enzyme';
import { Navbar } from './Navbar';

describe('Navbar', () => {
  const props = { page: 'singleRecipe' };
  const navbar = shallow(<Navbar {...props} />);
  console.log(navbar.find('Link').last());

  it('renders properly', () => {
    expect(navbar).toMatchSnapshot();
  });

  it('uses props to set the class of <nav> element', () => {
    expect(navbar.find('nav').hasClass('navbar navbar-mobile-hidden'))
      .toBe(true);
  });
});
