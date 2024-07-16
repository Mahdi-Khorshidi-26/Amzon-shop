const $ = document;
// --------------------- Get Dom Elements ------------------------
const sideBarIcon = $.querySelector("#menu-icon");
const sideBar = $.querySelector("#side-bar");
const topLayer = $.querySelector("#top-layer");
const secondMenu = $.querySelector("#second-menu");
const amazonMusicItem = $.querySelector("aside main ul li");
const mainMenu = $.querySelector("#main-menu");
const categoryWrapper = $.querySelector("#category-wrapper");
const dropDownContent = categoryWrapper.parentElement.querySelector("ul");
const liElements = dropDownContent.querySelectorAll("li");
const categoryWrapperText = $.querySelector("#category-wrapper-text");
const searchInput = $.querySelector("#search-input");
const searchForm = $.querySelector("form");
const searchButton = $.querySelector("#search-button");
const basketNumber = $.querySelector("#basket-number");
let quantityProducts  = 0
let categoryWrapperStatus = false;

// --------------------- Functions ------------------------
const displayOverLayer = () => {
  topLayer.classList.add("block");
  topLayer.classList.remove("hidden");
};
const hideOverLayer = () => {
  topLayer.classList.remove("block");
  topLayer.classList.add("hidden");
};
const openSidBar = () => {
  sideBar.classList.add("translate-x-0");
  sideBar.classList.remove("-translate-x-[100%]");
  displayOverLayer();
};
const openAmazonMusic = () => {
  secondMenu.classList.remove("translate-x-[365px]");
  secondMenu.classList.add("translate-x-0");
};
const closeAmazonMusic = () => {
  secondMenu.classList.add("translate-x-[365px]");
  secondMenu.classList.remove("translate-x-0");
};
const closeSidBar = () => {
  sideBar.classList.remove("translate-x-0");
  sideBar.classList.add("-translate-x-[100%]");
  searchForm.classList.remove("outline");
  searchForm.classList.remove("outline-orange-400");
  searchForm.classList.remove("outline-[3px]");
  hideOverLayer();
};
const selectCategory = () => {
  categoryWrapperStatus = !categoryWrapperStatus;
  if (categoryWrapperStatus) {
    dropDownContent.classList.add("flex");
    dropDownContent.classList.remove("hidden");
    categoryWrapper.classList.add("outline");
  } else {
    dropDownContent.classList.remove("flex");
    dropDownContent.classList.add("hidden");
    categoryWrapper.classList.remove("outline");
  }
};
const changeCategory = (event) => {
  const { target } = event;
  categoryWrapperText.innerText = target.innerText;
  displayOverLayer();
};
const changeFormStyle = () => {
  searchForm.classList.add("outline");
  searchForm.classList.add("outline-orange-400");
  searchForm.classList.add("outline-[3px]");
  displayOverLayer();
};
const changeQuery = () => {
  let queryParams = new URLSearchParams(window.location.search);
  queryParams = "";
  if (!searchInput.value) {
    return;
  }
  searchButton.href = `index.html${
    searchInput.value.trim() ? `?query=${searchInput.value.trim()}` : ""
  }${
    categoryWrapper.innerText !== "All"
      ? `${
          searchInput.value.trim() && categoryWrapper.innerText !== "All"
            ? "&"
            : "?"
        }category=${categoryWrapper.innerText}`
      : ""
  }`;
};
const localStorageProducts = JSON.parse(localStorage.getItem("products"));
if (localStorageProducts?.length) {
  localStorageProducts.forEach(product => {
    quantityProducts += product.quantity
    basketNumber.innerHTML = quantityProducts
  })
} else {
  basketNumber.innerText = 0;
}

// --------------------- Events -----------------------

sideBarIcon.addEventListener("click", openSidBar);
topLayer.addEventListener("click", closeSidBar);
amazonMusicItem.addEventListener("click", openAmazonMusic);
mainMenu.addEventListener("click", closeAmazonMusic);
categoryWrapper.addEventListener("click", selectCategory);
liElements.forEach((li) => li.addEventListener("click", changeCategory));
searchInput.addEventListener("focus", changeFormStyle);
searchButton.addEventListener("click", changeQuery);
