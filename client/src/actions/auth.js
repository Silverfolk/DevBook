// import api from '../utils/api';
import axios from 'axios';
import { setAlert } from './alert';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE
} from './types';
import setAuthTokens from '../utils/setAuthTokens';
/*
  NOTE: we don't need a config object for axios as the
 default headers in axios are already Content-Type: application/json
 also axios stringifies and parses JSON for you, so no need for 
 JSON.stringify or JSON.parse
*/

// Load User
export const loadUser = () => async (dispatch) => { 
  if(localStorage.token){
    setAuthTokens(localStorage.token);
  }
  try {
    const res = await axios.get('http://localhost:5000/api/auth');

    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// Register User
export const register = (formData) => async (dispatch) => {
  const {firstName,lastName,username,email,password} = formData;
  const config={
    headers:{
      'Content-Type': 'application/json'
    }
  }
  const body=JSON.stringify({firstName,lastName,username,email,password});
  console.log(body);
  try {
    
    const res = await axios.post('http://localhost:5000/api/auth/signup', body,config);
    console.log(res);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
    
    // dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data;
    console.log(errors);
     
    if (errors) {
      dispatch(setAlert(errors.message, 'danger'));
    }

    dispatch({
      type: REGISTER_FAIL
    });
  }
};

// Login User
export const login = (formData) => async (dispatch) => {
  const {email,password} = formData;
  const config={
    headers:{
      'Content-Type': 'application/json'
    }
  }
  const body=JSON.stringify({email,password});
  console.log(body);
  try {
  
    const res = await axios.post('http://localhost:5000/api/auth/signin', body,config);
    console.log(res);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    localStorage.setItem('token', res.data.token);
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.message;
   console.log(errors);
    if (errors) {
     dispatch(setAlert(errors, 'danger'));
    }

    dispatch({
      type: LOGIN_FAIL
    });
  }
};

// Logout
export const logout = () =>dispatch=> { 
  dispatch({type:LOGOUT});
  dispatch({type:CLEAR_PROFILE})
};
