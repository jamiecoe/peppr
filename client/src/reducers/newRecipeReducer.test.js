import newRecipeReducer from './newRecipeReducer';
import { FETCH_RECIPE, RESET_RECIPE } from '../actions/types';

describe('newRecipeReducer', () => {
  const emptyRecipe = {
    title: '',
    ingredients: '',
    method: '',
    imageUrl: '',
    tags: '',
  };

  describe('when just returning the default state', () => {
    it('should return the default state value, ie: `emptyRecipe`', () => {
      expect(newRecipeReducer(undefined, {})).toEqual(emptyRecipe);
    });
  });

  describe('when a FETCH_RECIPE action is passed in', () => {
    const mockRecipe = { title: 'test recipe' };
    it('should return the value of `mockRecipe`', () => {
      expect(
        newRecipeReducer(undefined, {
          type: FETCH_RECIPE,
          payload: mockRecipe,
        }),
      ).toBe(mockRecipe);
    });
  });

  describe('when an RESET_RECIPE action is passed in', () => {
    it('should return the value of `emptyRecipe`', () => {
      expect(newRecipeReducer(undefined, { type: RESET_RECIPE })).toEqual(emptyRecipe);
    });
  });
});
