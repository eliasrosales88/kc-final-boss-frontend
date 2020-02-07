/**
 * Objeto para trabajar con local storage
 */
const LocalStorage = {
  /**
   * Salvar sesión en local storage
   */
  saveLocalStorage: session => {
    localStorage.setItem('Wallaclone', JSON.stringify(session));
  },
  /**
   * Recuperar sesión del local storage
   */
  readLocalStorage: () => {
    const session = localStorage.getItem('Wallaclone');
    return JSON.parse(session);
  },
  /**
   * Clear local storage
   */
  clearLocalStorage: () => {
    localStorage.clear();
  },
};

/**
 * Retorno el objeto
 */
export default LocalStorage;
