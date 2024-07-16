// TODO GET ELEMENTS IN HTML

const categoryWrapperText = document.querySelector("#category-wrapper-text");
let itemContainer = document.querySelector(".item-container");
let deselectedBtn = document.querySelector(".deselected-btn");
let totalCount = document.querySelectorAll(".total-count");
let totalPrice = document.querySelectorAll(".total-price");
const basketNumber = document.querySelector("#basket-number");

// TODO CATEGORY FILTER

categoryWrapperText.innerText = "All";
let getProductsFromLocal = JSON.parse(localStorage.getItem("products"));

let tempPrice = 0;
let tempNumber = 0;
let finalPrice = 0;
// TODO ADD NUMBER QUANTITY FOR UPDATE
let numberQuantity = 0;

// TODO REPLACE QUANTITY FOR PRODUCTS

function addTotalNumber(data) {
  tempNumber = 0;
  data.forEach((item) => {
    tempNumber += item.quantity;
  });
  totalCount[0].innerHTML = `${tempNumber}`;
  totalCount[1].innerHTML = `${tempNumber}`;
  basketNumber.textContent = `${tempNumber}`;
}

// TODO FUNCTION FOR CALCULATE PRICE ALL PRODUCTS

function calculateTotalPrice(data) {
  tempPrice = 0;
  data.forEach((item) => {
    console.log(item);
    tempPrice += item.price * item.quantity;
  });
  totalPrice[0].innerHTML = `${tempPrice}$`;
  totalPrice[1].innerHTML = `${tempPrice}$`;
}

// TODO FUNCTION FOR ADD FOR PRODUCT IN BASKET

function showProductOnBasket(data) {
  let actionTitle = "Delete";
  numberQuantity = 0;

  if (!data?.length) {
    itemContainer.innerHTML = `
   <div>Shopping Basket Is Empty , Add Some Products<div/>`;
    basketNumber.innerHTML = "0";
    return;
  }
  itemContainer.innerHTML = "";

  data.forEach((item) => {
    itemContainer.innerHTML += `
           <div class="flex flex-col md:flex-row gap-5 items-center justify-center text-xl" data-id="cart-wrapper" data-key="${
             item.id
           }">
                               <div>
                                    <img alt="laptop laptops mac macbook"
                                        src=${
                                          item.src
                                        } class="w-32 h-32 md:h-96 md:w-[100%]">
                                </div>
                                <div class="flex flex-col gap-2 py-4">
                                    <p class="flex">
                                        <span class="text-xl">
                                            ${item.description}
                                        </span>
                                        <span class="font-extrabold text-xl">
                                            ${item.price}$
                                        </span>
                                    </p>
                                    <p class="text-[#007600] py-1">In Stock</p>
                                    <div>
                                        <img src="./assets/images/icons/prime.webp" alt="prime icon" width="70"
                                            height="70">
                                        <div class="flex py-1 gap-1">
                                            <input type="checkbox"/>
                                            <p>
                                                This will be a gift
                                                <a class="text-[#007185] hover:text-red-600" href="#">Learn more</a>
                                            </p>
                                        </div>
                                        <div>
                                            <p>
                                                <span class="font-bold">Style Name:</span>
                                                0.5 litre work container
                                            </p>
                                            <p>
                                                <span class="font-bold">Color name:</span> white
                                            </p>
                                        </div>
                                        <div>
                                            <select
                                                id="select-option"
                                                class="rounded-[8px] focus:outline-none mt-1 shadow-sm shadow-slate-400 text-[13px] px-[6px] py-[4px] focus:border-[#008296] border-[#D5D9D9] bg-[#F0F2F2] hover:bg-[#E3E6E6] cursor-pointer border-[1px] text-xl"
                                                name="quantity">
                                                ${[
                                                  1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
                                                  11, 12, 13, 14, 15, 16, 17,
                                                  18, 19, 20, 21, 22, 23, 24,
                                                  25, 26, 27,
                                                ].map((values) => {
                                                  return `<option value=${values} ${
                                                    values == item.quantity &&
                                                    "selected"
                                                  } >Quantity: ${values}</option>`;
                                                })}
                                            </select>
                                            <span class="mx-2 max-w-[52px] text-slate-300">|</span>
                                            <button class="text-[#007185] hover:text-red-600" data-id="delete-btn" id="delete-button">Delete</button>
                                            <span class="mx-2 text-slate-300">|</span>
                                            <button class="text-[#007185] hover:text-red-600">Save for later</button>
                                            <span class="mx-2 text-slate-300">|</span>
                                            <button class="text-[#007185] hover:text-red-600">See more like this
                                            </button>
                                            <span class="mx-2 text-slate-300">|</span>
                                            <button class="text-[#007185] hover:text-red-600">Share</button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <hr class="border-slate-300 h-[3px] mb-2">
        `;
  });

  const selectOptions = document.querySelectorAll("#select-option");
  const deleteButton = document.querySelectorAll("#delete-button");
  deleteButton.forEach((element) => {
    element.innerText = actionTitle;
  });

  selectOptions.forEach((select, index) => {
    select.addEventListener("change", (event) => {
      handelChangeOption(event, actionTitle, deleteButton, index);
    });
  });

  deleteItemFromBasket(data);
}

// TODO FUNCTION FOR UPDATE AND DELETE PRODUCT

function deleteItemFromBasket(data) {
  let newBasket;
  let deletedPrice;
  const cartWrapper = document.querySelectorAll("div[data-id='cart-wrapper']");
  cartWrapper.forEach((cart) => {
    cart?.addEventListener("click", function (e) {
      const deleteButton = e.target.innerHTML;

      // TODO DELETE PRODUCT IN BASKET

      if (deleteButton == "Delete") {
        newBasket = data?.filter((product) => {
          if (e.currentTarget.dataset.key == product.id) {
            deletedPrice = product.price;
          }
          return e.currentTarget.dataset.key != product.id;
        });
        localStorage.setItem("products", JSON.stringify(newBasket));
        let temp = JSON.parse(localStorage.getItem("products"));
        showProductOnBasket(temp);
        addTotalNumber(temp);
        calculateTotalPrice(temp);

        // TODO UPDATE PRODUCT IN BASKET
      } else if (deleteButton == "Update") {
        let changeProduct = null;
        const selectedQuantity = numberQuantity;
        const itemId = event.target.closest("[data-id='cart-wrapper']").dataset
          .key;
        let products = JSON.parse(localStorage.getItem("products"));

        changeProduct = products.map((product) => {
          if (product.id == itemId) {
            product.quantity = parseInt(selectedQuantity);
          }
          return product;
        });

        localStorage.setItem("products", JSON.stringify(changeProduct));

        let temp = JSON.parse(localStorage.getItem("products"));

        showProductOnBasket(temp);
        addTotalNumber(temp);
        calculateTotalPrice(temp);
      }
    });
  });
}

// TODO FUNCTION FOR DELETED ALL PRODUCT

function emptyAll() {
  localStorage.setItem("products", JSON.stringify([]));
  getProductsFromLocal = JSON.parse(localStorage.getItem("products"));
  tempNumber = 0;
  tempPrice = 0;
  totalPrice[0].innerHTML = `${tempPrice}$`;
  totalPrice[1].innerHTML = `${tempPrice}$`;
  totalCount[0].innerHTML = `${tempNumber}`;
  totalCount[1].innerHTML = `${tempNumber}`;
  showProductOnBasket(getProductsFromLocal);
}

// FUNCTION CALLS
showProductOnBasket(getProductsFromLocal);
addTotalNumber(getProductsFromLocal);
calculateTotalPrice(getProductsFromLocal);

// TODO HANDEL CHANGE OPTION IN SELECTED NEW VALUE FOR UPGRADE PRODUCT

function handelChangeOption(event, actionTitle, deleteBtn, index) {
  actionTitle = "Update";
  deleteBtn[index].innerText = "Update";
  numberQuantity = event.target.value;
}

// ------------ CALLING FUNCTION emptyAll FOR CLEAR ALL PRODUCT IN BASKET ! ------------------

deselectedBtn.addEventListener("click", emptyAll);

