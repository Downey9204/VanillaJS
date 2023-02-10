import ajax from "./http";

const NEWS_URL = "https://api.hnpwa.com/v0/news/@page.json";
const CONTENT_URL = "https://api.hnpwa.com/v0/item/@id.json";

const app = document.querySelector("#root");
const feed = document.createElement("ul");
const content = document.createElement("section");

/** Init when load is complete */
window.addEventListener("load", init);
/** Display content when hash is changed */
window.addEventListener("hashchange", createContent);

/** Init */
function init() {
  const newsFeed = ajax("GET", NEWS_URL.replace("@page", "1"), false);
  createFeed(newsFeed);

  app.appendChild(content);
  app.appendChild(feed);
}

/** Create Feed */
function createFeed(newsFeed) {
  for (let i = 0; i < newsFeed.length; i++) {
    const item = document.createElement("li");
    const a = document.createElement("a");
    a.href = `#${newsFeed[i].id}`;
    a.textContent = newsFeed[i].title;

    item.appendChild(a);
    feed.appendChild(item);
  }
}

/** Create Content */
function createContent() {
  const id = location.hash.substring(1);
  const newsContent = ajax("GET", CONTENT_URL.replace("@id", id), false);

  const title = document.createElement("h1");
  title.textContent = newsContent.title;

  content.innerHTML = title.innerHTML;
}
