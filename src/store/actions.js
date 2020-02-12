import * as types from "./types";
import { getSession } from "./selectors";
// import { history } from "../index";

export const registrationRequest = () => ({
  type: types.REGISTRATION_REQUEST
});

export const registrationSuccessfull = registrationData => ({
  type: types.REGISTRATION_SUCCESSFULL,
  registrationData
});

export const registrationFail = error => ({
  type: types.REGISTRATION_FAIL,
  error
});

export const authRequest = userData => ({
  type: types.AUTH_REQUEST,
  userData
});

export const authSuccessfull = userData => ({
  type: types.AUTH_SUCCESSFULL,
  userData
});

export const registerUser = userData => async (
  dispatch,
  getState,
  {history, services: { WallacloneAPI } }
) => {
  const state = getState();

  dispatch(registrationRequest());
  try {
    const { apiUrl } = getSession(state);
    const registrationData = await WallacloneAPI(apiUrl).postRegistration(
      userData
    );
    console.log(registrationData);

    if (registrationData.data.success) {
      dispatch(registrationSuccessfull(registrationData.data));
      const authData = await WallacloneAPI(apiUrl).postAuth({
        email: userData.email,
        password: userData.password
      });
      console.log("AUTH DATA", authData);
      console.log("REGISTRATION DATA", registrationData);

      dispatch(
        saveSession({
          username: registrationData.data.data.username,
          email: registrationData.data.data.email,
          token: authData.data.token
        })
      );

      history.push("/");
    } else {
    }
    //if not registered dispatch(registerNotSucceed)
    // else dispatch authenticate ??
  } catch (error) {
    dispatch(registrationFail(error));
  }
};

export const saveSession = session => ({
  type: types.SESSION_SAVE,
  session
});

export const clearSession = () => ({
  type: types.SESSION_CLEAR
});



export const userLogin = (...args) => (dispatch, getState, { history }) => {
  dispatch(saveSession(...args));
  history.push("/");
};

export const userLogout = () => (dispatch, getState, { history }) => {
  dispatch(clearSession());
  history.push("/");
};

export const routeRegister = () => (dispatch, getState, { history } ) => {
  history.push("/register");
};

export const routeLogin = () => (dispatch, getState, {history}) => {
  history.push("/login");
};