import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

import * as reducers from './reducers';

const configureMiddleware = config => {
  const middlewares = [thunkMiddleware.withExtraArgument(config)];
  if (process.env.NODE_ENV === 'development') {
    middlewares.push(loggerMiddleware);
  }
  return middlewares;
};

const lastActionReducerEnhancer = reducer => (
  { lastAction, ...state },
  action,
) => ({
  ...reducer(state, action),
  lastAction: action,
});

const createRootReducer = compose(lastActionReducerEnhancer, combineReducers);

export const configureStore = config => preloadedState => {
  const middlewares = configureMiddleware(config);
  const composeEnhancers = composeWithDevTools;

  return createStore(
    createRootReducer(reducers),
    preloadedState,
    composeEnhancers(applyMiddleware(...middlewares)),
  );
};
