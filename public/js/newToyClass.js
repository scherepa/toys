class NewToy{
    constructor(_parent, _item){
        this.parent = _parent;
        this.name = _item.name;
        this.image = _item.img_url;
        this.price = _item.price;
        this.cat = _item.category;
    }
      render() {
    let newDiv = document.createElement("div");
    newDiv.className = "col shadow-sm border border-info rounded p-1";
    document.querySelector(this.parent).append(newDiv);
    /* newDiv.style.minHeight="202px"; */

    newDiv.innerHTML += `<div class="card d-flex flex-column flex-lg-row border-0 justify-content-between align-items-center align-items-lg-start">
      <div style="height:200px;">
        <img src="${this.image}" alt="${this.name} "class="h-100">
      </div>
      <div class="card-body text-center d-flex flex-column justify-content-between">
        <p class="fw-bold">NAME: ${this.name}
        <br><em>CAT: ${this.cat}</em></p>
        <div class="align-self-center">PRICE: ${this.price} NIS</div>
      </div>
  </div>
    `
  }

}