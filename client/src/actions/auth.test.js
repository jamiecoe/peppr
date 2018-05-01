import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { AUTH_USER, UNAUTH_USER, DISPLAY_ERROR, RESET_ERROR } from './types';
import * as actions from './auth';

const mock = new MockAdapter(axios);
const createMockStore = configureMockStore([thunk]);
const store = createMockStore({});

describe('auth actions', () => {
  it('creates an action to display error', () => {
    const error = 'test error message';
    const expectedAction = {
      type: DISPLAY_ERROR,
      payload: error,
    };

    expect(actions.displayError(error)).toEqual(expectedAction);
  });

  it('creates an action to reset error', () => {
    const expectedAction = {
      type: RESET_ERROR,
    };

    expect(actions.resetError()).toEqual(expectedAction);
  });

  it('creates an action to logout user', () => {
    const expectedAction = {
      type: UNAUTH_USER,
    };

    expect(actions.logoutUser()).toEqual(expectedAction);
    expect(localStorage.removeItem).toHaveBeenCalledWith('token');
  });

  describe('async actions', () => {
    describe('getUser', () => {
      beforeEach(() => {
        store.clearActions();
      });

      it('creates an async action to get authenticated users, if server replies with 200', () => {
        mock.onGet('/getuser').reply(200);

        const expectedAction = [{ type: AUTH_USER }];

        return store.dispatch(actions.getUser()).then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
      });

      it('creates an async action to get UNauthenticated users, if server replies with 401', () => {
        mock.onGet('/getuser').reply(401);

        const expectedAction = [{ type: UNAUTH_USER }];

        return store.dispatch(actions.getUser()).then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
      });
    });

    describe('signupUser', () => {
      beforeEach(() => {
        store.clearActions();
      });

      it('creates an async action to signup new users, if server replies with 200 and a token', () => {
        const mockSignupDetails = { email: 'test@test', password: 'test' };
        const testToken = 'test-token';
        mock.onPost('/signup').reply(200, { token: testToken });

        const expectedAction = [{ type: AUTH_USER }];
        return store
          .dispatch(actions.signupUser(mockSignupDetails))
          .then(() => {
            expect(store.getActions()).toEqual(expectedAction);
            expect(localStorage.setItem).toHaveBeenCalledWith(
              'token',
              testToken,
            );
          });
      });

      it('creates an async action to respond with an error, if server replies with an error code', () => {
        const mockSignupDetails = { email: 'test@test', password: 'test' };
        const testError = 'test error';
        mock.onPost('/signup').reply(401, { error: testError });

        const expectedAction = [{ type: DISPLAY_ERROR, payload: testError }];
        return store
          .dispatch(actions.signupUser(mockSignupDetails))
          .then(() => {
            expect(store.getActions()).toEqual(expectedAction);
          });
      });
    });

    describe('signinUser', () => {
      beforeEach(() => {
        store.clearActions();
      });

      it('creates an async action to signin new users, if server replies with 200 and a token', () => {
        const mockLoginDetails = { email: 'test@test', password: 'test' };
        const testToken = 'test-token';
        mock.onPost('/signin').reply(200, { token: testToken });

        const expectedAction = [{ type: AUTH_USER }];
        return store.dispatch(actions.signinUser(mockLoginDetails)).then(() => {
          expect(store.getActions()).toEqual(expectedAction);
          expect(localStorage.setItem).toHaveBeenCalledWith('token', testToken);
        });
      });

      it('creates an async action to respond with a 401 error msg, if server replies with a 401 error code', () => {
        const mockLoginDetails = { email: 'test@test', password: 'test' };

        mock.onPost('/signin').reply(401);

        const expectedAction = [
          { type: DISPLAY_ERROR, payload: 'Email or password was incorrect' },
        ];
        return store.dispatch(actions.signinUser(mockLoginDetails)).then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
      });

      it('creates an async action to respond with a 500 error msg, if server replies with a non-401 error code', () => {
        const mockLoginDetails = { email: 'test@test', password: 'test' };

        mock.onPost('/signin').reply(500);

        const expectedAction = [
          {
            type: DISPLAY_ERROR,
            payload:
              'There was an issue with our server. Please try again later',
          },
        ];
        return store.dispatch(actions.signinUser(mockLoginDetails)).then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        });
      });
    });
  });
});
