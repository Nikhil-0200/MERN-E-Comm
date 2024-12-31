import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllOrdersAsync,
  updateOrdersAsync,
} from "../Redux/order/orderSlice";
import {
  EyeIcon,
  PencilIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";

import {
  ArrowDownCircleIcon,
  ArrowUpCircleIcon,
} from "@heroicons/react/24/solid";
import { Pagination } from "../components/Pagination";

const AdminOrders = () => {
  const [statusEdit, setStatusEdit] = useState(-1);
  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.order.orders);
  const totalOrders = useSelector((state) => state.order.totalOrders);
  const [page, setPage] = useState(1);
  const limit = 4;
  const [sort, setSort] = useState({});

  console.log(orderDetails);

  const totalPages = Math.ceil(totalOrders / limit);
  const indexOfLastItem = limit * page;
  const indexOfFirstItem = indexOfLastItem - limit;

  // console.log(totalOrders);
  // console.log(orderDetails);

  const centralFn = () => {
    const queryData = { ...sort, _page: page, _limit: limit };
    dispatch(fetchAllOrdersAsync(queryData));
  };

  const handlePagination = (newPage) => {
    setPage(newPage);
  };

  const handleSort = (sortOption) => {
    const sort = { _sort: sortOption.sort, _order: sortOption.order };
    setSort({ ...sort });
  };

  useEffect(() => {
    centralFn();
  }, [page, sort]);

  const handleEdit = (id) => {
    setStatusEdit(id);
  };

  const handleUpdate = (e, order) => {
    const updatedOrder = { ...order, status: e.target.value };
    dispatch(updateOrdersAsync(updatedOrder));
    setStatusEdit(-1);
  };

  const chooseColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-purple-200 text-purple-600";
      case "dispatch":
        return "bg-yellow-200 text-yellow-600";
      case "delivered":
        return "bg-green-200 text-green-600";
      case "cancelled":
        return "bg-red-200 text-red-600";
      default:
        return "";
    }
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <div className="min-w-screen min-h-screen bg-white flex items-start justify-center font-sans overflow-hidden">
          <div className="w-full lg:w-full px-10">
            <div className="bg-white shadow-md rounded my-6">
              <table className="min-w-max w-full table-auto">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th
                      className="py-3 px-6 text-left cursor-pointer flex items-center gap-2"
                      onClick={(e) =>
                        handleSort({
                          sort: "id",
                          order: sort?._order == "desc" ? "asc" : "desc",
                        })
                      }
                    >
                      Order#
                      {sort._sort === "id" &&
                        (sort._order === "desc" ? (
                          <ArrowUpCircleIcon className="w-4 h-4" />
                        ) : (
                          <ArrowDownCircleIcon className="w-4 h-4" />
                        ))}
                    </th>
                    <th className="py-3 px-6 text-left">Items</th>
                    <th className="py-3 px-6 text-center">total amount</th>
                    <th className="py-3 px-6 text-center">Shipping address</th>
                    <th className="py-3 px-6 text-center">Status</th>
                    <th className="py-3 px-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {orderDetails &&
                    orderDetails.map((order) => (
                      <React.Fragment key={order.items.id}>
                        {order.items.map((item, index) => (
                          <tr
                            key={item.id || index}
                            className="border-b border-gray-200 hover:bg-gray-100"
                          >
                            {/* Display Order ID only once */}
                            {index === 0 && (
                              <td
                                rowSpan={order.items.length}
                                className="py-3 px-6 text-left whitespace-nowrap "
                              >
                                <div className="flex items-center">
                                  <span className="font-medium">
                                    {order.id}
                                  </span>
                                </div>
                              </td>
                            )}

                            {/* Display Item Details */}
                            <td className="py-3 px-6 text-left">
                              <div className="flex items-center">
                                <div className="mr-2">
                                  <img
                                    className="w-8 h-8 rounded-full border-2 border-black"
                                    src={item.product.thumbnail}
                                    alt={item.product.title}
                                  />
                                </div>
                                <span className="font-medium">
                                  {item.product.title.split(" ").length > 2
                                    ? `${item.product.title
                                        .split(" ")
                                        .slice(0, 1)
                                        .join(" ")}...`
                                    : item.product.title}
                                </span>
                              </div>
                            </td>

                            {/* Display Total Amount once */}
                            {index === 0 && (
                              <td
                                rowSpan={order.items.length}
                                className="py-3 px-6 text-center"
                              >
                                <p>${order.totalAmount}</p>
                              </td>
                            )}

                            {/* Display Shipping Address once */}
                            {index === 0 && (
                              <td
                                rowSpan={order.items.length}
                                className="py-3 px-6 text-center"
                              >
                                <div className="flex-col items-center justify-center">
                                  <strong>{order.selectAddress.name}</strong>,
                                  <div className="uppercase">
                                    {order.selectAddress.street}
                                  </div>
                                  ,
                                  <div className="uppercase">
                                    {order.selectAddress.pinCode}
                                  </div>
                                </div>
                              </td>
                            )}

                            {/* Display Status once */}
                            {index === 0 && (
                              <td
                                rowSpan={order.items.length}
                                className="py-3 px-6 text-center"
                              >
                                {statusEdit == order.id ? (
                                  <select
                                    value={order.status}
                                    onChange={(e) => handleUpdate(e, order)}
                                    className={`py-2 px-5 rounded-full text-xs`}
                                  >
                                    <option value="pending">Pending</option>
                                    <option value="dispatch">Dispatch</option>
                                    <option value="delivered">Delivered</option>
                                    <option value="cancelled">Cancelled</option>
                                  </select>
                                ) : (
                                  <span
                                    className={`${chooseColor(
                                      order.status
                                    )} py-1 px-3 rounded-full text-xs`}
                                  >
                                    {order.status}
                                  </span>
                                )}
                              </td>
                            )}

                            {/* Actions */}
                            {index === 0 && (
                              <td
                                rowSpan={order.items.length}
                                className="py-3 px-6 text-center"
                              >
                                <div className="flex item-center justify-center gap-2">
                                  <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                    <EyeIcon
                                      aria-hidden="true"
                                      className="h-5 w-5"
                                    />
                                  </div>
                                  <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                    <PencilIcon
                                      onClick={(e) => handleEdit(order.id)}
                                      aria-hidden="true"
                                      className="h-5 w-5"
                                    />
                                  </div>
                                </div>
                              </td>
                            )}
                          </tr>
                        ))}
                      </React.Fragment>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Pagination
        currentPage={page}
        handlePage={handlePagination}
        totalItems={totalOrders}
        totalPages={totalPages}
        indexOfLastItem={indexOfLastItem}
        indexOfFirstItem={indexOfFirstItem}
        limit={limit}
      />
    </div>
  );
};

export default AdminOrders;
