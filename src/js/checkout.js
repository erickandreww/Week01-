import { loadHeaderFooter } from "./utils.mjs";
import checkoutProcess from "./checkoutProcess.mjs";

loadHeaderFooter();

const checking = new checkoutProcess("so-cart", ".summary");
checking.init();

document.querySelector("#zip").addEventListener("blur", checking.calculateOrderTotal.bind(checking));
document.querySelector("#checkSubmit").addEventListener("click", (e) => {
    e.preventDefault();

    checking.checkout();
})