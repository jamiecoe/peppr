import axios from 'axios';
import history from './history';
import { AUTH_USER, UNAUTH_USER, DISPLAY_ERROR, RESET_ERROR } from './types';

export const displayError = err => (
  {
    type: DISPLAY_ERROR,
    payload: err,
  }
);

export const resetError = () => (
  {
    type: RESET_ERROR,
  }
);

export const logoutUser = () => {
  localStorage.removeItem('token');
  return {
    type: UNAUTH_USER,
  };
};

export const getUser = () => dispatch =>
  axios
    .get('/getuser', {
      headers: { authorization: localStorage.getItem('token') },
    })
    .then(() => dispatch({ type: AUTH_USER }))
    .catch(() => {
      dispatch({ type: UNAUTH_USER });
    });


export const signupUser = values => dispatch =>
  axios
    .post('/signup', values)
    .then((response) => {
      localStorage.setItem('token', response.data.token);
      dispatch({
        type: AUTH_USER,
      });
      history.push('/recipes');
    })
    .catch((err) => {
      dispatch(displayError(err.response.data.error));
    });

export const signinUser = values => dispatch =>
  axios
    .post('/signin', values)
    .then((response) => {
      localStorage.setItem('token', response.data.token);
      dispatch({
        type: AUTH_USER,
      });
      history.push('/recipes');
    })
    .catch((err) => {
      if (err.response.status === 401) {
        dispatch(displayError('Email or password was incorrect'));
      } else {
        dispatch(displayError('There was an issue with our server. Please try again later'));
      }
    });
