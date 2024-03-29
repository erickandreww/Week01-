import { getLocalStorage } from "./utils.mjs";


export default class CheckoutProcess {
    constructor(key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector; 
        this.list = [];
        this.itemTotal = 0;
        this.shipping = 0;
        this.tax = 0;
        this.orderTotal = 0;
    }

    init() {
        this.list = getLocalStorage(this.key);
        this.calculateItemSummary(); 
    }
    
    calculateItemSummary() {
        const summaryElement = document.querySelector(this.outputSelector + " #cartTotal");
        const itemNumElement = document.querySelector(this.outputSelector + " #num-items");
        itemNumElement.innerText = this.list.length;
        // calculate the total of all the items in the cart
        const amounts = this.list.map((item) => item.FinalPrice);
        this.itemTotal = amounts.reduce((sum, item) => sum + item);
        summaryElement.innerText = "$" + this.itemTotal;
      }

    calculateOrderTotal() {
        this.shipping = 10 + (this.list.length - 1) * 2;
        this.tax = (this.itemTotal * 0.06).toFixed(2);
        this.orderTotal = (
            parseFloat(this.itemTotal) +
            parseFloat(this.shipping) +
            parseFloat(this.tax)
          ).toFixed(2);
        this.displayOrderTotals();
    }

    displayOrderTotals() {
        const shippingElement = document.querySelector("#shipping");
        const taxElement = document.querySelector("#tax");
        const orderTotalElement = document.querySelector("#orderTotal");
        shippingElement.innerText = "$ " + this.shipping;
        taxElement.innerText = "$ " + this.tax;
        orderTotalElement.innerText = "$ " + this.orderTotal;
    }
}