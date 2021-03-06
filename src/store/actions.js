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
    } else {
      dispatch(authNotAllowed(authDataResponse));
    }
  } catch (error) {
    console.log("error", error);
    
    dispatch(authNotAllowed(error));
    // dispatch(authFail(error));
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

export const getAdverts = params => async (
  dispatch,
  getState,
  { history, services: { WallacloneAPI } }
) => {
  const state = getState();
  dispatch(advertsRequest());
  try {
    const { apiUrl } = getSession(state);
    let advertsDataResponse;
    if (params.token) {

      advertsDataResponse = await WallacloneAPI(apiUrl).getAccountAdverts(
        params
      );
    } else {
      advertsDataResponse = await WallacloneAPI(apiUrl).getAdverts(params);
    }

    if (advertsDataResponse.data.ok) {
      const paginatorCount = Math.ceil(
        advertsDataResponse.data.result.total / params.limit
      );
      advertsDataResponse.data.result.paginatorCount = paginatorCount;
      // advertsDataResponse.data.result.rows = advertsDataResponse.data.result.rows.reverse();

      dispatch(advertsSuccessfull(advertsDataResponse.data));
    }
  } catch (error) {
    dispatch(advertsFail(error));
    if (error.message === "Error: Request failed with status code 401") {
      dispatch(clearSession());
      dispatch(routeLogin());
    }
  }
};
/**********************
 *  GET ADVERT
 **********************/
export const advertRequest = () => ({
  type: types.ADVERT_REQUEST
});

export const advertSuccessfull = advertData => ({
  type: types.ADVERT_SUCCESSFUL,
  advertData
});

export const advertFail = error => ({
  type: types.ADVERT_FAIL,
  error
});

export const getAdvert = (id, token) => async (
  dispatch,
  getState,
  { history, services: { WallacloneAPI } }
) => {
  const state = getState();
  dispatch(advertRequest());
  try {
    const { apiUrl } = getSession(state);
    let advertDataResponse;
    if (token) {

      advertDataResponse = await WallacloneAPI(apiUrl).getAccountAdvert(
        id,
        token
      );
    } else {
      advertDataResponse = await WallacloneAPI(apiUrl).getAdvert(id);
    }
    if (advertDataResponse.data.ok) {
      dispatch(advertSuccessfull(advertDataResponse.data));
      if (token) {
        dispatch(routeAcountAdvertEdit(id));
      }
    }
  } catch (error) {
    dispatch(advertFail(error));
    if (error.message === "Error: Request failed with status code 401") {
      dispatch(clearSession());
      dispatch(routeLogin());
    }
  }
};

/**********************
 *  GET USER
 **********************/
export const userRequest = () => ({
  type: types.USER_REQUEST
});

export const userSuccessfull = userData => ({
  type: types.USER_SUCCESSFUL,
  userData
});

export const userFail = error => ({
  type: types.USER_FAIL,
  error
});

export const getUser = (userAdverts, user) => async (
  dispatch,
  getState,
  { history, services: { WallacloneAPI } }
) => {
  const state = getState();
  dispatch(userRequest());
  try {
    const { apiUrl } = getSession(state);

    const userDataResponse = await WallacloneAPI(apiUrl).getUser(user);
    if (userDataResponse.data.success) {
      dispatch(userSuccessfull(userDataResponse.data));
      dispatch(getUserAdvert({ ...userAdverts }));
    }
  } catch (error) {
    dispatch(userFail(error.message));
  }
};


/**********************
 *  GET ACCOUNT USER
 **********************/

export const getAccountUser = (username) => async (
  dispatch,
  getState,
  { history, services: { WallacloneAPI } }
) => {
  const state = getState();
  dispatch(userRequest());
  try {
    const { apiUrl } = getSession(state);

    const userDataResponse = await WallacloneAPI(apiUrl).getAccountUser(username);
    if (userDataResponse.data.success) {
      dispatch(userSuccessfull(userDataResponse.data));
    }
  } catch (error) {
    dispatch(userFail(error.message));
  }
};


/**********************
 *  GET USER ADVERT
 **********************/
export const userAdvertRequest = () => ({
  type: types.USER_ADVERT_REQUEST
});

export const userAdvertSuccessfull = userAdvertData => ({
  type: types.USER_ADVERT_SUCCESSFUL,
  userAdvertData
});

export const userAdvertFail = error => ({
  type: types.USER_ADVERT_FAIL,
  error
});

export const getUserAdvert = owner => async (
  dispatch,
  getState,
  { history, services: { WallacloneAPI } }
) => {
  const state = getState();
  dispatch(userAdvertRequest());
  try {
    const { apiUrl } = getSession(state);
    const userAdvertDataResponse = await WallacloneAPI(apiUrl).getUserAdvert(
      owner
    );
    if (userAdvertDataResponse.data.ok) {
      dispatch(userAdvertSuccessfull(userAdvertDataResponse.data));
    }
  } catch (error) {
    dispatch(userAdvertFail(error));
    if (error.message === "Error: Request failed with status code 401") {
      dispatch(clearSession());
      dispatch(routeLogin());
    }
  }
};

/**********************
 *  GET TAGS
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

export const getTags = params => async (
  dispatch,
  getState,
  { history, services: { WallacloneAPI } }
) => {
  const state = getState();
  dispatch(tagsRequest());
  try {
    const { apiUrl } = getSession(state);
    const tagsDataResponse = await WallacloneAPI(apiUrl).getTags(params);

    if (tagsDataResponse.data.ok) {
      dispatch(tagsSuccessfull(tagsDataResponse.data));
    }
  } catch (error) {
    dispatch(tagsFail(error));
  }
};

/**********************
 *  PATCH ADVERT_UPDATE
 **********************/
export const advertUpdateRequest = () => ({
  type: types.ADVERT_REQUEST
});

export const advertUpdateSuccessfull = advertData => ({
  type: types.ADVERT_SUCCESSFUL,
  advertData
});

export const advertUpdateFail = error => ({
  type: types.ADVERT_FAIL,
  error
});
export const notificationFail = () => ({
  type: types.NOTIFICATION_KO,
  
});
export const notificationSuccessful = () => ({
  type: types.NOTIFICATION_OK,
  
});

export const updateAdvert = params => async (
  dispatch,
  getState,
  { history, services: { WallacloneAPI } }
) => {
  const state = getState();
  dispatch(advertUpdateRequest());
  try {
    const { apiUrl } = getSession(state);
    let advertUpdateDataResponse;

    advertUpdateDataResponse = await WallacloneAPI(apiUrl).updateAccountAdvert(
      params
    );
    if (advertUpdateDataResponse.data.ok) {
      dispatch(advertUpdateSuccessfull(advertUpdateDataResponse.data));
      dispatch(notificationSuccessful());
    }
  } catch (error) {
    dispatch(advertFail(error));
    dispatch(notificationFail());
    if (error.message === "Error: Request failed with status code 401") {
      dispatch(clearSession());
      dispatch(routeLogin());
    }
  }
};



/**********************
 *  PATCH USER_UPDATE
 **********************/
export const userUpdateRequest = () => ({
  type: types.USER_REQUEST
});

export const userUpdateSuccessfull = userData => ({
  type: types.USER_SUCCESSFUL,
  userData
});

export const userUpdateFail = error => ({
  type: types.USER_FAIL,
  error
});


export const updateAccountUser = params => async (
  dispatch,
  getState,
  { history, services: { WallacloneAPI } }
) => {
  const state = getState();
  dispatch(userUpdateRequest());
  try {
    const { apiUrl } = getSession(state);
    let userUpdateDataResponse;
    
    userUpdateDataResponse = await WallacloneAPI(apiUrl).updateAccountUser(
      params
    );
    if (userUpdateDataResponse.data.ok) {
      dispatch(userUpdateSuccessfull(userUpdateDataResponse.data));
      dispatch(notificationSuccessful());
    }
  } catch (error) {
    dispatch(advertFail(error));
    dispatch(notificationFail());
    if (error.message === "Error: Request failed with status code 401") {
      dispatch(clearSession());
      dispatch(routeLogin());
    }
  }
};



/**********************
 *  DELETE ADVERT
 **********************/
export const advertDeleteRequest = () => ({
  type: types.ADVERT_REQUEST
});

export const advertDeleteSuccessfull = advertData => ({
  type: types.ADVERT_SUCCESSFUL,
  advertData
});

export const advertDeleteFail = error => ({
  type: types.ADVERT_FAIL,
  error
});


export const deleteAdvert = (id, updateAdvertList) => async (
  dispatch,
  getState,
  { history, services: { WallacloneAPI } }
) => {
  const state = getState();
  dispatch(advertDeleteRequest());
  try {
    const { apiUrl } = getSession(state);
    let advertDeleteDataResponse;

    advertDeleteDataResponse = await WallacloneAPI(apiUrl).deleteAccountAdvert(
      id
    );
    if (advertDeleteDataResponse.data.ok) {
      dispatch(advertDeleteSuccessfull(advertDeleteDataResponse.data));
      dispatch(getAdverts(updateAdvertList));
    }
  } catch (error) {
    dispatch(advertDeleteFail(error));
  }
};
/**********************
 *  DELETE USER
 **********************/
export const userDeleteRequest = () => ({
  type: types.USER_REQUEST
});

export const userDeleteSuccessfull = userData => ({
  type: types.USER_SUCCESSFUL,
  userData
});

export const userDeleteFail = error => ({
  type: types.USER_FAIL,
  error
});


export const deleteUser = (username) => async (
  dispatch,
  getState,
  { history, services: { WallacloneAPI } }
) => {
  const state = getState();
  dispatch(userDeleteRequest());
  try {
    const { apiUrl } = getSession(state);
    let userDeleteDataResponse;

    userDeleteDataResponse = await WallacloneAPI(apiUrl).deleteAccountUser(
      username
    );
    if (userDeleteDataResponse.data.ok) {
      dispatch(userDeleteSuccessfull(userDeleteDataResponse.data));
      dispatch(routeRegister());
      dispatch(clearSession());
    }
  } catch (error) {
    dispatch(userDeleteFail(error));
  }
};

/**********************
 *  CREATE ADVERT
 **********************/
export const advertCreateRequest = () => ({
  type: types.ADVERT_REQUEST
});

export const advertCreateSuccessfull = advertData => ({
  type: types.ADVERT_SUCCESSFUL,
  advertData
});

export const advertCreateFail = error => ({
  type: types.ADVERT_FAIL,
  error
});

export const createAdvert = (params) => async (
  dispatch,
  getState,
  { history, services: { WallacloneAPI } }
) => {
  const state = getState();
  dispatch(advertCreateRequest());
  try {
    const { apiUrl } = getSession(state);
    let advertCreateDataResponse;

      advertCreateDataResponse = await WallacloneAPI(
        apiUrl
      ).postUserAdvert(params);
    if (advertCreateDataResponse.data.success) {
      dispatch(advertCreateSuccessfull(advertCreateDataResponse.data));
      dispatch(notificationSuccessful());
    }
  } catch (error) {
    dispatch(advertFail(error));
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

export const routeHome = () => (dispatch, getState, { history }) => {
  history.push("/");
};

export const routeAdvertDetail = advert => (
  dispatch,
  getState,
  { history }
) => {
  history.push("/advert/" + advert.name + "_id__" + advert.id);
  dispatch(getAdvert(advert.id));
};
export const routeUserPublic = advert => (dispatch, getState, { history }) => {
  history.push("/user/" + advert.owner);
};

export const routeAcount = () => (dispatch, getState, { history }) => {
  history.push("/account");
};

export const routeAcountAdvertCreate = () => (
  dispatch,
  getState,
  { history }
) => {
  history.push("/account/advert/create");
};

export const routeAcountAdvertEdit = id => (
  dispatch,
  getState,
  { history }
) => {
  history.push("/account/advert/" + id);
};

export const routeAcountUserEdit = username => (
  dispatch,
  getState,
  { history }
) => {
  history.push("/account/user/" + username);
};
