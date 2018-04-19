import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import newRecipeReducer from './newRecipeReducer';
import recipesReducer from './recipesReducer';
import showFormReducer from './showFormReducer';

export default combineReducers({
  form: formReducer,
  auth: authReducer,
  error: errorReducer,
  newRecipe: newRecipeReducer,
  recipes: recipesReducer,
  showForm: showFormReducer,
});
