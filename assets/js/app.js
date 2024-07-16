import { productsData } from "./data.js";
const $ = document;
// --------------------- Get Dom Elements ------------------------
const sliderWrapper = $.querySelector("#slider-item");
const previousBtn = $.querySelector("#previous-btn");
const nextBtn = $.querySelector("#next-btn");
const productsWrapper = document.querySelector("#products-wrapper");
const categoryWrapperText = $.querySelector("#category-wrapper-text");
let slideNumber = 0;
localStorage.setItem("allProducts", JSON.stringify(productsData));
export const getAllProductsFromLocal = JSON.parse(
  localStorage.getItem("allProducts")
);
// --------------------- Functions ------------------------
const generateSliderItem = () => {
  sliderWrapper.style.transform = `translateX(-${slideNumber * 100}%)`;
};
const previousSlide = () => {
  slideNumber--;
  if (slideNumber < 0) {
    slideNumber = 3;
  }
  generateSliderItem();
};
const nextSlide = () => {
  slideNumber++;
  if (slideNumber > 3) {
    slideNumber = 0;
  }
  generateSliderItem();
};
setInterval(() => {
  nextSlide();
}, 5000);
export const generateProductCart = (productsList) => {
  return productsList?.length
    ? productsList?.forEach((product) => {
        productsWrapper.innerHTML += `
                     <div class="cursor-pointer bg-white p-3 product md:w-[calc(20%-8px)]">
                            <a href=./product.html?id=${
                              product.id
                            } class="flex flex-col">
                                <div class="relative aspect-square overflow-hidden">
                                    <img alt="laptops" class="object-cover p-10 size-full md:w-full md:h-full"
                                        src=${product.src}>
                                </div>
                                <hr class="border-slate-300 mb-2 w-full border-[0.1px]">
                                <div class="self-start">
                                    <div class="flex gap-[1px]">
                                        <p class="self-start mt-[7px]">$</p>
                                        <p class="self-stretch font-bold text-[25px]">${
                                          product.discount
                                        }</p>
                                        <p class="font-semibold self-start mt-[7px]">99</p>
                                    </div>
                                </div>
                                <p class="line-through self-start -mt-[7px] text-[13px] md:text-[7px] md:font-normal">$${
                                  product.price
                                }</p>
                                <p class="p text-[15px] mt-2">
                                    ${
                                      product.description.length > 102
                                        ? `${product.description.slice(
                                            0,
                                            102
                                          )}...`
                                        : product.description
                                    }
                                </p>
                                <div class="flex p-[2px] gap-1 self-start items-center md:flex-col">
                                    <div class="flex gap-1">
                                        <img src="./assets/images/icons/star.png" alt="star icon" width="15" height="15">
                                        <img src="./assets/images/icons/star.png" alt="star icon" width="15" height="15">
                                        <img src="./assets/images/icons/star.png" alt="star icon" width="15" height="15">
                                        <img src="./assets/images/icons/star.png" alt="star icon" width="15" height="15">
                                        <img src="./assets/images/icons/star.png" alt="star icon" width="15" height="15">
                                    </div>
                                    <p class="self-center mt-[2px] text-[12px]">1,752</p>
                                </div>
                                <a href=./product.html?id=${product.id}
                                    class="hover:text-red-600 hover:-translate-y-[1px] self-start mt-3 ml-[3px]">
                                    see more...
                                </a>
                            </a>
                        
                        
        `;
      })
    : (productsWrapper.innerHTML = `
    <div class="w-full h-screen">
        <p class="p-3 flex items-center justify-center h-[300px] text-2xl bg-[#f5f6f6]">
            Sorry, There is no item match your search :-( Please try again.
        </p>
    </div>
    `);
};

// --------------------- Events ------------------------
window.addEventListener("load", () => {
  // Search AND Filter Products
  let queryParams = new URLSearchParams(window.location.search);
  const category = queryParams.get("category");
  const productName = queryParams.get("query");
  // searchInput.value = productName
  categoryWrapperText.innerText = !category ? "All" : category;

  if (!category && !productName?.trim()) {
    generateProductCart(productsData);
  }
  if (category && !productName) {
    const filterProducts = productsData.filter(
      (product) => product.category == category
    );
    generateProductCart(filterProducts);
  }
  if (!category && productName) {
    const filterProducts = productsData.filter((product) =>
      product?.description
        ?.toLowerCase()
        .trim()
        .includes(productName?.toLowerCase().trim())
    );
    generateProductCart(filterProducts);
  }
  if (category && productName) {
    const filterProducts = productsData.filter(
      (product) =>
        product.category == category &&
        product?.description
          ?.toLowerCase()
          .trim()
          .includes(productName?.toLowerCase().trim())
    );
    generateProductCart(filterProducts);
  }
});
previousBtn.addEventListener("click", previousSlide);
nextBtn.addEventListener("click", nextSlide);
