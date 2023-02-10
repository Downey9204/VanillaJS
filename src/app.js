import { createFeed } from "./components/feed";
import { createContent } from "./components/content";

const app = document.querySelector("#root");

// Init when load is complete
window.addEventListener("load", init);
// Display content when hash is changed
window.addEventListener("hashchange", setRoute);

/** Init */
function init() {
  app.innerHTML = createFeed();
}

/** Set Router */
function setRoute() {
  const path = location.hash;

  if (path === "") app.innerHTML = createFeed();
  else app.innerHTML = createContent();
}

// study: Init when DOM is parsing except resource
// *window.addEventListener("DOMContentLoaded", init);
