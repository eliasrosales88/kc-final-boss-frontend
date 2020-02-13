import * as types from "./types";
import { getSession } from "./selectors";


export const authRequest = () => ({
  type: types.AUTH_REQUEST
});

export const authSuccessfull = authData => ({
  type: types.AUTH_SUCCESSFULL,
  authData
});

export const authFail = error => ({
  type: types.AUTH_FAIL,
  error
});


export const authNotAllowed = authData => ({
  type: types.AUTH_NOTALLOWED,
  authData
});



/*************************
 * REGISTER
 *************************/
export const userRegister = userData => async (
  dispatch,
  getState,
  { history, services: { WallacloneAPI } }
) => {
  const state = getState();

  dispatch(authRequest());
  try {
    const { apiUrl } = getSession(state);
    const authData = await WallacloneAPI(apiUrl).postRegistration(
      userData
    );

    if (authData.data.success) {
      dispatch(authSuccessfull(authData.data));
      const authDataResponse = await WallacloneAPI(apiUrl).postAuth({
        email: userData.email,
        password: userData.password
      });

      dispatch(
        saveSession({
          username: authData.data.data.username,
          email: authData.data.data.email,
          token: authDataResponse.data.token
        })
      );

      history.push("/");
    } else {
      dispatch(authNotAllowed(authData))
    }
  } catch (error) {
    dispatch(authFail(error));
  }
};




/*************************
 * LOGIN
 *************************/
export const userLogin = authData => async (
  dispatch,
  getState,
  { history, services: { WallacloneAPI } }
) => {
  const state = getState();

  dispatch(authRequest());
  try {
    const { apiUrl } = getSession(state);
    const authDataResponse = await WallacloneAPI(apiUrl).postAuth(
      authData
    );

    if (authDataResponse.data.success) {
      dispatch(authSuccessfull(authDataResponse.data));
      dispatch(
        saveSession({
          username: authData.username,
          token: authDataResponse.data.token
        })
      );

      history.push("/");
    }
    //if not registered dispatch(registerNotSucceed)
    // else dispatch authenticate ??
  } catch (error) {
    dispatch(authFail(error));
  }
};

export const userLogout = () => (dispatch, getState, { history }) => {
  dispatch(clearSession());
  history.push("/");
};




/**********************
 *  SESSION
 **********************/
export const saveSession = session => ({
  type: types.SESSION_SAVE,
  session
});

export const clearSession = () => ({
  type: types.SESSION_CLEAR
});




/**********************
 *  ROUTES
 **********************/
export const routeRegister = () => (dispatch, getState, { history }) => {
  history.push("/register");
};

export const routeLogin = () => (dispatch, getState, { history }) => {
  history.push("/login");
};
