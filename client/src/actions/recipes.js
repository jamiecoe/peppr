import axios from 'axios';
import { FETCH_RECIPE, ADD_RECIPE, GET_RECIPES, GET_SINGLE_RECIPE, DELETE_RECIPE, SHOW_FORM, RESET_RECIPE } from './types';
import { displayError } from './auth';
import history from './history';

export const showForm = () => (
  { type: SHOW_FORM }
);

export const resetRecipe = () => (
  {
    type: RESET_RECIPE,
  }
);

export const checkUrl = values => (dispatch) => {
  axios.post('/urlscraper', values)
    .then((response) => {
      dispatch({
        type: FETCH_RECIPE,
        payload: response.data,
      });
      dispatch(showForm());
    })
    .catch((err) => {
      dispatch(displayError(err.response.data.error));
    });
};

export const addRecipe = values => (dispatch) => {
  axios.post('/addnewrecipe', values, { headers: { authorization: localStorage.getItem('token') } })
    .then((response) => {
      dispatch({
        type: ADD_RECIPE,
        payload: response.data,
      });
      history.push('/recipes');
    })
    .catch(() => {
      history.push('/servererror');
    });
};

export const getRecipes = () => (dispatch) => {
  axios.get('/getrecipes', { headers: { authorization: localStorage.getItem('token') } })
    .then((response) => {
      dispatch({
        type: GET_RECIPES,
        payload: response.data,
      });
    })
    .catch(() => {
      history.push('/servererror');
    });
};

export const getSingleRecipe = id => (dispatch) => {
  axios.get(`/getsinglerecipe/${id}`, {
    headers: { authorization: localStorage.getItem('token') },
  })
    .then((response) => {
      dispatch({
        type: GET_SINGLE_RECIPE,
        payload: response.data,
      });
    })
    .catch(() => {
      history.push('/servererror');
    });
};

export const deleteRecipe = id => (dispatch) => {
  axios.get(`/deleterecipe/${id}`, {
    headers: { authorization: localStorage.getItem('token') },
  })
    .then(() => {
      dispatch({
        type: DELETE_RECIPE,
        payload: id,
      });
      history.push('/recipes');
    })
    .catch(() => {
      history.push('/servererror');
    });
};
