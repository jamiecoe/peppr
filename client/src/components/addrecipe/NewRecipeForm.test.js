import React from 'react';
import { shallow } from 'enzyme';
import { NewRecipeForm } from './NewRecipeForm';

describe('NewRecipeForm', () => {
  const mockAddRecipe = jest.fn();
  const mockHandleSubmit = jest.fn();
  const props = {
    addRecipe: mockAddRecipe,
    handleSubmit: mockHandleSubmit,
  };
  const newRecipeForm = shallow(<NewRecipeForm {...props} />);

  const mockFormValues = {
    title: 'sfsfgd§',
    ingredients: 'sdfsfsfds',
    method: 'asdfasdsada',
    imageUrl: 'adsadadsa',
    tags: 'asdsadasdsad',
  };

  it('renders properly', () => {
    expect(newRecipeForm).toMatchSnapshot();
  });

  describe('when user submits form', () => {
    beforeEach(() => {
      newRecipeForm
        .find('.newrecipe__form__container.addrecipe__innermargin')
        .simulate('submit');
    });

    it('should call the handleSubmit method in props', () => {
      expect(mockHandleSubmit).toHaveBeenCalled();
      console.log(newRecipeForm);
    });
  });
});
