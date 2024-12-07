import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLoggedInUserOrderAsync } from "../Redux/user/userSlice";

const UserOrder = () => {
  const user = useSelector((state) => state.auth.loggedIn);
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.user.order);

  useEffect(() => {
    dispatch(fetchLoggedInUserOrderAsync(user.id));
  }, []);

  return (
    <div>
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 px-20 pt-20">
              My Orders
      </h1>
      {orders &&
        orders.map((orders, index) => (
          <div key={index}>
            {orders.length < 1 && <Navigate to="/" />}
            <div className="mx-auto max-w-5xl px-2 sm:px-6 lg:px-8 my-10">
              <div className="flex h-full flex-col bg-white shadow-xl">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between my-10">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                      Order # {orders.id}
                    </h1>
                  </div>

                  <div className="mt-8">
                    <div className="flow-root">
                      <p className="flex justify-between text-base font-medium text-red-500 pb-4">
                        Order status: {orders.status}
                      </p>
                      <ul
                        role="list"
                        className="-my-6 divide-y divide-gray-200"
                      >
                        {orders.items.map((product) => (
                          <li key={product.id} className="flex py-6">
                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <img
                                alt={product.title}
                                src={product.images[0]}
                                className="h-full w-full object-cover object-center"
                              />
                            </div>

                            <div className="ml-4 flex flex-1 flex-col">
                              <div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                  <h3>
                                    <a href={product.href}>{product.title}</a>
                                  </h3>
                                  <p className="ml-4">{product.price}</p>
                                </div>
                                <p className="mt-1 text-sm text-gray-500">
                                  {product.brand}
                                </p>
                              </div>
                              <div className="flex flex-1 items-end justify-between text-sm">
                                <p className="text-gray-500">
                                  Qty: {product.quantity}
                                </p>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Total Items In Cart</p>
                    <p>{orders.totalItems} Items</p>
                  </div>
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>${orders.totalAmount}</p>
                  </div>
                </div>

                <div className="flex justify-between gap-x-6 py-5 border-solid border-2 border-gray-200 p-2">
                  <div className="flex min-w-0 gap-x-4">
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm/6 font-semibold text-gray-900">
                        {orders.selectAddress.name}
                      </p>
                      <p className="mt-1 truncate text-xs/5 text-gray-500">
                        {orders.selectAddress.street}
                      </p>
                    </div>
                  </div>

                  <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                    <p className="text-sm/6 text-gray-900 font-semibold">
                      {orders.selectAddress.phone}
                    </p>
                    <p className="mt-1 text-xs/5 text-gray-500">
                      {orders.selectAddress.pinCode}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default UserOrder;
