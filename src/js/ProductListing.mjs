import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product){
   return `<li class="product-card">
    <a href="../product_pages/index.html?product=${product.Id}">
      <img
        src="${product.Images.PrimaryMedium}"
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
        const list = await this.dataSource.getData(this.category);
        console.log(list);
        renderListWithTemplate(productCardTemplate, this.listElement, list);
        const title = document.querySelector(".product-c");
        title.innerHTML = "Top Products: " + this.category.charAt(0).toUpperCase() + this.category.slice(1);
    }


}