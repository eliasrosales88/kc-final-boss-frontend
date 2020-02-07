export const getSession = state => state.session;

export const getMaxAdverts = state => getSession(state).maxAdverts;

export const isUserRegistered = state => {
  const session = getSession(state);
  return Boolean(session && session.name);
};

export const getTags = state => state.tags;

export const getAdverts = state => state.adverts;

export const getNumAdverts = state => getAdverts(state).length;

export const getNumPages = state =>
  Math.ceil(getNumAdverts(state) / getMaxAdverts(state));

export const getAdvert = state => advertId =>
  getAdverts(state).find(advert => advert._id === advertId);

export const getUi = state => state.ui;
