import ajax from "../http";

const CONTENT_URL = "https://api.hnpwa.com/v0/item/@id.json";

const content = document.createElement("section");

/** Create Content */
export const createContent = () => {
  const id = location.hash.substring(1);
  const newsContent = ajax("GET", CONTENT_URL.replace("@id", id), false);

  content.innerHTML = `
    <h1>${newsContent.title}</h1>
    <a href="#">To List</a>
  `;

  return content.innerHTML;
};
