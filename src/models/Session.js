/* NPM modules */
/* Material UI */
/* Own modules */
import Config from '../config/Config';
/* Assets */
/* CSS */

/**
 * Modelo de anuncio en nodepop
 */
export default class Session {
  /**
   * Constructor
   * @param {Object} Session
   */

  constructor(
    username = null,
    email = null,
    apiUrl = Config.API_URL,
    token = null
  ) {
    this.username = username;
    this.email = email;
    this.apiUrl = apiUrl;
    this.token = token;
  }
}
