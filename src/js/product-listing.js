import ExternalServices from "./ExternalServices.mjs";
import ProductListing from "./ProductListing.mjs";
import { loadHeaderFooter , getParams } from "./utils.mjs";

loadHeaderFooter();

const param = getParams("product");
const dataS = new ExternalServices();
const htmlList = document.querySelector(".product-list"); 
const productList = new ProductListing(param, dataS, htmlList);

productList.init();


