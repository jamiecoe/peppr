import errorReducer from './errorReducer';
import { DISPLAY_ERROR, RESET_ERROR } from '../actions/types';

describe('errorReducer', () => {
  describe('when just returning the default state', () => {
    it('should return the default state value, ie: empty string', () => {
      expect(errorReducer(undefined, {})).toBe('');
    });
  });

  describe('when an DISPLAY_ERROR action is passed in', () => {
    const testError = 'test error';
    it('should return the value of `testError`', () => {
      expect(errorReducer(undefined, { type: DISPLAY_ERROR, payload: testError })).toBe(testError);
    });
  });

  describe('when an RESET_ERROR action is passed in', () => {
    it('should return the value of an empty string', () => {
      expect(errorReducer(undefined, { type: RESET_ERROR })).toBe('');
    });
  });
});
