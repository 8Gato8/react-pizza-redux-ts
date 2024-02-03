const BASE_URL = 'https://6556133c84b36e3a431ef5af.mockapi.io';

/* import encodeObjToQuery from './functions/encodeObjToQuery'; */

import axios from 'axios';

const makeRequest = async (url, config, data) => {
  try {
    if (data) {
      config.data = data;
    }

    const response = await axios.get(url, config);

    return response.data;
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log('Error', error.message);
    }
    console.log(error.config);
  }
};

export const getPizzas = (params) => {
  return makeRequest('/items', { baseURL: BASE_URL, params });
};
