import { REGISTER_USER_SUCCESS, REGISTER_USER_FAILURE, LOGIN_USER_FAILURE, LOGIN_USER_SUCCESS, LOGOUT_USER } from "../actionTypes";

const initialState = {
  error: null,
  user: null
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER_SUCCESS:
      return { ...state, error: null };
    case REGISTER_USER_FAILURE:
      return { ...state, error: action.error };
    case LOGIN_USER_SUCCESS:
      return { ...state, user: action.user, error: null };
    case LOGIN_USER_FAILURE:
      return { ...state, error: action.error };
    case LOGOUT_USER:
      return { ...initialState };
    default:
      return state;
  }
};


export default usersReducer;
