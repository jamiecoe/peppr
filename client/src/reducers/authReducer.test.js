import authReducer from './authReducer';
import { AUTH_USER, UNAUTH_USER } from '../actions/types';

describe('authReducer', () => {
  describe('when just returning the default state', () => {
    it('should return the default state value, ie: null', () => {
      expect(authReducer(undefined, {})).toBe(null);
    });
  });

  describe('when an AUTH_USER action is passed in', () => {
    it('should return the value of `true`', () => {
      expect(authReducer(undefined, { type: AUTH_USER })).toBe(true);
    });
  });

  describe('when an UNAUTH_USER action is passed in', () => {
    it('should return the value of `false`', () => {
      expect(authReducer(undefined, { type: UNAUTH_USER })).toBe(false);
    });
  });
});
