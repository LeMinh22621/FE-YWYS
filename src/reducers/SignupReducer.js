import { SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE } from '../actions/SignupActions';

const initialState = {
  isSigningUp: false,
  isSignUpSuccessful: false,
  error: null,
};

const SignupReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return {
        ...state,
        isSigningUp: true,
        error: null,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isSigningUp: false,
        isSignUpSuccessful: true,
        error: null,
      };
    case SIGNUP_FAILURE:
      return {
        ...state,
        isSigningUp: false,
        isSignUpSuccessful: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default SignupReducer;