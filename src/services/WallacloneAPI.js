import Axios from "axios";

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
    getAdverts: async (params) => {
      try {
        // Endpoint
        let baseURL = `${API_URL}/adverts`;
        // Call endpoint and return
        let getResponse = await Axios.get(baseURL, {
          params,
        });

        return getResponse;
      } catch (error) {
        throw new Error(error);
      }
    },
    /**
     * Get Advert
     */
    getAdvert: async (id) => {
      try {
        // Endpoint
        let baseURL = `${API_URL}/advert`;
        // Call endpoint and return
        console.log("api", id);
        
        let getResponse = await Axios.get(baseURL, {params:{_id: id}});

        return getResponse;
      } catch (error) {
        throw new Error(error);
      }
    },
    /**
     * Get User
     */
    getUser: async (owner) => {
      try {
        // Endpoint
        let baseURL = `${API_URL}/user`;
        // Call endpoint and return
        console.log("api", owner);
        
        let getResponse = await Axios.get(baseURL, {params:{username: owner}});

        return getResponse;
      } catch (error) {
        throw new Error(error);
      }
    },
    /**
     * Get UserAdvert
     */
    getUserAdvert: async (params) => {
      try {
        // Endpoint
        let baseURL = `${API_URL}/userAdvert`;
        // Call endpoint and return
        console.log("api", params);
        
        let getResponse = await Axios.get(baseURL, {params});

        return getResponse;
      } catch (error) {
        throw new Error(error);
      }
    }
  };
};

export default Wallaclone;
