import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const checking  = new CheckoutProcess("so-cart", ".orderSummary");
checking.init();

document.querySelector("#zip").addEventListener("blur", myCheckout.calculateOrdertotal.bind(checking));
document.querySelector("#checkoutSubmit").addEventListener("click", (e) => {
    e.preventDefault();
    checking.checkout();
});
