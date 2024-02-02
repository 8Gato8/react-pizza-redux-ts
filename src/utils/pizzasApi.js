import encodeObjToQuery from './functions/encodeObjToQuery';

const makeRequest = async (url, method, body) => {
  try {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, method, options);

    if (!response.ok) {
      throw new Error('Ошибка');
    }

    const result = response.json();
    return result;
  } catch (err) {
    console.log(err);
  }
};

export const getPizzas = (data) => {
  const params = encodeObjToQuery(data);
  return makeRequest(`https://6556133c84b36e3a431ef5af.mockapi.io/items?${params}`);
};
