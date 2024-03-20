import { loadHeaderFooter, getLocalStorage } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

const cart = new ShoppingCart("so-cart", ".product-list")
cart.init();
loadHeaderFooter();

if (cart.total > 0){
    let cartfooter = document.querySelector(".cart-footer-hide");
    console.log(cartfooter);
    cartfooter.style.display = "flex"
}

