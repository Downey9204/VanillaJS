const ajax = new XMLHttpRequest();

/** Common XHR */
const getResponse = (method, url, isAsync) => {
  ajax.open(method, url, isAsync);
  ajax.send();

  return JSON.parse(ajax.response);
};

export default getResponse;
