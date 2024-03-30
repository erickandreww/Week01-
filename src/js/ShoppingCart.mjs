import { getLocalStorage } from "./utils.mjs";

function productCardTemplate(product){
   return `<li class="cart-card divider">
   <a href="#" class="cart-card__image">
     <img
       src="${product.Images.PrimaryMedium}"
       alt="${product.Name}"
     />
   </a>
   <a href="#">
     <h2 class="card__name">${product.Name}</h2>
   </a>
   <p class="cart-card__color">${product.Colors[0].ColorName}</p>
   <p class="cart-card__quantity">qty: 1</p>
   <p class="cart-card__price">$${product.FinalPrice}</p>
 </li>`
}


export default class ShoppingCart{
    constructor(key, selectorP){
        this.key = key;
        this.selectorP = selectorP;
        this.total = 0;
    }

    async init(){
        const list = getLocalStorage(this.key);
        this.calListTotal(list);
        this.renderContent(list);
    }

    calListTotal(list){
      const amounts = list.map((item) => item.FinalPrice);
      this.total = amounts.reduce((amount, item) => amount + item);
    }

    renderContent(list){
      let htmlStrings = list.map((product) => productCardTemplate(product))
      document.querySelector(this.selectorP).innerHTML = htmlStrings.join("");
      document.querySelector(".cart-total").innerText += ` $${(this.total).toFixed(2)}`;
    }


}