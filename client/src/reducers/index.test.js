import rootReducer from './index';

describe('rootReducer', () => {
  const defaultReducer = {
    auth: null,
    error: '',
    form: {},
    newRecipe: {
      imageUrl: '',
      ingredients: '',
      method: '',
      tags: '',
      title: '',
    },
    recipes: null,
    showForm: false,
  };

  it('initializes the default state', () => {
    // if we call our rootReducer with an empty state {} and action {},
    // we should get back an object with the default values of all our reducers
    expect(rootReducer({}, {})).toEqual(defaultReducer);
  });
});
