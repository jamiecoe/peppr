import React from 'react';
import { shallow } from 'enzyme';
import { SignIn } from './Signin';

describe('SignIn', () => {
  const mockResetError = jest.fn();
  const mockSigninUser = jest.fn();
  const mockHandleSubmit = jest.fn(fn => fn);
  const props = {
    resetError: mockResetError,
    signinUser: mockSigninUser,
    handleSubmit: mockHandleSubmit,
    error: '',
  };
  let signin = shallow(<SignIn {...props} />, {
    disableLifecycleMethods: false,
  });

  it('should render properly', () => {
    expect(signin).toMatchSnapshot();
  });

  it('should call `resetError` in componentDidMount()', () => {
    expect(mockResetError).toHaveBeenCalled();
  });

  describe('when the user submits the form', () => {
    beforeEach(() => {
      signin.find('form').simulate('submit');
    });

    it('should call mockHandleSubmit()', () => {
      expect(mockHandleSubmit).toHaveBeenCalled();
    });

    it('should call mockSigninUser', () => {
      expect(mockSigninUser).toHaveBeenCalled();
    });
  });

  describe('when there is an error on props', () => {
    beforeEach(() => {
      props.error = 'this is a test error';
      signin = shallow(<SignIn {...props} />);
    });

    it('should render the error message from props', () => {
      expect(signin.find('.signin-form-error-msg').text()).toBe(
        `Oops! ${props.error}`,
      );
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

    const RenderedField = signin.instance().renderField(fieldProps)[1];
    const renderField = shallow(RenderedField);

    it('should render properly', () => {
      expect(renderField).toMatchSnapshot();
    });

    it('should include an error message', () => {
      expect(
        renderField
          .find('.landing__input--errortext')
          .text(),
      ).toBe(fieldProps.meta.error);
    });
  });
});
