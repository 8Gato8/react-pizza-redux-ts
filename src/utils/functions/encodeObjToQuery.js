const encodeObjToQuery = (data) => {
  const params = new URLSearchParams();
  for (const key in data) {
    if (Array.isArray(data[key])) {
      for (const chunk of data[key]) {
        params.append(`${key}`, chunk);
      }
    } else {
      params.append(`${key}`, data[key]);
    }
  }

  return params.toString();
};

export default encodeObjToQuery;
