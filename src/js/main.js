import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductListing.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const dataS = new ProductData("tents");
const htmlList = document.querySelector(".product-list"); 
const productList = new ProductListing("tents", dataS, htmlList);



console.log(productList.init());