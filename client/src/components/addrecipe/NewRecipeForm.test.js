import React from 'react';
import { shallow } from 'enzyme';
import { NewRecipeForm, validate } from './NewRecipeForm';

describe('NewRecipeForm', () => {
  const mockAddRecipe = jest.fn();
  const mockHandleSubmit = jest.fn(fn => fn);
  const props = {
    addRecipe: mockAddRecipe,
    handleSubmit: mockHandleSubmit,
  };
  const newRecipeForm = shallow(<NewRecipeForm {...props} />);

  it('renders properly', () => {
    expect(newRecipeForm).toMatchSnapshot();
  });

  describe('when user submits form', () => {
    beforeEach(() => {
      newRecipeForm
        .find('.newrecipe__form__container.addrecipe__innermargin')
        .simulate('submit');
    });

    it('should call mockHandleSubmit() and mockAddRecipe() ', () => {
      expect(mockHandleSubmit).toHaveBeenCalled();
      expect(mockAddRecipe).toHaveBeenCalled();
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

    const RenderedField = newRecipeForm.instance().renderField(fieldProps);
    const renderField = shallow(RenderedField);

    it('should render properly, with a textarea', () => {
      expect(renderField).toMatchSnapshot();
      expect(renderField.find('textarea').exists()).toBe(true);
    });

    it('should include an error message', () => {
      expect(renderField.find('.newrecipe__input--errortext').text()).toBe(
        fieldProps.meta.error,
      );
    });
  });
});

describe('validate function', () => {
  it('should return the correct errors, if the values are missing', () => {
    const mockValues = {};

    const expectedError = {
      title: 'Enter a title',
      ingredients: 'Enter your ingredients',
      method: 'Enter your method steps',
    };

    expect(validate(mockValues)).toEqual(expectedError);
  });
});
