import { combineReducers } from 'redux';
import LoginReducer from './LoginReducer';
import SignupReducer from './SignupReducer';

const rootReducer = combineReducers({
  login: LoginReducer,
  signup: SignupReducer,
});

export default rootReducer;