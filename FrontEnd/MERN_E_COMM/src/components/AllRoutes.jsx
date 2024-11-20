import { Route, Routes } from "react-router-dom"
import Home from "../pages/Home"
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";
import ProductDetails from "./ProductDetails";


const AllRoutes = () =>{
    return(
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/cart" element={<CartPage/>} />
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/signUp" element={<SignUpPage/>} />
            <Route path="/signUp" element={<SignUpPage/>} />
            <Route path="/checkout" element={<CheckoutPage/>} />
            <Route path="/productDetails/:id" element={<ProductDetails/>} />
        </Routes>
    )
}

export default AllRoutes;