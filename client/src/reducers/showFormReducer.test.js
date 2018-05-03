import showFormReducer from './showFormReducer';
import { SHOW_FORM } from '../actions/types';

describe('showFormReducer', () => {
  describe('when just returning the default state', () => {
    it('should return the default state value, ie: false', () => {
      expect(showFormReducer(undefined, {})).toBe(false);
    });
  });

  describe('when an SHOW_FORM action is passed in', () => {
    it('should return the value of `true`', () => {
      expect(showFormReducer(undefined, { type: SHOW_FORM })).toBe(true);
    });
  });
});
