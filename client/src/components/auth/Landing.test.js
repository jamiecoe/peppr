import React from 'react';
import { shallow } from 'enzyme';
import { Landing } from './Landing';

describe('Landing', () => {
  const mockResetError = jest.fn();
  const props = {
    resetError: mockResetError,
    match: {
      path: '/',
    },
  };
  let landing = shallow(<Landing {...props} />, {
    disableLifecycleMethods: false,
  });

  it('should render properly, with <SignIn> component', () => {
    expect(landing).toMatchSnapshot();
    expect(landing.find('ReduxForm[name="SignIn"]').exists()).toBe(true);
    expect(landing.find('ReduxForm[name="SignUp"]').exists()).toBe(false);
  });

  it('should call `resetError` on componentDidMount()', () => {
    expect(mockResetError).toHaveBeenCalled();
  });

  describe('when props.match.path does not equal "/"', () => {
    beforeEach(() => {
      props.match.path = '/test';
      landing = shallow(<Landing {...props} />);
    });

    it('should render properly, with <SignOut> component', () => {
      expect(landing).toMatchSnapshot();
      expect(landing.find('ReduxForm[name="SignIn"]').exists()).toBe(false);
      expect(landing.find('ReduxForm[name="SignUp"]').exists()).toBe(true);
    });
  });
});
