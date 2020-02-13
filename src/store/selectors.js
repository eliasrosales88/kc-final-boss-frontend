/**********************
 *  AUTH SELECTORS 
 **********************/
export const getAuth = state => state.auth;
export const getAuthMessage = state => state.auth.message;
export const userNotAllowed = state => state.auth.notAllowed;


/**********************
 *  SESSION SELECTORS 
 **********************/
export const getSession = state => state.session;
export const getTags = state => state.tags;



// export const getAdverts = state => state.adverts;
// export const getMaxAdverts = state => getSession(state).maxAdverts;
// export const getNumAdverts = state => getAdverts(state).length;
// export const getNumPages = state =>
//   Math.ceil(getNumAdverts(state) / getMaxAdverts(state));
// export const getAdvert = state => advertId =>
//   getAdverts(state).find(advert => advert._id === advertId);
// export const getUi = state => state.ui;
