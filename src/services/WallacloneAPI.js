import Axios from 'axios';

const Wallaclone = API_URL => {
  return {
    /**
     * Registration
     */
    postRegistration: async (data) => {
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

    postAuth: async (data) => {
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


   
  };
};

export default Wallaclone;
