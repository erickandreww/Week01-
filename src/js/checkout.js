import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const checking  = new CheckoutProcess("so-cart", ".orderSummary");
checking.init();

document.querySelector("#zip").addEventListener("blur", myCheckout.calculateOrdertotal.bind(checking));
document.querySelector("#checkoutSubmit").addEventListener("click", (e) => {
    e.preventDefault();
    const form = document.forms[0];
    const chk_status = form.checkValidity();
    form.reportValidity();
    if (chk_status) {
        checking.checkout();
    }
});
