import ajax from "./http";

const app = document.querySelector("#root");
const NEWS_URL = "https://api.hnpwa.com/v0/news/@page.json";
const CONTENT_URL = "https://api.hnpwa.com/v0/item/@id.json";
const newsFeed = ajax("GET", NEWS_URL.replace("@page", "1"), false);

const feed = document.createElement("ul");
for (let i = 0; i < newsFeed.length; i++) {
  const item = document.createElement("li");
  const a = document.createElement("a");
  a.href = `#${newsFeed[i].id}`;
  a.textContent = newsFeed[i].title;

  item.appendChild(a);
  feed.appendChild(item);
}

const content = document.createElement("section");
window.addEventListener("hashchange", () => {
  const id = location.hash.substring(1);
  const newsContent = ajax("GET", CONTENT_URL.replace("@id", id), false);

  const title = document.createElement("h1");
  title.textContent = newsContent.title;

  content.appendChild(title);
});

app.appendChild(feed);
app.appendChild(content);
