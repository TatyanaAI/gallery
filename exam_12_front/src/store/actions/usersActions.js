import { REGISTER_USER_SUCCESS, REGISTER_USER_FAILURE, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE, LOGOUT_USER } from "../actionTypes";
import axios from 'axios';
import { push } from 'connected-react-router';

export const registerUserSuccess = () => {
  return { type: REGISTER_USER_SUCCESS };
};

export const registerUserFailure = error => {
  return { type: REGISTER_USER_FAILURE, error };
};

export const loginUserSuccess = user => {
  return { type: LOGIN_USER_SUCCESS, user };
};

export const loginUserFailure = error => {
  return { type: LOGIN_USER_FAILURE, error };
};

export const registerUser = user => {
  return async dispatch => {
    try {
      await axios.post('/users', user);
      dispatch(registerUserSuccess());
      dispatch(push('/'));
    } catch (error) {
      if (error.response && error.response.data) {
        dispatch(registerUserFailure(error.response.data.error));
      } else {
        dispatch(registerUserFailure(error.message));
      }
    }
  };
};

export const loginUser = user => {
  return dispatch => {
    return axios.post('/users/sessions', user).then(
      response => {
        dispatch(loginUserSuccess(response.data));
        dispatch(push('/'));
      },
      error => {
        dispatch(loginUserFailure(error.response.data));
      }
    );
  };
};

export const logoutUser = () => {
  return async dispatch => {
    await axios.delete("/users/sessions");
    dispatch({ type: LOGOUT_USER });
    dispatch(push("/login"));
  };
};
