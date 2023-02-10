import ajax from "../http";

const NEWS_URL = "https://api.hnpwa.com/v0/news/@page.json";

const feed = document.createElement("ul");

/** Create Feed */
export const createFeed = () => {
  const newsFeed = ajax("GET", NEWS_URL.replace("@page", "1"), false);

  return (feed.innerHTML = newsFeed
    .map((item) => {
      return `
        <li>
          <a href="#${item.id}">
            ${item.title}
          </a>
        </li>
        `;
    })
    .join(""));
};
