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
 localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParams(param){
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}

export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false ){
  const htmlStrings = list.map(templateFn);
  if (clear){
    parentElement.innerHTML = "";
  }

  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export function renderWithTemplate(templateFn, parentElement, data, callbackD, position = "afterbegin"){
  parentElement.insertAdjacentHTML(position, templateFn);
  if (callbackD){
    callbackD(data);
  }
}

async function loadTemplate(path){
  const res = await fetch(path);
  const html = await res.text();
  let template = document.createElement("template");
  template.innerHTML = html;
  return template.innerHTML;
}

export async function loadHeaderFooter(){
  const headerTemplate = await loadTemplate("../partials/header.html");
  const headerElement = document.getElementById("main-header");
  const footerTemplate = await loadTemplate("../partials/footer.html");
  const footerElement = document.getElementById("main-footer");
  renderWithTemplate(headerTemplate,headerElement);
  renderWithTemplate(footerTemplate, footerElement);
}

export function alertMessage(message, scroll=true){
  const alert = document.createElement("div");
  alert.classList.add("alert");

  alert.innerHTML = `<p>${message}<span>X</span></p>`;
  const main = document.querySelector("main");
  main.prepend(alert);

  alert.addEventListener("click", function(e){
    if(e.target.tagName == "SPAN"){
      main.removeChild(this);
    }
  })

  
  if(scroll)
  window.scrollTo(0,0);
}

export function removeAlerts(){
  const alerts = document.querySelectorAll(".alert");
  alerts.forEach(alert => {
    document.querySelector("main").removeChild(alert);
  });
}