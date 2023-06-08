import { SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE } from '../actions/SignupActions';

const initialState = {
  isRegistering: false,
  isRegistered: false,
  user: null,
  error: null,
};

const SignupReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return {
        ...state,
        isRegistering: true,
        isRegistered: false,
        user: action.payload,
        error: null,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isRegistering: false,
        isRegistered: true,
        user: action.payload,
        error: null,
      };
    case SIGNUP_FAILURE:
      return {
        ...state,
        isRegistering: false,
        isRegistered: false,
        user: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default SignupReducer;