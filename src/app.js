import { getResponse } from "./http";

const NEWS_URL = "https://api.hnpwa.com/v0/news/1.json";
const CONTENTS_URL = "https://api.hnpwa.com/v0/item/@id.json";
const root = document.querySelector("#root");

const newsPeed = getResponse("GET", NEWS_URL, false);

const createEl = () => {
  const ui = document.createElement("ul");

  for (let i = 0; i < newsPeed.length; i++) {
    ui.innerHTML += `
      <li>
        <a href="#${newsPeed[i].id}">
          ${newsPeed[i].title}
        </a>
      </li>
    `;
  }

  root.appendChild(ui);
};
createEl();
