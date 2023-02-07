const ajax = new XMLHttpRequest();

export const getResponse = (method, url, isAsync) => {
  ajax.open(method, url, isAsync);
  ajax.send();

  return JSON.parse(ajax.response);
};
