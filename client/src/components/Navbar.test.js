import React from 'react';
import { shallow } from 'enzyme';
import { Navbar } from './Navbar';

describe('Navbar', () => {
  const mockLogout = jest.fn();
  const props = { page: 'singleRecipe', logoutUser: mockLogout };
  const navbar = shallow(<Navbar {...props} />);

  it('renders properly', () => {
    expect(navbar).toMatchSnapshot();
  });

  it('uses props to set the class of <nav> element', () => {
    expect(navbar.find('nav').hasClass('navbar navbar-mobile-hidden'))
      .toBe(true);
  });

  describe('when a user wants to logout', () => {
    beforeEach(() => navbar.find('Link').last().simulate('click'));
    it('calls this.props.logout() when logout Link clicked', () => {
      expect(mockLogout).toHaveBeenCalled();
    });
  });
});
