import { Route, Routes } from "react-router-dom"
import Home from "../pages/Home"
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";
import ProductDetails from "./ProductDetails";
import Private from "./Private"


const AllRoutes = () =>{
    return(
        <Routes>
            <Route path="/" element={<Private><Home/></Private>} />
            <Route path="/cart" element={<Private><CartPage/></Private>} />
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/signUp" element={<SignUpPage/>} />
            <Route path="/checkout" element={<Private><CheckoutPage/></Private>} />
            <Route path="/productDetails/:id" element={<Private><ProductDetails/></Private>} />
        </Routes>
    )
}

export default AllRoutes;