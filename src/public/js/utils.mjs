// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  if (getLocalStorage(key) == null){
    localStorage.setItem(key, JSON.stringify(data));
    let dataArray = [];
    dataArray = Array.from(getLocalStorage(key));
    dataArray.push(data);
    localStorage.setItem(key, JSON.stringify(dataArray));
  } else{
  let dataArray = [];
  dataArray = Array.from(getLocalStorage(key));
  dataArray.push(data);
  localStorage.setItem(key, JSON.stringify(dataArray));
  }
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}

export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  const htmlStrings = list.map(templateFn);
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.insertAdjacentHTML("afterbegin", template)
  if (callback.ok) {
    callback(data)
  }
}

export async function loadTemplate(path) {
  const html = await fetch(path).then(convertToText);
  const template = document.createElement("template");
  template.innerHTML = html;
  return template;
}

export async function loadHeaderFooter() {
  const headerLoaded = await loadTemplate("../partials/header.html")
  const footerLoaded = await loadTemplate("../partials/footer.html")
  const header = document.getElementById("main-header");
  const footer = document.getElementById("main-footer"); 
  renderWithTemplate(headerLoaded, header);
  renderWithTemplate(footerLoaded, footer);
}

// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}
