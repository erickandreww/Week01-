import { getLocalStorage, setLocalStorage, alertMessage, removeAlerts } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const extServices = new ExternalServices();

function packageItems(items) {
    const simpleItems = items.map((product) => {
        return {
            id: product.Id,
            price: product.FinalPrice, 
            name: product.Name, 
            quantity: 1,
        };
    });
    return simpleItems;
}

function formDataToJSON(formElement) {
    const formData = new FormData(formElement), convertedJSON = {};
    formData.forEach(function (value, key) {
      convertedJSON[key] = value;
    });
    return convertedJSON;
}

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
        const itemNumElement = document.querySelector(this.output + " #total-items");
        const summaryElement = document.querySelector(this.output + " #cartTotal");
        itemNumElement.innerText = this.list.length;
        // calculate the total of all the items in the cart
        const amounts = this.list.map((item) => item.FinalPrice);
        this.itemTotal = amounts.reduce((sum, item) => sum + item);
        summaryElement.innerText = "$" + this.itemTotal;
      }

    calculateOrderTotal() {
        this.shipping = 10 + (this.list.length - 1) * 2;
        this.tax = (this.itemTotal * 0.06).toFixed(2);
        this.orderTotal = (parseFloat(this.itemTotal) + parseFloat(this.shipping) +
            parseFloat(this.tax)).toFixed(2);
        this.displayOrderTotals();
    }

    displayOrderTotals() {
        const shipping = document.querySelector(this.outputSelector + " #shipping");
        const tax = document.querySelector(this.outputSelector + " #tax");
        const orderTotal = document.querySelector(
          this.outputSelector + " #orderTotal"
        );
        shipping.innerText = "$" + this.shipping;
        tax.innerText = "$" + this.tax;
        orderTotal.innerText = "$" + this.orderTotal;
    }

    async checkout() {
        const formElement = document.forms["checkout"];
        const json = formDataToJSON(formElement);
        json.orderData = new Date();
        json.orderTotal = this.orderTotal;
        json.tax = this.tax;
        json.shipping = this.shipping;
        json.items = packageItems(this.list);
        console.log(json);
        try {
            const res = await extServices.checkout(json);
            console.log(res);
        } 
        catch (err) {
            console.log(err);
        }
    }
}