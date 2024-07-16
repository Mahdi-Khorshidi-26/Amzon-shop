import { productsData } from "./data.js";
const $ = document;
// --------------------- Get Dom Elements ------------------------
const specificationsBtn = $.querySelector("button[data-btn='specifications']");
const aboutItemBtn = $.querySelector("button[data-btn='about-item']");
const cartDetailBtn = $.querySelector("button[data-btn='cart-detail']");
const productDescription = $.querySelector("#product-description");
const productPrice = $.querySelectorAll(".product-price");
const productCover = $.querySelector("#product-cover");
const styleText = $.querySelector("#style-text");
const styleButtons = $.querySelectorAll("#style-btn-wrapper button");
const quantitySelectInput = $.querySelector("#quantity");
const quantityOptions = quantitySelectInput.querySelectorAll("option");
const addToCartBtn = $.querySelector("#add-to-cart-button");
const basketNumber = $.querySelector("#basket-number");
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");
const mainProduct = productsData.find((product) => product.id == productId);
let quantityProducts = 0;
let basketProducts = [];
productCover.src = mainProduct.src;
productDescription.innerText = mainProduct.description;
productPrice.forEach((price) => {
  price.innerText = mainProduct.price;
});

const getProductsFromLocal = JSON.parse(localStorage.getItem("products"));

productsData?.forEach((product) => {
  if (product.selected) {
    quantityOptions.forEach((option) => {
      if (option.value == quantitySelectInput.value) {
        option.selected = true;
        console.log(option);
      }
    });
  }
});
let findProduct = getProductsFromLocal?.find(
  (product) => product.id === mainProduct.id
);
let addToCartBtnAction = findProduct ? "remove" : "add";
addToCartBtn.innerText =
  addToCartBtnAction === "add" ? "Add to cart" : "Remove from cart";

// --------------------- Functions ------------------------
const toggleSection = (btn, sectionId, maxHeight) => {
  const btnIcon = btn.parentElement.querySelector("img");
  const section = document.querySelector(`#${sectionId}`);
  let status = "close";
  const toggle = () => {
    if (status === "close") {
      status = "open";
      section.classList.remove(`max-h-[${maxHeight}]`);
      btnIcon.className = "-rotate-90";
      btn.innerText = "See less";
    } else {
      status = "close";
      section.classList.add(`max-h-[${maxHeight}]`);
      btnIcon.className = "rotate-90";
      btn.innerText = "See more";
    }
  };
  btn.addEventListener("click", toggle);
};
toggleSection(specificationsBtn, "specifications", "240px");
toggleSection(aboutItemBtn, "about-item", "380px");
toggleSection(cartDetailBtn, "cart-detail", "160px");

styleButtons.forEach((button) => {
  button.addEventListener("click", function () {
    styleText.innerText = this.querySelector("p").innerText;
  });
});
const addProductToBasket = () => {
  const getProductsFromLocal = JSON.parse(localStorage.getItem("products"));
  //-----------------------add--------------------
  if (addToCartBtnAction === "add") {
    add(getProductsFromLocal);
  }
  // ----------------------remove--------------
  else if (addToCartBtnAction === "remove") {
    remove(getProductsFromLocal);
  }
  // ------------------update-----------------
  else if (addToCartBtnAction === "update") {
    updateMyProductsQuantity(getProductsFromLocal);
  }
  quantityProducts = 0;
};

function add(data) {
  mainProduct.quantity = +quantitySelectInput.value;
  addToCartBtnAction = "remove";
  addToCartBtn.innerText = "Remove from cart";
  mainProduct.selected = true;
  data
    ? basketProducts.push(...data, mainProduct)
    : basketProducts.push(mainProduct);
  localStorage.setItem("products", JSON.stringify(basketProducts));
  basketProducts.forEach((product) => {
    quantityProducts += product.quantity;
  });
  basketNumber.textContent = quantityProducts;

  basketProducts = [];
}

function remove(data) {
  addToCartBtnAction = "add";
  addToCartBtn.innerText = "Add to cart";
  const filterProducts = data.filter((product) => product.id != mainProduct.id);
  const removedItem = data.find((product) => product.id === mainProduct.id);
  basketNumber.textContent = +basketNumber.textContent - +removedItem.quantity;
  quantityProducts = !basketProducts.length && 0;
  localStorage.setItem("products", JSON.stringify(filterProducts));
}

function updateMyProductsQuantity(data) {
  let x = +basketNumber.textContent;
  addToCartBtnAction = "remove";
  addToCartBtn.innerText = "Remove from cart";
  let filterProductForUpdate = data?.filter((product) => {
    if (product.id === mainProduct.id) {
      product.quantity = +quantitySelectInput.value;
    }
    return true;
  });
  localStorage.setItem("products", JSON.stringify(filterProductForUpdate));
  let quantityAllProduct = JSON.parse(localStorage.getItem("products"));
  quantityAllProduct.forEach((product) => {
    quantityProducts += product.quantity;
    basketNumber.textContent = quantityProducts;
  });
}

// --------------------- Events ------------------------

quantitySelectInput.addEventListener("change", (event) => {
  basketProducts = [];
  mainProduct.quantity = +event.target.value;
  addToCartBtnAction = addToCartBtnAction === "remove" ? "update" : "add";
  if (addToCartBtnAction === "update") {
    addToCartBtn.innerText = "Update";
  }
});
addToCartBtn.addEventListener("click", addProductToBasket);
