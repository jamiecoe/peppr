import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import history from './history';
import {
  FETCH_RECIPE,
  ADD_RECIPE,
  GET_RECIPES,
  GET_SINGLE_RECIPE,
  DELETE_RECIPE,
  SHOW_FORM,
  RESET_RECIPE,
  DISPLAY_ERROR,
} from './types';
import * as actions from './recipes';

const mock = new MockAdapter(axios);
const createMockStore = configureMockStore([thunk]);
const store = createMockStore({});

describe('recipes actions', () => {
  it('creates an action to show form', () => {
    const expectedAction = { type: SHOW_FORM };

    expect(actions.showForm()).toEqual(expectedAction);
  });

  it('creates an action to reset recipe', () => {
    const expectedAction = { type: RESET_RECIPE };

    expect(actions.resetRecipe()).toEqual(expectedAction);
  });

  describe('async actions', () => {
    describe('checkUrl', () => {
      beforeEach(() => {
        store.clearActions();
      });

      it('creates 2 async actions - FETCH_RECIPE and SHOW_FORM, if the server responds with recipe data', () => {
        const mockUrl = { url: 'mockUrl' };
        const mockRecipe = { title: 'mockRecipe' };
        mock.onPost('/urlscraper').reply(200, mockRecipe);

        const expectedAction = [
          { type: FETCH_RECIPE, payload: mockRecipe },
          { type: SHOW_FORM },
        ];

        return store.dispatch(actions.checkUrl(mockUrl)).then(() => {
          expect(store.getActions()).toEqual(expectedAction);
          expect(localStorage.getItem).toHaveBeenCalledWith('token');
        });
      });

      it('creates an async action to respond with an error, if the server responds an error', () => {
        const mockUrl = { url: 'mockUrl' };
        const testError = 'test error';
        mock.onPost('/urlscraper').reply(401, { error: testError });

        const expectedAction = [{ type: DISPLAY_ERROR, payload: testError }];

        return store.dispatch(actions.checkUrl(mockUrl)).then(() => {
          expect(store.getActions()).toEqual(expectedAction);
          expect(localStorage.getItem).toHaveBeenCalledWith('token');
        });
      });
    });

    describe('addRecipe', () => {
      let historySpy;

      beforeEach(() => {
        historySpy = jest.spyOn(history, 'push');
        store.clearActions();
      });

      afterEach(() => {
        historySpy.mockReset();
      });

      it('creates an async action add a new recipe, if the server responds with recipe data', () => {
        const mockRecipe = { title: 'mockRecipe' };

        mock.onPost('/addnewrecipe').reply(200, mockRecipe);

        const expectedAction = [{ type: ADD_RECIPE, payload: mockRecipe }];

        return store.dispatch(actions.addRecipe(mockRecipe)).then(() => {
          expect(store.getActions()).toEqual(expectedAction);
          expect(historySpy).toHaveBeenCalledWith('/recipes');
        });
      });

      it('pushes an error route to the history object, if the server responds an error', () => {
        const mockRecipe = { title: 'mockRecipe' };
        mock.onPost('/addnewrecipe').reply(401);

        return store.dispatch(actions.addRecipe(mockRecipe)).then(() => {
          expect(historySpy).toHaveBeenCalledWith('/servererror');
        });
      });
    });

    describe('getRecipe', () => {
      let historySpy;

      beforeEach(() => {
        historySpy = jest.spyOn(history, 'push');
        store.clearActions();
      });

      afterEach(() => {
        historySpy.mockReset();
      });

      it('creates an async action for getting recipes, if the server respons with recipes', () => {
        const mockRecipesResponse = [
          { title: 'test title1' },
          { title: 'test title2' },
        ];
        mock.onGet('/getrecipes').reply(200, mockRecipesResponse);

        const expectedAction = [
          { type: GET_RECIPES, payload: mockRecipesResponse },
        ];

        return store.dispatch(actions.getRecipes()).then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
      });

      it('should push an error route to history object, if the server responds with an error', () => {
        mock.onGet('/getrecipes').reply(401);

        return store.dispatch(actions.getRecipes()).then(() => {
          expect(historySpy).toHaveBeenCalledWith('/servererror');
        });
      });
    });
  });
});
