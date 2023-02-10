import ajax from "./http";

const NEWS_URL = "https://api.hnpwa.com/v0/news/@page.json";
const CONTENT_URL = "https://api.hnpwa.com/v0/item/@id.json";

const app = document.querySelector("#root");
const feed = document.createElement("ul");
const content = document.createElement("section");

/** Init when load is complete */
window.addEventListener("load", init);
/** Display content when hash is changed */
window.addEventListener("hashchange", setRoute);

/** Init */
function init() {
  createFeed();
}

/** Setting Router */
function setRoute() {
  const path = location.hash;

  if (path === "") createFeed();
  else createContent();
}

/** Create Feed */
function createFeed() {
  const newsFeed = ajax("GET", NEWS_URL.replace("@page", "1"), false);

  feed.innerHTML = newsFeed
    .map((item) => {
      return `
        <li>
          <a href="#${item.id}">
            ${item.title}
          </a>
        </li>
        `;
    })
    .join("");

  app.innerHTML = feed.innerHTML;
}

/** Create Content */
function createContent() {
  const id = location.hash.substring(1);
  const newsContent = ajax("GET", CONTENT_URL.replace("@id", id), false);

  content.innerHTML = `
    <h1>${newsContent.title}</h1>
    <a href="#">To List</a>
  `;

  app.innerHTML = content.innerHTML;
}
