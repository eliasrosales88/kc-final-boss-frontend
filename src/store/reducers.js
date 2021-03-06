import * as types from './types';

import Session from '../models/Session';

const defaultState = {
  auth: {},
  session: new Session(),
  adverts: {},
  advert: {},
  user: {},
  userAdvert: {},
  tags: [],
  ui: {}
};


export const auth = (state = defaultState.session, action) => {
  switch (action.type) {
    case types.AUTH_REQUEST:
      return { 
        ...state,
        notAllowed: false
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
        ...action.authData.data,
        notAllowed: false
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

export const advert = (state = defaultState.advert, action) => {
  switch (action.type) {
    case types.ADVERT_REQUEST:
      return { 
        ...state, 
      };

      case types.ADVERT_SUCCESSFUL:
        return {
          ...state,
          ...action.advertData.result
        };
  
      case types.ADVERT_FAIL:
        return action.error;
  

    default:
      return state;
  }
};

export const user = (state = defaultState.user, action) => {
  switch (action.type) {
    case types.USER_REQUEST:
      return { 
        ...state, 
      };

      case types.USER_SUCCESSFUL:
        return {
          ...state,
          ...action.userData.result
        };
  
      case types.USER_FAIL:
        return action.error;
  

    default:
      return state;
  }
};

export const userAdvert = (state = defaultState.userAdvert, action) => {
  switch (action.type) {
    case types.USER_ADVERT_REQUEST:
      return { 
        ...state, 
      };

      case types.USER_ADVERT_SUCCESSFUL:
        return {
          ...state,
          ...action.userAdvertData.result
        };
  
      case types.USER_ADVERT_FAIL:
        return action.error;
  

    default:
      return state;
  }
};

export const tags = (state = defaultState.adverts, action) => {
  switch (action.type) {
    case types.TAGS_REQUEST:
      return { 
        ...state, 
      };

      case types.TAGS_SUCCESSFUL:
        return {
          ...state,
          ...action.advertsData.result
        };
  
      case types.TAGS_FAIL:
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
      success: true
    };
  }

  if (/_FAIL$/.test(action.type)) {
    return {
      loading: false,
      error: action.error,
      success: false
    };
  }
  if (/_NOTALLOWED$/.test(action.type)) {
    return {
      loading: false,
      error: action.error,
    };
  }

  if (action.type === 'NOTIFICATION_KO') {
    return {
      ...state,
      notification: false
    }
  }

  if (action.type === 'NOTIFICATION_OK') {
    return {
      ...state,
      notification: true
    }
  }
  return state;
};


