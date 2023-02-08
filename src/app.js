import { getResponse } from "./http";

const NEWS_URL = "https://api.hnpwa.com/v0/news/1.json";
const CONTENTS_URL = "https://api.hnpwa.com/v0/item/@id.json";

const newsPeed = getResponse("GET", NEWS_URL, false);
const root = document.querySelector("#root");
const ul = document.createElement("ul");

for (let i = 0; i < newsPeed.length; i++) {
  const li = document.createElement("li");
  const a = document.createElement("a");
  li.appendChild(a);
  a.setAttribute("href", `#${newsPeed[i].id}`);
  a.textContent = newsPeed[i].title;

  ul.appendChild(li);
}
root.appendChild(ul);

window.addEventListener("hashchange", () => {
  const newsContent = getResponse(
    "GET",
    CONTENTS_URL.replace("@id", location.hash.substring(1)),
    false
  );
  const section = document.createElement("section");
  const h1 = document.createElement("h1");
  h1.textContent = newsContent.title;
  section.appendChild(h1);

  const beforeSection = root.querySelector("section");
  if (beforeSection) root.removeChild(beforeSection);
  root.insertBefore(section, ul);
});
