const BASE_URL = 'https://6556133c84b36e3a431ef5af.mockapi.io';

import axios from 'axios';

const makeRequest = async (url) => {
  try {
    const response = await axios.get(url);

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
    return Promise.reject(error);
  }
};

export const getPizzas = (params) => {
  return makeRequest(`${BASE_URL}/items?${params}`);
};

export const getPizzaById = (id) => {
  return makeRequest(`${BASE_URL}/items/${id}`);
};
