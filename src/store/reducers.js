import * as types from './types';

import Session from '../models/Session';

const defaultState = {
  register: {},
  registerSuccessfull: {},
  session: new Session(),
};


export const register = (state = defaultState.session, action) => {
  switch (action.type) {
    case types.REGISTRATION_REQUEST:
      return { 
        ...state, 
        registerStatus: true 
      };

    case types.REGISTRATION_SUCCESSFULL:
      return {
        ...state,
        ...action.registrationData.data
      };

    case types.REGISTRATION_FAIL:
      return action.error;

    default:
      return state;
  }
}


export const session = (state = defaultState.session, action) => {
  switch (action.type) {
    case types.SESSION_SAVE:
      return { ...state, ...action.session };

    case types.SESSION_CLEAR:
      return defaultState.session;

    default:
      return state;
  }
};



