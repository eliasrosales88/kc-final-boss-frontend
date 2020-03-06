import Axios from "axios";
import LocalStorage from "../utils/Storage";

Axios.interceptors.request.use(
  (config) => {
    let session = LocalStorage.readLocalStorage();
    
    if (
      session !== null &&
      session.token &&
      !config.url.includes("/apiv1/register") &&
      !config.url.includes("/apiv1/authenticate") 
      ) {
      config.headers = {...config.headers, Authorization: session.token}
    }
    return config
  },
  (error) => Promise.reject(error)
)


const Wallaclone = API_URL => {
  return {
    /**
     * Registration
     */
    postRegistration: async data => {
      try {
        // Endpoint
        let baseURL = `${API_URL}/register`;
        // Call endpoint and return
        let postResponse = await Axios.post(baseURL, data);

        return postResponse;
      } catch (error) {
        throw new Error(error);
      }
    },

    /**
     * Auth
     */
    postAuth: async data => {
      try {
        // Endpoint
        let baseURL = `${API_URL}/authenticate`;
        // Call endpoint and return
        let postResponse = await Axios.post(baseURL, data);

        return postResponse;
      } catch (error) {
        throw new Error(error);
      }
    },

    /**
     * Get Adverts
     */
    getAdverts: async params => {
      try {
        // Endpoint
        let baseURL = `${API_URL}/adverts`;
        // Call endpoint and return
        let getResponse = await Axios.get(baseURL, {
          params
        });

        return getResponse;
      } catch (error) {
        throw new Error(error);
      }
    },
    /**
     * Get Adverts
     */
    getAccountAdverts: async params => {
      try {

        // Endpoint
        let baseURL = `${API_URL}/account`;
        // Call endpoint and return
        let getResponse = await Axios.get(baseURL, {
          params
        });

        return getResponse;
      } catch (error) {
        throw new Error(error);
      }
    },
    /**
     * Get Account Advert
     */
    getAccountAdvert: async (id, token) => {
      try {

        // Endpoint
        let baseURL = `${API_URL}/account/advert`;
        // Call endpoint and return
        let getResponse = await Axios.get(baseURL, { params: { _id: id, token } });

        return getResponse;
      } catch (error) {
        throw new Error(error);
      }
    },
    /**
     * Update Account Advert
     */
    updateAccountAdvert: async (params) => {
      try {

        // Endpoint
        let baseURL = `${API_URL}/account/advert`;
        // Call endpoint and return
        let patchResponse = await Axios.patch(baseURL, params.body, {headers: params.headers});

        return patchResponse;
      } catch (error) {
        throw new Error(error);
      }
    },
    /**
     * Get Advert
     */
    getAdvert: async id => {
      try {
        // Endpoint
        let baseURL = `${API_URL}/advert`;
        // Call endpoint and return

        let getResponse = await Axios.get(baseURL, { params: { _id: id } });

        return getResponse;
      } catch (error) {
        throw new Error(error);
      }
    },
    /**
     * Get User
     */
    getUser: async owner => {
      try {
        // Endpoint
        let baseURL = `${API_URL}/user`;
        // Call endpoint and return

        let getResponse = await Axios.get(baseURL, {
          params: { username: owner }
        });

        return getResponse;
      } catch (error) {
        throw new Error(error);
      }
    },
    /**
     * Get UserAdvert
     */
    getUserAdvert: async params => {
      try {
        // Endpoint
        let baseURL = `${API_URL}/userAdvert`;
        // Call endpoint and return

        let getResponse = await Axios.get(baseURL, { params });

        return getResponse;
      } catch (error) {
        throw new Error(error);
      }
    },
    /**
     * Post UserAdvert
     */
    postUserAdvert: async params => {
      try {
        // Endpoint
        let baseURL = `${API_URL}/account/advert`;
        // Call endpoint and return

        let postResponse = await Axios.post(baseURL, params.body, {headers: params.headers});

        return postResponse;
      } catch (error) {
        throw new Error(error);
      }
    },
    /**
     * Delete account advert
     */
    deleteAccountAdvert: async id => {
      try {
        // Endpoint
        let baseURL = `${API_URL}/account/advert`;
        // Call endpoint and return

        let deleteResponse = await Axios.delete(baseURL, { data: { _id: id } });

        return deleteResponse;
      } catch (error) {
        throw new Error(error);
      }
    },
    /**
     * Delete account user
     */
    deleteAccountUser: async username => {
      try {
        // Endpoint
        let baseURL = `${API_URL}/account/user`;
        // Call endpoint and return

        let deleteResponse = await Axios.delete(baseURL, { data: { username } });

        return deleteResponse;
      } catch (error) {
        throw new Error(error);
      }
    }
  };
};

export default Wallaclone;
