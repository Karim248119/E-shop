import {
  handleRemoteRequest,
  handleRemoteRequestPromise,
} from "./shared/api.js";
import { card } from "./shared/ui/card.js";
import {
  drawer,
  drawerBtn,
  productsContainer,
  loading,
  allBtn,
  sideMenu,
  searchInput,
} from "./shared/ui/domElements.js";

drawerBtn.addEventListener("click", () => {
  console.log(1);
  if (drawer.classList.contains("right-0")) {
    drawer.classList.remove("right-0");
    drawer.classList.add("lg:-right-1/4", "md:-right-1/3", "-right-3/4");
  } else {
    drawer.classList.remove("lg:-right-1/4", "md:-right-1/3", "-right-3/4");
    drawer.classList.add("right-0");
  }
});

const getProductByCategory = (categoryName) => {
  productsContainer.innerHTML = "";
  handleRemoteRequest(
    `products/category/${categoryName}`,
    function (data) {
      const products = data.products;
      products.map((product, index) => {
        const productCard = document.createElement("div");
        productCard.innerHTML = card(index, product);
        productsContainer.appendChild(productCard);
      });
    },
    function (error) {
      console.log(error);
    },
    function () {
      loading.classList.remove("hidden");
      products.classList.add("hidden");
    },
    function () {
      loading.classList.add("hidden");
      products.classList.remove("hidden");
    }
  );
};
window.getProductByCategory = getProductByCategory;

export let allProducts = [];

export const getAllProductsAndCategories = () => {
  productsContainer.innerHTML = "";

  const startLoading = () => {
    loading.classList.remove("hidden");
    products.classList.add("hidden");
  };

  const stopLoading = () => {
    loading.classList.add("hidden");
    products.classList.remove("hidden");
  };

  Promise.all([
    handleRemoteRequestPromise("products", startLoading, stopLoading),
    handleRemoteRequestPromise(
      "products/category-list",
      startLoading,
      stopLoading
    ),
  ])
    .then(([productsData, categoriesData]) => {
      const products = productsData.products;
      allProducts = products;
      console.log(allProducts);
      products.map((product, index) => {
        const productCard = document.createElement("div");
        productCard.innerHTML = card(index, product);
        productsContainer.appendChild(productCard);
      });

      categoriesData.forEach((item) => {
        const cat = document.createElement("div");
        cat.innerHTML = `<button onclick="getProductByCategory('${item}')" class="hover:text-rose-500">${item}</button>`;
        sideMenu.appendChild(cat);
      });
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      stopLoading();
    });
};

getAllProductsAndCategories();

allBtn.addEventListener("click", getAllProductsAndCategories);

const searchProduct = (query) => {
  productsContainer.innerHTML = "";
  handleRemoteRequest(
    `products/search?q=${query}`,
    function (data) {
      const products = data.products;
      products.map((product, index) => {
        const productCard = document.createElement("div");
        productCard.innerHTML = card(index, product);
        productsContainer.appendChild(productCard);
      });
    },
    function (error) {
      console.log(error);
    },
    function () {
      loading.classList.remove("hidden");
      products.classList.add("hidden");
    },
    function () {
      loading.classList.add("hidden");
      products.classList.remove("hidden");
    }
  );
};

searchInput.addEventListener("keyup", () => {
  const query = searchInput.value;
  searchProduct(query);
});
