import { applyMiddleware, createStore } from '@reduxjs/toolkit';
import LoginReducer from '../reducers/SignupReducer';
import SignupReducer from '../reducers/SignupReducer';
import thunk from 'redux-thunk';

var store = createStore(LoginReducer);
store = createStore(SignupReducer, applyMiddleware(thunk));
export default store;