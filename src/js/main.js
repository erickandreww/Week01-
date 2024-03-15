import ProductData from "./ProductData.mjs";
import ProducListing from "./ProductList.mjs";

const dataSource = new ProductData("tents");
const element = document.querySelector(".product-list");

const listing = new ProducListing("tents", dataSource, element);

listing.init();