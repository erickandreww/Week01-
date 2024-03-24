import { getLocalStorage, setLocalStorage, alertMessage, removeAlerts } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const service = new ExternalServices();
function packageItems(list){
    const itemsOrdered = list.map((product) => {
        return{
            id: product.Id,
            price: product.FinalPrice,
            name: product.Name,
            quantity: 1,
        };
        
    });
    return itemsOrdered;
}

function formDataToJson(element){
    const formData = new FormData(element), convertedJson = {};
    formData.forEach(function (value, key){
        convertedJson[key] = value;
    });
    return convertedJson;
}


export default class checkoutProcess{
    constructor(key, output){
        this.key = key;
        this.output = output;
        this.list = [];
        this.itemTotal = 0;
        this.shipping = 0;
        this.tax = 0;
        this.orderTotal = 0;
    }

    init(){
        this.list = getLocalStorage(this.key);
        this.calculateItemSummary();
    }
    calculateItemSummary(){
        const itemNumElement = document.querySelector(this.output + " #total-items");
        const SummaryElement = document.querySelector(this.output + " #cartTotal");

        itemNumElement.innerText = this.list.length;

        const amounts = this.list.map((product) => product.FinalPrice);
        this.itemTotal = amounts.reduce((sum, product) => sum + product);
        SummaryElement.innerText = `$${this.itemTotal}`;
    }

    calculateOrderTotal(){
        this.shipping = 10 + (this.list.length - 1) * 2;
        this.tax = (this.itemTotal * 0.06).toFixed(2);
        this.orderTotal = (parseFloat(this.itemTotal) + parseFloat(this.shipping) + parseFloat(this.tax)).toFixed(2);
        this.displayOrderTotals();
    }

    displayOrderTotals(){
        document.querySelector(this.output + " #shipping").innerText = `$${this.shipping}`;
        document.querySelector(this.output + " #tax").innerText = `$${this.tax}`;
        document.querySelector(this.output + " #orderTotal").innerText = `$${this.orderTotal}`;
    }

    async checkout(){
        const formElement = document.forms["checkout"];
        const json = formDataToJson(formElement);
        json.orderDate = new Date();
        json.orderTotal = this.orderTotal;
        json.tax = this.tax;
        json.shipping = this.shipping;
        json.items = packageItems(this.list);
        console.log(json);
        try {
            const res = await service.checkout(json)
            console.log(res);
            setLocalStorage("so-cart" , [])
            location.assign("../checkout/success.html");
        } catch (error) {

            removeAlerts();
            console.log(error)
            for(let message in error.message){
                alertMessage(error.message[message]);
            }
            
        }
    }
}