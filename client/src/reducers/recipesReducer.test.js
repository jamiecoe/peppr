import recipesReducer from './recipesReducer';
import {
  GET_RECIPES,
  GET_SINGLE_RECIPE,
  DELETE_RECIPE,
} from '../actions/types';

describe('recipesReducer', () => {
  describe('when just returning the default state', () => {
    it('should return the default state value, ie: `emptyRecipe`', () => {
      expect(recipesReducer(undefined, {})).toBe(null);
    });
  });

  describe('when a GET_RECIPES action is passed in', () => {
    it('should return the an object containing all the recipes, with their ids as keys', () => {
      const mockRecipeArray = [
        { id: 1, title: 'test recipe 1' },
        { id: 2, title: 'test recipe 2' },
      ];

      const expectedRecipeObject = {
        1: { id: 1, title: 'test recipe 1' },
        2: { id: 2, title: 'test recipe 2' },
      };
      expect(
        recipesReducer(undefined, {
          type: GET_RECIPES,
          payload: mockRecipeArray,
        }),
      ).toEqual(expectedRecipeObject);
    });
  });

  describe('when a GET_SINGLE_RECIPE action is passed in', () => {
    it('should return the an object with new recipe added on, IF state already contains some recipes', () => {
      const mockNewRecipe = { id: 3, title: 'test recipe 3' };

      const mockRecipeState = {
        1: { id: 1, title: 'test recipe 1' },
        2: { id: 2, title: 'test recipe 2' },
      };

      const expectedRecipeObject = {
        1: { id: 1, title: 'test recipe 1' },
        2: { id: 2, title: 'test recipe 2' },
        3: { id: 3, title: 'test recipe 3' },
      };

      expect(
        recipesReducer(mockRecipeState, {
          type: GET_SINGLE_RECIPE,
          payload: mockNewRecipe,
        }),
      ).toEqual(expectedRecipeObject);
    });

    it('should return the a object with ONLY new recipe added on, IF state if falsy (eg: user navigates directly to single recipe page)', () => {
      const mockNewRecipe = { id: 3, title: 'test recipe 3' };

      const expectedRecipeObject = {
        3: { id: 3, title: 'test recipe 3' },
      };

      expect(
        recipesReducer(undefined, {
          type: GET_SINGLE_RECIPE,
          payload: mockNewRecipe,
        }),
      ).toEqual(expectedRecipeObject);
    });
  });

  describe('when a DELETE_RECIPE action is passed in', () => {
    it('should remove the recipe from state using the provided id', () => {
      const mockDeleteId = '2';

      const mockRecipeState = {
        1: { id: 1, title: 'test recipe 1' },
        2: { id: 2, title: 'test recipe 2' },
      };

      const expectedRecipeObject = {
        1: { id: 1, title: 'test recipe 1' },
      };

      expect(
        recipesReducer(mockRecipeState, {
          type: DELETE_RECIPE,
          payload: mockDeleteId,
        }),
      ).toEqual(expectedRecipeObject);
    });
  });
});
