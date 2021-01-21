import axios from 'axios';
import setAuthTokenHeader from '../utils/setAuthTokenHeader';

import {
  USER_LOADED,
  // AUTH_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  CLEAR_ERROR,
  CLEAR_MESSAGE,
  SET_AUTH_LOADING,
} from '../actions/types';

const apiServer = 'http://localhost:8000';
// const apiServer = 'https://api.bchristensen.net';

export const loadUser = () => async dispatch => {
  // if (localStorage.token) {
  //   // set Authorization token header in axios
  //   setAuthTokenHeader(localStorage.token);
  if (localStorage.username && localStorage.user_id) {
    dispatch({
      type: USER_LOADED,
    });
  }
  // else {
  //   dispatch({
  //     type: AUTH_FAIL,
  //   })
  // }
  // }
}

export const register = (credentials) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    }
  }

  try {
    const res = await axios.post(`${apiServer}/api/users/register/`, JSON.stringify(credentials), config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: REGISTER_FAIL,
      payload: err.response.data.username[0]
    })
  }
}

export const login = (credentials) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    }
  }

  try {
    const res = await axios.post(`${apiServer}/api/users/auth/token/`, JSON.stringify(credentials), config);
    console.log(res.data);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    // set Authorization token header in axios
    if (localStorage.token) {
      setAuthTokenHeader(localStorage.token);
    }
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
      payload: err.response.data.non_field_errors[0]
    })
  }
}

export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
}

export const clearError = () => dispatch => {
  dispatch({ type: CLEAR_ERROR });
}

export const clearMessage = () => dispatch => {
  dispatch({ type: CLEAR_MESSAGE });
}

export const setAuthLoading = () => dispatch => {
  dispatch({ type: SET_AUTH_LOADING });
}
