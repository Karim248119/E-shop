import { allProducts } from "../script.js";
import { displayItems } from "./ui/displayCart.js";
import { quantity } from "./ui/domElements.js";

class Cart {
  constructor() {
    this.cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    this.init();
  }

  init() {
    this.updateQuantityDisplay();
  }

  saveCartItems() {
    localStorage.setItem("cart", JSON.stringify(this.cartItems));
  }

  addToCart(productId) {
    const product = allProducts.find((item) => item.id === productId);
    const existItem = this.cartItems.find((item) => item.id === productId);
    if (existItem) {
      existItem.quantity += 1;
    } else {
      this.cartItems.push({ ...product, quantity: 1 });
    }
    this.saveCartItems();
    this.updateQuantityDisplay();
    this.getQuantity();
    displayItems();
  }

  deleteItem(itemId) {
    const index = this.cartItems.findIndex((product) => product.id === itemId);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
      this.saveCartItems();
      this.updateQuantityDisplay();
      displayItems();
    }
  }

  updateQuantityDisplay() {
    quantity.innerHTML =
      "0" || this.cartItems.length ? this.cartItems.length : "";
  }

  increaseQuantity(itemId) {
    const existItem = this.cartItems.find((item) => item.id === itemId);
    if (existItem) {
      existItem.quantity += 1;
      this.saveCartItems();
      this.updateQuantityDisplay();
      this.getQuantity();
      displayItems();
    }
  }

  decreaseQuantity(itemId) {
    const existItem = this.cartItems.find((item) => item.id === itemId);
    if (existItem) {
      if (existItem.quantity > 1) {
        existItem.quantity -= 1;
      } else {
        this.deleteItem(itemId);
      }
      this.saveCartItems();
      this.updateQuantityDisplay();
      this.getQuantity();
      displayItems();
    }
  }

  getCartItems() {
    return this.cartItems;
  }
  getQuantity() {
    return this.cartItems.length;
  }
}

const cart = new Cart();

export const addToCart = (productId) => cart.addToCart(productId);
export const deleteItem = (itemId) => cart.deleteItem(itemId);
export const increaseQuantity = (itemId) => cart.increaseQuantity(itemId);
export const decreaseQuantity = (itemId) => cart.decreaseQuantity(itemId);

export const getCartItems = () => cart.getCartItems();
export const getQuantity = () => cart.getQuantity();

window.addToCart = addToCart;
window.deleteItem = deleteItem;
window.increaseQuantity = increaseQuantity;
window.decreaseQuantity = decreaseQuantity;
displayItems();
getQuantity();
