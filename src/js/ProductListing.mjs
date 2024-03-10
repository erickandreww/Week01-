import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product){
   return `<li class="product-card">
    <a href="product_pages/index.html?product=${product.Id}">
      <img
        src="${product.Image}"
        alt="${product.Name}"
      />
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.Name}</h2>
      <p class="product-card__price">$${product.FinalPrice}</p>  
    </a>
  </li>`
}


export default class ProductListing{
    constructor(category, dataSource, listElement){
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init(){
        const list = await this.dataSource.getData();
        const tentsNeeded = [];
        list.map(product => {if (product.Id === "880RR" || product.Id === "985RF" || product.Id === "985PR" || product.Id === "344YJ"){
            tentsNeeded.push(product);
            }
        });

        renderListWithTemplate(productCardTemplate, this.listElement, tentsNeeded);
    }


}