import { configureStore, MiddlewareArray } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import rootReducer from '../reducers';
import middlewares from './middlewares';

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: new MiddlewareArray().concat(...middlewares, logger),
});
