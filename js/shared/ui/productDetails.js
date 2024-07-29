import { productDetails } from "./domElements.js";
export const displayProductDetails = (product) => {
  productDetails.innerHTML = `
    <div class="flex justify-center items-center row-span-3 overflow-hidden">
        <div class="md:w-[90%] md:h-[90%] w-full h-full relative">
          <div
            class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-rose-500/10 rounded-full w-1/2 aspect-square -z-10"
          ></div>
          <div
            class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-rose-500/10 rounded-full w-[60%] aspect-square -z-10"
          ></div>
          <!-- Swiper -->
          <div  class="overflow-hidden swiper-container w-full h-full">
            <div class="swiper-wrapper w-full h-full">
             
              ${product.images.map((img, index) => {
                return `
                 <div key='${index}' class="swiper-slide w-full h-full flex justify-center items-center">
                <img  src="${img}" class="md:w-[90%] w-[80%]  object-cover"
                alt="${product.name}">
                </div>
                `;
              })}
              
            </div>
            <!-- Pagination -->
            <div class="swiper-pagination"></div>
            <!-- Navigation -->
            <div class="swiper-button-next text-rose-500"></div>
            <div class="swiper-button-prev text-rose-500"></div>
          </div>
        </div>
      </div>

      <div
        class="flex justify-center items-center rounded-t-3xl bg-white row-span-4"
      >
        <div
          class="w-[90%] h-[90%] flex flex-col md:justify-center md:gap-5 gap-3"
        >
          <h1 class="font-bold md:text-3xl text-2xl text-black">
            ${product.title}
          </h1>
          <div class="flex justify-between items-center">
            <div class="flex items-center gap-2">
              <p class="font-semibold text-rose-500">${Math.round(
                product.price -
                  (product.price * product.discountPercentage) / 100
              )}$</p>
              <p class="line-through text-xs text-gray-400">(${
                product.price
              }$)</p>
            </div>

            <div
              class="lg:text-sm text-xs self-start flex gap-1 justify-center items-center"
            >
              <i class="fa-solid fa-star text-yellow-500"></i>
              <p class="font-semibold">${product.rating}</p>
            </div>
          </div>
          <div class="h-[1px] w-full md:hidden bg-rose-200"></div>
          <div class="flex  md:justify-start justify-center items-center gap-2 text-xs">
          ${product.tags.map((tag, index) => {
            return `
             <p key='${index} class="text-rose-500 p-1 bg-rose-500/10 font-bold rounded-sm">
              ${tag}
            </p>
            `;
          })}
          
          </div>
          <p class="text-xs font-light text-gray-600">
            ${product.description}
          </p>
          <div
            class="flex gap-1 items-center justify-between mt-2 text-gray-400 font-bold"
          >
            <div class="flex gap-1 items-center">
              <i class="fa-brands fa-unity"></i>
              <p class="text-xs">${product.dimensions.width} 
              x ${product.dimensions.height} x
                ${product.dimensions.depth}</p>
            </div>
            <div class="flex gap-1 items-center">
              <i class="fa-solid fa-weight-scale"></i>
              <p class="text-xs">${product.weight}kg</p>
            </div>
          </div>
          <p></p>
          <button id="addbtn" class="bg-rose-500 text-white px-4 py-2 rounded mb-2">
            Add To Cart
          </button>
        </div>
      </div>

    `;
};
document.addEventListener("DOMContentLoaded", () => {
  const productData = JSON.parse(localStorage.getItem("productData"));
  if (productData) {
    displayProductDetails(productData);
    console.log(productData);
    localStorage.removeItem("productData");
  } else {
    console.log("No product data provided");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  var swiper = new Swiper(".swiper-container", {
    slidesPerView: 1,
    spaceBetween: 10,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    grabCursor: true,
  });
});
