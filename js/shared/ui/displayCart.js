import {
  getCartItems,
  increaseQuantity,
  decreaseQuantity,
  deleteItem,
} from "../cart.js";
import { cart } from "./domElements.js";

export const displayItems = () => {
  const items = getCartItems();
  console.log(items);
  cart.innerHTML = "";
  items.map((item) => {
    const row = document.createElement("div");
    row.classList.add(
      "flex",
      "justify-between",
      "items-center",
      "p-2",
      "border-b-2",
      "border-gray-200",
      "hover:bg-gray-100"
    );
    row.innerHTML = `
      <div class="w-full items-center md:p-3 p-1 grid grid-cols-12  ">
        <button
          class="md:w-5 md:h-5 h-3 w-3 rounded-full flex justify-center items-center bg-rose-500 text-white col-span-2"
          onclick="deleteItem(${item.id})"
        >
          <i class="fa-solid md:text-xs text-[5px] fa-x "></i>
        </button>
        <div class="flex flex-col justify-between items-start col-span-8 ">
          <div class="font-bold md:text-base text-[8px] text-start">${
            item.title
          }</div>
          <div class="flex flex-row items-center w-full md:text-xs text-[8px]">
            <p class="mr-2 md:text-base ">Price:</p>
            <div class="text-rose-500">${item.quantity}</div> 
            <span class="mx-1">x</span>
            <div>${Math.round(item.price)}$</div>
            <i class="fa-solid fa-right-long mx-1 text-rose-500"></i>
            <div class="font-semibold">${
              Math.round(item.price) * item.quantity
            }$</div>
          </div>
        </div>
        <div class="flex flex-col justify-center items-center md:gap-3 md:text-base text-[8px] col-span-2 ">
          <button onclick="increaseQuantity(${item.id})">
            <i class="fa-solid fa-square-caret-up hover:text-rose-500"></i>
          </button>
          <button onclick="decreaseQuantity(${item.id})">
            <i class="fa-solid fa-square-caret-down hover:text-rose-500"></i>
          </button>
        </div>
      </div>`;
    cart.appendChild(row);
  });
};
