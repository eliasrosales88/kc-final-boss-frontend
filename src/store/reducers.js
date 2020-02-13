import * as types from './types';

import Session from '../models/Session';

const defaultState = {
  auth: {},
  session: new Session(),
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
      
    case types.AUTH_SUCCESSFULL:
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



