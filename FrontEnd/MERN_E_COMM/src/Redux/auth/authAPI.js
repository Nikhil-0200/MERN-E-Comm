import { data } from "autoprefixer";
import axios from "axios";
import { Navigate } from "react-router-dom";

export async function createUser(data) {
  try {
    let res = await axios({
      url: "https://mern-e-comm-6bh8.onrender.com/auth/signup",
      method: "post",
      data: data,
    });
    if (res.status === 201) {
      navigate("/login");
      return res.data;
    }
  } catch (error) {
    throw new Error(`Failed to create user`);
  }
}

export async function loginUser(loginInfo) {
  try {
    let res = await axios({
      url: `https://mern-e-comm-6bh8.onrender.com/auth/login`,
      method: "post",
      data: loginInfo,
    });

    // Store tokens in localStorage
    localStorage.setItem("accessToken", res.data.accessToken);
    localStorage.setItem("refreshToken", res.data.refreshToken);

    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.msg || `Invalid Login Credentials`);
  }
}

export async function checkUser() {
  try {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      return null; // No token means the user is not logged in
    }

    let res = await axios({
      url: `https://mern-e-comm-6bh8.onrender.com/auth/check`,
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return res.data;  // Assuming this contains user info when authenticated
  } catch (error) {
    return null; // If an error occurs (e.g., token expired), assume user is not logged in
  }
}

  

export async function logout() {
  try {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      throw new Error("No token found");
    }

    await axios.post("https://mern-e-comm-6bh8.onrender.com/auth/blacklist", { token });

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    // Return a success message or flag
    return "User Logout Successfully";
  } catch (error) {
    throw new Error(`Failed to Logout: ${error.message}`);
  }
}


export async function resetPasswordRequest(email) {
  try {
    let res = await axios({
      url: `https://mern-e-comm-6bh8.onrender.com/auth/resetPasswordRequest`,
      method: "post",
      data: { email: email },
    });

    return res.data;
  } catch (error) {
    return error;
  }
}

// export async function updateUser(update){
//     try {
//         let res = await axios({
//             url: `https://mern-e-comm-6bh8.onrender.com/users/${update.id}`,
//             method: "patch",
//             data: update
//         })
//         return res.data
//     } catch (error) {
//         throw new Error(`Failed to update address`)
//     }
// }

// We were using updateUser first in Auth but now have moved to userAPI.
