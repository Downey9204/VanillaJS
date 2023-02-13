import ajax from "./http";

const NEWS_URL = "https://api.hnpwa.com/v0/news/@page.json";
const CONTENT_URL = "https://api.hnpwa.com/v0/item/@id.json";
const NEWS_COUNT_PER_PAGE = 30;

const app = document.querySelector("#root");
const store = {
  currentPage: 1,
};

window.addEventListener("load", init);
window.addEventListener("hashchange", setRoute);

/** Init */
function init() {
  createFeed();
}

/** Set Route */
function setRoute() {
  const path = location.hash;

  if (path === "") {
    createFeed();
  } else if (path.includes("page/")) {
    store.currentPage = Number(path.substring(7));
    createFeed();
  } else if (path.includes("detail/")) {
    createContent();
  } else console.log("404 Error");
}

/** Create Feed */
function createFeed() {
  const page = String(store.currentPage);
  const newsFeed = ajax("GET", NEWS_URL.replace("@page", page), false);
  console.log(newsFeed.length);
  const newsList = ["<ul>"];
  if (newsFeed.length) {
    for (let i = 0; i < NEWS_COUNT_PER_PAGE; i++) {
      newsList.push(`
        <li>
          <a href="#/detail/${newsFeed[i].id}">
            ${newsFeed[i].title}
          </a>
        </li>
      `);
    }
  }
  newsList.push("</ul>");
  newsList.push(`
    <div>
      <span>
        <a 
          href="#/page/${store.currentPage > 1 ? store.currentPage - 1 : 1}"
        >
          이전
        </a>
      </span>
      <span>
        <a 
          href="#/page/${
            newsFeed.length ? store.currentPage + 1 : store.currentPage
          }"
        >
          다음
        </a>
      </span>
    </div>
  `);

  app.innerHTML = newsList.join("");
}

/** Create Content */
function createContent() {
  const id = location.hash.substring(9);
  const newsContent = ajax("GET", CONTENT_URL.replace("@id", id), false);

  app.innerHTML = `
    <h1>${newsContent.title}</h1>
    <a href="#/page/${store.currentPage}">To List</a>
  `;
}
