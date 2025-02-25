import { Route, Routes } from "react-router-dom"
import Home from "../pages/Home"
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";
import ProductDetails from "./ProductDetails";
import Private from "./Private"
import PageNotFound from "../pages/404";
import OrderSuccessPage from "../pages/OrderSuccessPage";
import UserOrder from "./UserOrder"
import UserProfile from "./UserProfile";
import Logout from "./Logout"
import ForgotPass from "./ForgotPass";
import ResetPassword from "./ResetPassword";
import AdminHome from "../pages/AdminHome";
import PrivateAdmin from "./PrivateAdmin"
import AdminProductDetails from "../admin/AdminProductDetails";
import AdminProductForm from "./AdminProductForm";
import AdminProductDetailsPage from "../pages/AdminProductDetailsPage";
import AdminProductFormPage from "../pages/AdminProductFormPage";
import AdminOrdersPage from "../pages/AdminOrdersPage";
import { useSelector } from "react-redux";



const AllRoutes = () =>{
    
    return(    
        <Routes>
            <Route path="/" element={<Private><Home/></Private>} />
            <Route path="/admin" element={<PrivateAdmin><AdminHome/></PrivateAdmin>} />
            <Route path="/cart" element={<Private><CartPage/></Private>} />
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/signUp" element={<SignUpPage/>} />
            <Route path="/checkout" element={<Private><CheckoutPage/></Private>} />
            <Route path="/productDetails/:id" element={<Private><ProductDetails/></Private>} />
            <Route path="/admin/productDetails/:id" element={<PrivateAdmin><AdminProductDetails/></PrivateAdmin>} />
            <Route path="/admin/AdminProductForm" element={<PrivateAdmin><AdminProductFormPage/></PrivateAdmin>} />
            <Route path="/admin/AdminProductForm/Edit/:id" element={<PrivateAdmin><AdminProductFormPage/></PrivateAdmin>} />
            <Route path="/admin/orders" element={<PrivateAdmin><AdminOrdersPage/></PrivateAdmin>} />
            <Route path="/orderSuccess/:id" element={<OrderSuccessPage />} />
            <Route path="/orders" element={<Private><UserOrder /></Private>} />
            <Route path="/profile" element={<Private><UserProfile /></Private>} />
            <Route path="/logout" element={<Logout/>} />
            <Route path="/forgotPassword" element={<ForgotPass/>} />
            <Route path="/resetPassword" element={<ResetPassword/>} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    )
}

export default AllRoutes;