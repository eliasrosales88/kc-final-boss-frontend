import * as types from './types';
import { getSession, getAdvert } from './selectors';


export const registrationRequest = () => ({
  type: types.REGISTRATION_REQUEST,
});

export const registrationSuccesfull = resData => ({
  type: types.REGISTRATION_SUCCESSFULL,
  resData,
});

export const registrationFail = error => ({
  type: types.REGISTRATION_FAIL,
  error,
});


export const registerUser = (userData) => async (
  dispatch,
  getState,
  { services: { WallacloneAPI } },
) => {
  const state = getState();

  dispatch(registrationRequest());
  try {
    const { apiUrl } = getSession(state);
    const resData = await WallacloneAPI(apiUrl).postRegistration(userData);
    dispatch(registrationSuccesfull(resData.data));
    //if not registered dispatch(registerNotSucceed)
    // else dispatch authenticate ??
  } catch (error) {
    dispatch(registrationFail(error));
  }
};

// export const authenticateUser =

export const saveSession = (session, remember) => ({
  type: types.SESSION_SAVE,
  session,
  remember,
});

export const clearSession = () => ({
  type: types.SESSION_CLEAR,
});

export const userLogin = (...args) => (dispatch, _getState, { history }) => {
  dispatch(saveSession(...args));
  history.push('/');
};

export const userLogout = (...args) => (dispatch, _getState, { history }) => {
  dispatch(clearSession(...args));
  history.push('/register');
};



