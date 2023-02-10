import ajax from "./http";

const NEWS_URL = "https://api.hnpwa.com/v0/news/@page.json";
const CONTENT_URL = "https://api.hnpwa.com/v0/item/@id.json";
const NEWS_COUNT_PER_PAGE = 30;

const app = document.querySelector("#root");

window.addEventListener("load", init);
window.addEventListener("hashchange", setRoute);

/** Init */
function init() {
  createFeed();
}

/** Set Route */
function setRoute() {
  const path = location.hash;

  if (path === "") createFeed();
  else createContent();
}

/** Create Feed */
function createFeed() {
  const newsFeed = ajax("GET", NEWS_URL.replace("@page", "1"), false);
  const newsList = ["<ul>"];

  for (let i = 0; i < NEWS_COUNT_PER_PAGE; i++) {
    newsList.push(`
      <li>
        <a href="#${newsFeed[i].id}">
          ${newsFeed[i].title}
        </a>
      </li>
    `);
  }
  newsList.push("</ul>");

  app.innerHTML = newsList.join("");
}

/** Create Content */
function createContent() {
  const id = location.hash.substring(1);
  const newsContent = ajax("GET", CONTENT_URL.replace("@id", id), false);

  app.innerHTML = `
    <h1>${newsContent.title}</h1>
    <a href="#">To List</a>
  `;
}
