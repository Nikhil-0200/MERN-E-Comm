import axios from "axios"

const getAccessToken = () => {
    return localStorage.getItem('accessToken');
};

const getAuthHeaders = () => {
    const token = getAccessToken();
    if (token) {
      return { Authorization: `Bearer ${token}` };
    }
    return {};
}

export async function fetchLoggedInUserOrder() {
    try {
      const token = localStorage.getItem("accessToken");
  
      let res = await axios({
        url: `https://mern-e-comm-6bh8.onrender.com/orders/own`,
        method: "get",
        headers: getAuthHeaders(),
      });
      return res;
    } catch (error) {
      throw new Error(`Failed to fetch order data: ${error}`);
    }
  }

  export async function fetchLoggedInUser() {
    try {
      const token = localStorage.getItem("accessToken");
  
      let res = await axios({
        url: `https://mern-e-comm-6bh8.onrender.com/users`,
        method: "get",
        headers: getAuthHeaders(),
      });
      return res;
    } catch (error) {
      throw new Error(`Failed to fetch user data: ${error}`);
    }
  }


  export async function updateUser(update) {
    try {
      const token = localStorage.getItem("accessToken");
  
      let res = await axios({
        url: `https://mern-e-comm-6bh8.onrender.com/users/${update.id}`,
        method: "patch",
        headers: getAuthHeaders(),
        data: update,
      });
      return res.data;
    } catch (error) {
      throw new Error(`Failed to update user information: ${error}`);
    }
  }