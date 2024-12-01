import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteItemsAsync } from "../Redux/cart/cartSlice";
import { useForm } from "react-hook-form";
import { updateUserAsync } from "../Redux/auth/authSlice";
import { addOrderDataAsync } from "../Redux/order/orderSlice";

const CheckoutPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const [selectAddress, setSelectAddress] = useState(null);
  const [selectPayment, setSelectPayment] = useState("");
  const user = useSelector((state) => state.auth.loggedIn);

  function handleAddress(e){
    const addressIndex = e.target.value
    setSelectAddress(user.addresses[addressIndex])
    console.log(e.target.value);
  }

  function handlePayment(e){
    setSelectPayment(e.target.value)
    console.log(e.target.value);
  }

  const items = useSelector((state) => state.cart.items);
  const totalAmount = items
    .reduce((acc, curr) => curr.quantity * curr.price + acc, 0)
    .toFixed(2);
  const totalItem = items.reduce((acc, curr) => acc + curr.quantity, 0);
  const dispatch = useDispatch();

  async function handleDelete(e, itemId) {
    dispatch(deleteItemsAsync(itemId));
  }

  function handleOrder(){
    const order = {items, totalAmount, totalItem, user, selectPayment, selectAddress}
    dispatch(addOrderDataAsync(order))
    // REDIRECT TO ORDER-SUCCESS PAGE
    // CLEAR CART
    // REDUCE ITEM FROM STOCK
  }

  return (
    
    <div className="mx-auto max-w-5xl px-2 sm:px-6 lg:px-8 my-10">
      <div className="grid grid-cols-1 gap-x-8=6 gap-y-10 lg:grid-cols-2">
        <div className="shadow-xl px-2">
          <form
            noValidate
            onSubmit={handleSubmit((data) => {
              dispatch(
                updateUserAsync({
                  ...user,
                  addresses: [...user.addresses, data],
                })
              );
              reset()
            })}
          >
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-xl leading-10 py-3 font-semibold text-gray-900">
                  Personal Information
                </h2>
                <p className="mt-1 text-sm/6 text-gray-600">
                  Use a permanent address where you can receive mail.
                </p>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="name"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Full name
                    </label>
                    <div className="mt-2">
                      <input
                        id="name"
                        {...register("name", { required: "Name is required" })}
                        type="text"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                      />
                      {errors.name && (
                  <p className="text-red-500">{errors.name.message}</p>
                )}
                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    <label
                      htmlFor="email"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                            message: "Email not valid",
                          },
                        })}
                        type="email"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                      />
                      {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="phone"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Phone
                    </label>
                    <div className="mt-2">
                      <input
                        id="phone"
                        {...register("phone", {
                          required: "phone is required",
                        })}
                        type="tel"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                      />
                      {errors.phone && (
                  <p className="text-red-500">{errors.phone.message}</p>
                )}
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="street-address"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Street address
                    </label>
                    <div className="mt-2">
                      <input
                        id="street"
                        {...register("street", {
                          required: "Street is required",
                        })}
                        type="text"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                      />
                      {errors.street && (
                  <p className="text-red-500">{errors.street.message}</p>
                )}
                    </div>
                  </div>

                  <div className="sm:col-span-2 sm:col-start-1">
                    <label
                      htmlFor="city"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      City
                    </label>
                    <div className="mt-2">
                      <input
                        id="city"
                        {...register("city", { required: "City is required" })}
                        type="text"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                      />
                      {errors.city && (
                  <p className="text-red-500">{errors.city.message}</p>
                )}
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="region"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      State / Province
                    </label>
                    <div className="mt-2">
                      <input
                        id="region"
                        {...register("region", {
                          required: "Region is required",
                        })}
                        type="text"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                      />
                      {errors.region && (
                  <p className="text-red-500">{errors.region.message}</p>
                )}
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="pinCode"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      ZIP / Postal code
                    </label>
                    <div className="mt-2">
                      <input
                        id="pinCode"
                        {...register("pinCode", {
                          required: "pinCode is required",
                        })}
                        type="number"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                      />
                      {errors.pinCode && (
                  <p className="text-red-500">{errors.pinCode.message}</p>
                )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end gap-x-6">
                <button
                  onClick={() => reset()}
                  type="button"
                  className="text-sm/6 font-semibold text-gray-900"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Add Address
                </button>
              </div>

              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base/7 font-semibold text-gray-900">
                  Address
                </h2>
                <p className="mt-1 text-sm/6 text-gray-600">
                  Choose from the existing one.
                </p>

                <ul role="list">
                  {user.addresses.map((ele, index) => (
                    <li
                      key={index}
                      class="flex justify-between gap-x-6 py-5 border-solid border-2 border-gray-200 p-2"
                    >
                      <div class="flex min-w-0 gap-x-4">
                        <input
                        onChange={(e)=>handleAddress(e)}
                          name="address"
                          type="radio"
                          value={index}
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <div class="min-w-0 flex-auto">
                          <p class="text-sm/6 font-semibold text-gray-900">
                            {ele.name}
                          </p>
                          <p class="mt-1 truncate text-xs/5 text-gray-500">
                            {ele.street}
                          </p>
                        </div>
                      </div>
                      <div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                        <p class="text-sm/6 text-gray-900">{ele.Phone}</p>
                        <p class="mt-1 text-xs/5 text-gray-500">
                          {ele.PinCode}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-10 space-y-10">
                  <fieldset>
                    <legend className="text-sm/6 font-semibold text-gray-900">
                      Payment Method
                    </legend>
                    <p className="mt-1 text-sm/6 text-gray-600">Choose One</p>
                    <div className="mt-6 space-y-6">
                      <div className="flex items-center gap-x-3">
                        <input
                        onChange={(e)=>handlePayment(e)}
                          id="Cash"
                          name="Payments"
                          type="radio"
                          value="cash"
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <label
                          htmlFor="Cash"
                          className="block text-sm/6 font-medium text-gray-900"
                        >
                          Cash
                        </label>
                      </div>
                      <div className="flex items-center gap-x-3">
                        <input
                        onChange={(e)=>handlePayment(e)}
                          id="Card"
                          name="Payments"
                          type="radio"
                          value="card"
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <label
                          htmlFor="Card"
                          className="block text-sm/6 font-medium text-gray-900"
                        >
                          Card Payments
                        </label>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </div>
            </div>
          </form>
        </div>

        <div>
          <div className="mx-auto max-w-5xl px-2 sm:px-6 lg:px-8 my-10">
            <div className="flex h-full flex-col bg-white shadow-xl">
              <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                <div className="flex items-start justify-between my-10">
                  <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                    Shopping cart
                  </h1>
                </div>

                <div className="mt-8">
                  <div className="flow-root">
                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                      {items.map((product) => (
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
                                {product.color}
                              </p>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                              <p className="text-gray-500">
                                Qty {product.quantity}
                              </p>

                              <div className="flex">
                                <button
                                  onClick={(e) => handleDelete(e, product.id)}
                                  type="button"
                                  className="font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                  Remove
                                </button>
                              </div>
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
                  <p>Total Items</p>
                  <p>{totalItem} Items</p>
                </div>
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>${totalAmount}</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">
                  Shipping and taxes calculated at checkout.
                </p>
                <div className="mt-6">
                  <div
                  onClick={handleOrder}
                    className="flex cursor-pointer items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                  >
                    Order Now
                  </div>
                </div>
                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                  <p>
                    or{" "}
                    <Link to={"/"}>
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Continue Shopping
                        <span aria-hidden="true"> &rarr;</span>
                      </button>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
