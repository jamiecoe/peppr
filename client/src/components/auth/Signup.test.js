import React from 'react';
import { shallow } from 'enzyme';
import { SignUp } from './Signup';

describe('SignUp', () => {
  const mockSignupUser = jest.fn();
  const mockResetError = jest.fn();
  const mockHandleSubmit = jest.fn(fn => fn);

  const props = {
    signupUser: mockSignupUser,
    resetError: mockResetError,
    handleSubmit: mockHandleSubmit,
    error: '',
  };

  let signup = shallow(<SignUp {...props} />, {
    disableLifecycleMethods: false,
  });

  it('should render properly', () => {
    expect(signup).toMatchSnapshot();
  });

  it('should call `resetError` in componentDidMount()', () => {
    expect(mockResetError).toHaveBeenCalled();
  });

  describe('when the user submits the form', () => {
    beforeEach(() => {
      signup.find('form').simulate('submit');
    });

    it('should call mockHandleSubmit()', () => {
      expect(mockHandleSubmit).toHaveBeenCalled();
    });

    it('should call mockSigninUser', () => {
      expect(mockSignupUser).toHaveBeenCalled();
    });
  });

  describe('when there is an error on props', () => {
    beforeEach(() => {
      props.error = 'this is a test error';
      signup = shallow(<SignUp {...props} />);
    });

    it('should render the error message from props', () => {
      expect(signup.find('.landing__input--errortext > span').text()).toBe(`Oops! ${props.error}`);
    });
  });

  describe('when the `renderField` method is invoked', () => {
    const fieldProps = {
      meta: {
        touched: true,
        error: 'test error',
      },
      textfield: true,
      arialabel: 'test arialabel',
      placeholder: 'test placeholder',
      input: {},
    };

    const RenderedField = signup.instance().renderField(fieldProps)[1];
    const renderField = shallow(RenderedField);

    it('should render properly', () => {
      expect(renderField).toMatchSnapshot();
    });

    it('should include an error message', () => {
      expect(renderField.find('.landing__input--errortext').text()).toBe(fieldProps.meta.error);
    });
  });
});
