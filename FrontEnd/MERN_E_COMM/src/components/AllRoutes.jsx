import { Route, Routes } from "react-router-dom"
import Home from "../pages/Home"
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";

const AllRoutes = () =>{
    return(
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/cart" element={<CartPage/>} />
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/signUp" element={<SignUpPage/>} />
            <Route path="/signUp" element={<SignUpPage/>} />
            <Route path="/checkout" element={<CheckoutPage/>} />
        </Routes>
    )
}

export default AllRoutes;