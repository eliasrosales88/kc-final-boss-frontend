import * as types from "./types";
import { getSession } from "./selectors";

export const authRequest = () => ({
  type: types.AUTH_REQUEST
});

export const authSuccessfull = authData => ({
  type: types.AUTH_SUCCESSFUL,
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
    const authData = await WallacloneAPI(apiUrl).postRegistration(userData);

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
      dispatch(authNotAllowed(authData));
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
    const authDataResponse = await WallacloneAPI(apiUrl).postAuth(authData);

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
 *  GET ADVERTS
 **********************/
export const advertsRequest = () => ({
  type: types.ADVERTS_REQUEST
});

export const advertsSuccessfull = advertsData => ({
  type: types.ADVERTS_SUCCESSFUL,
  advertsData
});

export const advertsFail = error => ({
  type: types.ADVERTS_FAIL,
  error
});


export const getAdverts = (params) => async (
  dispatch,
  getState,
  { history, services: { WallacloneAPI } }
) => {

  const state = getState();
  dispatch(advertsRequest());
  try {
    const { apiUrl } = getSession(state);
    const advertsDataResponse = await WallacloneAPI(apiUrl).getAdverts(params);
    console.log('advertsDataResponse', advertsDataResponse);
    
    if (advertsDataResponse.data.ok) {
      dispatch(advertsSuccessfull(advertsDataResponse.data));
    }

  } catch (error) {
    dispatch(advertsFail(error));
  }
};



/**********************
 *  GET ADVERTS
 **********************/
export const tagsRequest = () => ({
  type: types.TAGS_REQUEST
});

export const tagsSuccessfull = tagsData => ({
  type: types.TAGS_SUCCESSFUL,
  tagsData
});

export const tagsFail = error => ({
  type: types.TAGS_FAIL,
  error
});


export const getTags = (params) => async (
  dispatch,
  getState,
  { history, services: { WallacloneAPI } }
) => {

  const state = getState();
  dispatch(tagsRequest());
  try {
    const { apiUrl } = getSession(state);
    const tagsDataResponse = await WallacloneAPI(apiUrl).getTags(params);
    console.log('tagsDataResponse', tagsDataResponse);
    
    if (tagsDataResponse.data.ok) {
      dispatch(tagsSuccessfull(tagsDataResponse.data));
    }

  } catch (error) {
    dispatch(tagsFail(error));
  }
};

/**********************
 *  ROUTES
 **********************/
export const routeRegister = () => (dispatch, getState, { history }) => {
  history.push("/register");
};

export const routeLogin = () => (dispatch, getState, { history }) => {
  history.push("/login");
};
