import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { resetCartAsync } from "../Redux/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { resetOrder } from "../Redux/order/orderSlice";
import { Footer } from "../components/Footer";

const OrderSuccessPage = () =>{
  const user = useSelector((state)=> state.auth.loggedIn)
  const userInfo = useSelector((state)=> state.user.userInfo)
  const dispatch = useDispatch()
  const {id} = useParams();

  useEffect(()=>{
    // Cart Reset
    dispatch(resetCartAsync(userInfo.id))

    // Current Order Reset
    dispatch(resetOrder())
  }, [dispatch, userInfo])

    return (
        <>
        {!id && <Navigate to="/" />}
          <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
            <div className="text-center">
              <p className="text-base font-semibold text-indigo-600">Order Successfully Placed</p>
              <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
                Order Number #{id}
              </h1>
              <p className="mt-6 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
                You can check your order in My Account > My Orders
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                to={"/"}
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Go back home
                </Link>
              </div>
            </div>
          </main>
      <Footer />

        </>
      )
}

export default OrderSuccessPage;