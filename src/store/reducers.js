import * as types from './types';

import Session from '../models/Session';

const defaultState = {
  auth: {},
  session: new Session(),
  adverts: {},
  ui: {}
};


export const auth = (state = defaultState.session, action) => {
  switch (action.type) {
    case types.AUTH_REQUEST:
      return { 
        ...state, 
      };

      case types.AUTH_NOTALLOWED:
      return {
        ...state,
        ...action.authData.data,
        notAllowed: true
      };
      
    case types.AUTH_SUCCESSFUL:
      return {
        ...state,
        ...action.authData.data
      };

    case types.AUTH_FAIL:
      return action.error;

      

    default:
      return state;
  }
}


export const session = (state = defaultState.session, action) => {
  switch (action.type) {
    case types.SESSION_SAVE:
      return { ...state, 
        ...action.session 
      };

    case types.SESSION_CLEAR:
      return defaultState.session;

    default:
      return state;
  }
};

export const adverts = (state = defaultState.adverts, action) => {
  switch (action.type) {
    case types.ADVERTS_REQUEST:
      return { 
        ...state, 
      };

      case types.ADVERTS_SUCCESSFUL:
        return {
          ...state,
          ...action.advertsData.result
        };
  
      case types.ADVERTS_FAIL:
        return action.error;
  

    default:
      return state;
  }
};

export const ui = (state = defaultState.ui, action) => {
  if (/_REQUEST$/.test(action.type)) {
    return {
      loading: true,
      error: null,
    };
  }

  if (/_SUCCESSFUL$/.test(action.type)) {
    return {
      loading: false,
      error: null,
    };
  }

  if (/_FAIL$/.test(action.type)) {
    return {
      loading: false,
      error: action.error,
    };
  }
  return state;
};


