import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from "../actions/LoginActions";

const initialState = {
  isLogingIn: false,
  isLoggedIn: false,
  user: null,
  error: null,
};

const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLogingIn: true,
        isLoggedIn: false,
        user: action.payload,
        error: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLogingIn: false,
        isLoggedIn: true,
        user: action.payload,
        error: null,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isLogingIn: false,
        isLoggedIn: false,
        user: null,
        error: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        isLogingIn: false,
        isLoggedIn: false,
        user: null,
        error: null,
      };
    default:
      return state;
  }
};

export default LoginReducer;