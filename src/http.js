const ajax = new XMLHttpRequest();

/** Get server data by XHR */
export default function getData(method, url, isAsync) {
  ajax.open(method, url, isAsync);
  ajax.send();

  return JSON.parse(ajax.response);
}
