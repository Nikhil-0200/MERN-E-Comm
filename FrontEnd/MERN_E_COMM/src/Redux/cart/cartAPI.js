import { data } from "autoprefixer";
import axios from "axios";

export async function addToCart(item) {
  try {
    let res = await axios({
      url: "http://localhost:8080/cart",
      method: "post",
      data: item,
    });

    

    return res.data;
  } catch (error) {
    throw new Error(`Failed to add item to cart: ${error}`);
  }
}

export async function fetchItemByUserId() {
  try {
    let res = await axios({
      url: `http://localhost:8080/cart`,
      method: "get",
    });
    return res.data;
  } catch (error) {
    throw new Error(`Failed to fetch item from cart: ${error}`);
  }   
}

export async function updateItems(update) {
  try {
    let res = await axios({
      url: `http://localhost:8080/cart/${update.id}`,
      method: "patch",
      data: {quantity: update.quantity},
    });
    return res.data;
  } catch (error) {
    throw new Error(`Error getting update item in cart: ${error}`);
  }
}

export async function deleteItems(itemId) {
  try {
    let res = await axios({
      url: `http://localhost:8080/cart/${itemId}`,
      method: "delete",
    });
    return itemId;
  } catch (error) {
    throw new Error(`Error occured while deleting item from cart: ${error}`);
  }
}

export async function resetCart(userId) {
  // TO Do - We wanted to reset cart and how can we do that by:
  // 1. Getting the cart item of that user by user.id (fetchItemByUserId).
  // 2. Deleting the cart item by using deleteItem function and running loop.

  try {
    const response = await fetchItemByUserId(userId);
    const items = response;
    // We Got the data
    
    // Loop for deleting every item.
    for (let item of items) {
      await deleteItems(item.id);
    }

    return `Cart reset successfully for user ${userId}`;
  } catch (error) {
    throw new Error(`Error occurred while resetting cart: ${error}`);
  }
}
