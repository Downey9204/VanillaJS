import ajax from "./http";

const NEWS_URL = "https://api.hnpwa.com/v0/news/@page.json";
const page = "1";

const temp = ajax("GET", NEWS_URL.replace("@page", page), false);
console.log(temp);
