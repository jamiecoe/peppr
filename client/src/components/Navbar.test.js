import React from 'react';
import { shallow } from 'enzyme';
import { Navbar } from './Navbar';

describe('Navbar', () => {
  const mockLogout = jest.fn();
  const props = { page: 'singleRecipe', logoutUser: mockLogout };
  let navbar = shallow(<Navbar {...props} />);

  it('renders properly', () => {
    expect(navbar).toMatchSnapshot();
  });

  it('uses props to set the class of <nav> element', () => {
    expect(navbar.find('nav').hasClass('navbar navbar-mobile-hidden')).toBe(
      true,
    );
  });

  describe('when a user wants to logout', () => {
    beforeEach(() =>
      navbar
        .find('Link')
        .last()
        .simulate('click'));
    it('calls this.props.logout() when logout Link clicked', () => {
      expect(mockLogout).toHaveBeenCalled();
    });
  });

  describe('when we are on the addRecipe page', () => {
    beforeEach(() => {
      props.page = 'addRecipe';
      navbar = shallow(<Navbar {...props} />);
    });

    it('should render properly', () => {
      expect(navbar).toMatchSnapshot();
    });
  });

  describe('when no `page` props has been provided', () => {
    beforeEach(() => {
      props.page = undefined;
      navbar = shallow(<Navbar {...props} />);
    });

    it('should render properly', () => {
      expect(navbar).toMatchSnapshot();
    });
  });
});
