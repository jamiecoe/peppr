import React from 'react';
import { shallow } from 'enzyme';
import { UrlForm, validate } from './UrlForm';

describe('UrlForm', () => {
  const mockCheckUrl = jest.fn();
  const mockHandleSubmit = jest.fn(fn => fn);
  const props = {
    error: '',
    checkUrl: mockCheckUrl,
    handleSubmit: mockHandleSubmit,
  };
  let urlForm = shallow(<UrlForm {...props} />);

  it('should render properly', () => {
    expect(urlForm).toMatchSnapshot();
  });

  describe('when user submits form', () => {
    beforeEach(() => {
      urlForm.find('form').simulate('submit');
    });

    it('should call mockHandleSubmit()', () => {
      expect(mockHandleSubmit).toHaveBeenCalled();
    });

    it('should call mockCheckUrl()', () => {
      expect(mockCheckUrl).toHaveBeenCalled();
    });
  });

  describe('when there is an error on props', () => {
    beforeEach(() => {
      props.error = 'this is a test error';
      urlForm = shallow(<UrlForm {...props} />);
    });

    it('should render the error message from props', () => {
      expect(urlForm.find('.urlform__input--errortext').text()).toBe(
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
      input: {},
    };

    const RenderedField = urlForm.instance().renderField(fieldProps);
    const renderField = shallow(RenderedField);

    it('should render properly', () => {
      expect(renderField).toMatchSnapshot();
    });

    it('should include an error message', () => {
      expect(
        renderField
          .find('.urlform__input--errortext.addrecipe__innermargin')
          .text(),
      ).toBe(fieldProps.meta.error);
    });
  });
});

describe('validate function', () => {
  it('should return the correct errors, if the values are missing', () => {
    const mockValues = {};

    const expectedError = {
      url: 'Enter a recipe URL',
    };

    expect(validate(mockValues)).toEqual(expectedError);
  });
});
