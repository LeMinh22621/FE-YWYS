import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({reducer:rootReducer}, applyMiddleware(thunk));

export default store;