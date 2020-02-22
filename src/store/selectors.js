/**********************
 *  AUTH SELECTORS 
 **********************/
export const getAuth = state => state.auth;
export const getAuthMessage = state => state.auth.message;
export const userNotAllowed = state => state.auth.notAllowed;
export const getToken = state => state.auth.token;


/**********************
 *  SESSION SELECTORS 
 **********************/
export const getSession = state => state.session;

/**********************
 *  ADVERT SELECTORS 
 **********************/
export const getAdverts = state => state.adverts;
export const getPaginatorCount = state => state.adverts.paginatorCount
export const getAdvert = state => state.advert;

/**********************
 *  USER SELECTORS 
 **********************/
export const getUser = state => state.user;

 /**********************
 *  TAGS SELECTORS 
 **********************/
export const getTags = state => state.tags;


/**********************
 *  UI 
 **********************/
 export const getUi = state => state.ui;

 
// export const getAdverts = state => state.adverts;
// export const getMaxAdverts = state => getSession(state).maxAdverts;
// export const getNumAdverts = state => getAdverts(state).length;
// export const getAdvert = state => advertId =>
//   getAdverts(state).find(advert => advert._id === advertId);
