import { data } from "autoprefixer";
import axios from "axios";

export async function addToCart(item) {
  try {
    const token = localStorage.getItem("accessToken");

    let res = await axios({
      url: "https://mern-e-comm-6bh8.onrender.com/cart",
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: item,
    });

    return res.data;
  } catch (error) {
    throw new Error(`Failed to add item to cart: ${error}`);
  }
}

export async function fetchItemByUserId() {
  try {
    const token = localStorage.getItem("accessToken");

    let res = await axios({
      url: `https://mern-e-comm-6bh8.onrender.com/cart`,
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    throw new Error(`Failed to fetch item from cart: ${error}`);
  }
}

export async function updateItems(update) {
  try {
    const token = localStorage.getItem("accessToken");

    let res = await axios({
      url: `https://mern-e-comm-6bh8.onrender.com/cart/${update.id}`,
      method: "patch",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { quantity: update.quantity },
    });
    return res.data;
  } catch (error) {
    throw new Error(`Error getting update item in cart: ${error}`);
  }
}

export async function deleteItems(itemId) {
  try {
    const token = localStorage.getItem("accessToken");

    let res = await axios({
      url: `https://mern-e-comm-6bh8.onrender.com/cart/${itemId}`,
      method: "delete",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return itemId;
  } catch (error) {
    throw new Error(`Error occured while deleting item from cart: ${error}`);
  }
}

export async function resetCart() {
  try {
    const response = await fetchItemByUserId();
    const items = response;

    if (items.length === 0) {
      return `No items in the cart to reset for the user.`;
    }

    // Loop through items and delete them one by one
    for (let item of items) {
      await deleteItems(item.id);
    }

    return `Cart reset successfully.`;
  } catch (error) {
    throw new Error(`Error occurred while resetting cart: ${error}`);
  }
}