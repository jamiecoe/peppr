import React from 'react';
import { shallow } from 'enzyme';
import { App } from './App';

describe('App', () => {
  const mockGetUser = jest.fn();

  const props = {
    getUser: mockGetUser,
    auth: true,
  };

  let app = shallow(<App {...props} />, {
    disableLifecycleMethods: false,
  });

  it('should render properly, as an authenticated user', () => {
    expect(app).toMatchSnapshot();
  });

  it('should call getUser() in componentDidMount', () => {
    expect(mockGetUser).toHaveBeenCalled();
  });

  describe('when the user is not authenticated', () => {
    beforeEach(() => {
      props.auth = false;
      app = shallow(<App {...props} />);
    });

    it('should render properly, as an unauthenicated user', () => {
      expect(app).toMatchSnapshot();
    });
  });

  describe('when the getUser() has not returned, and props.auth is null', () => {
    beforeEach(() => {
      props.auth = null;
      app = shallow(<App {...props} />);
    });

    it('should render properly', () => {
      expect(app).toMatchSnapshot();
    });
  });
});
