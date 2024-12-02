import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { deleteItemsAsync, updateItemsAsync } from "../Redux/cart/cartSlice";

const Cart = () => {

  const dispatch = useDispatch()
  const items = useSelector((state)=> state.cart.items)
  const totalAmount = (items.reduce((acc, curr)=> curr.price * curr.quantity + acc, 0)).toFixed(2);
  const totalItems = items.reduce((acc, curr)=> curr.quantity + acc, 0);
  
  function handleCart(e, product){
    const {value} = e.target
    dispatch(updateItemsAsync({...product, quantity: +value}))
  }

  function handleDelete(e, id){
    dispatch(deleteItemsAsync(id))
  }

  
  return (
    <div>
      {items.length < 1 && <Navigate to="/" />}
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
                            {product.brand}
                          </p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <p className="text-gray-500">
                          Qty
                            <select onChange={(e)=>handleCart(e, product)} className="mx-2" value={product.quantity}>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                            </select>
                             
                          </p>

                          <div className="flex">
                            <button
                            onClick={(e)=>handleDelete(e, product.id)}
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
              <p>Total Items In Cart</p>
              <p>{totalItems} Items</p>
            </div>
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>${totalAmount}</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="mt-6">
              <Link
                to={"/checkout"}
                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
              >
                Checkout
              </Link>
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
  );
};

export default Cart;
