import { useDispatch, useSelector } from "react-redux";
import { updateUserAsync } from "../Redux/user/userSlice";
import { useForm } from "react-hook-form";
import { useState } from "react";

const UserProfile = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const [showEditForm, setShowEditForm] = useState(-1);
  const [showAddForm, setShowAddForm] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userInfo);

  function handleEdit(addressUpdate, index) {
    const newUser = JSON.parse(JSON.stringify(user));
    newUser.addresses.splice(index, 1, addressUpdate); // removing older data in array with new updated data from edit form

    // newUser.addresses = newUser.addresses.map((address, idx)=> (
    //   index == idx ? addressUpdate: address
    // ))

    // Another way of updating data in array

    dispatch(updateUserAsync(newUser));
    setShowEditForm(-1);
  }

  // Handle Edit will invoke when edit form is submitted, and on submit it will first make a deep copy of user and then remove user addresses with updated addresses that we have pass as an argument in function.

  function handleEditForm(e, index) {
    setShowEditForm(index);
    const address = user.addresses[index];
    setValue("name", address.name);
    setValue("email", address.email);
    setValue("phone", address.phone);
    setValue("street", address.street);
    setValue("city", address.city);
    setValue("region", address.region);
    setValue("pinCode", address.pinCode);
  }

  // HandleEditForm will invoke when edit button is clicked, and after that state to show table will be set with index of that address in which we are making changes. In address variable we are setting address details of that specific address in which we are making changes by clicking edit button.

  // And setValue is state from react-hook-form.

  function handleDelete(e, index) {
    // const newUser = {...user, addresses: [...user.addresses]} // Shallow Copy
    const newUser = JSON.parse(JSON.stringify(user)); // Deep Copy

    // Here we are making copy of user

    const filterUser = newUser.addresses.filter(
      (ele, addIndex) => addIndex != index
    );

    // Here we are filtering user addresses on index basis

    newUser.addresses = filterUser;

    // Here we are assigning filter addresses to user original addresses

    dispatch(updateUserAsync(newUser));

    // Here we are dispatching filter user to updateUserAsync
  }

  function handleAdd(data) {
    console.log(data);
    const newUser = JSON.parse(JSON.stringify(user));
    newUser.addresses.push(data);
    dispatch(updateUserAsync(newUser));
    setShowEditForm(-1);
    setShowAddForm(false);
  }

  return (
    <div>
      <div className="mx-auto max-w-5xl px-2 sm:px-7 lg:px-8 my-10">
        <div className="flex h-full flex-col bg-white shadow-xl">
          <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 border-b border-black">
            <div className="flex items-start justify-between my-10">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                Name: {user.name ? user.name : "Guest Name"}
              </h1>
            </div>

            <div className="mt-8">
              <div className="flow-root">
                <p className="flex justify-between text-base font-medium text-black-900 pb-4">
                  Email Address: {user.email}
                </p>

                {user.role == "admin" ? (
                  <p className="flex justify-between text-base font-medium text-black-900 pb-4">
                  Role: {user.role}
                </p>
                ) : ("")}
                
              </div>
            </div>
          </div>

          <div className="px-4 py-6 sm:px-6">
            <button
              onClick={() => {
                setShowAddForm(true);
                setShowEditForm(-1);
              }}
              type="submit"
              className="rounded-md bg-gray-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mb-10"
            >
              Add New Address
            </button>

            {showAddForm ? (
              <form
                noValidate
                onSubmit={handleSubmit((data) => {
                  handleAdd(data);
                  reset();
                })}
                className="my-6"
              >
                <div className="space-y-12">
                  <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-xl leading-10 py-3 font-semibold text-gray-900">
                      Add Information
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
                            {...register("name", {
                              required: "Name is required",
                            })}
                            type="text"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                          />
                          {errors.name && (
                            <p className="text-red-500">
                              {errors.name.message}
                            </p>
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
                            <p className="text-red-500">
                              {errors.email.message}
                            </p>
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
                            <p className="text-red-500">
                              {errors.phone.message}
                            </p>
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
                            <p className="text-red-500">
                              {errors.street.message}
                            </p>
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
                            {...register("city", {
                              required: "City is required",
                            })}
                            type="text"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                          />
                          {errors.city && (
                            <p className="text-red-500">
                              {errors.city.message}
                            </p>
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
                            <p className="text-red-500">
                              {errors.region.message}
                            </p>
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
                            <p className="text-red-500">
                              {errors.pinCode.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button
                      onClick={() => setShowAddForm(false)}
                      type="button"
                      className="text-sm/6 font-semibold text-gray-900"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Add Address
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              ""
            )}

            <p className="flex justify-between text-base font-medium text-black-500 pb-4">
              Your Addresses:
            </p>
            {user.addresses.map((addresses, index) => (
              <div>
                {showEditForm === index ? (
                  <form
                    noValidate
                    onSubmit={handleSubmit((data) => {
                      handleEdit(data, index);
                      reset();
                    })}
                    className="my-6"
                  >
                    <div className="space-y-12">
                      <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-xl leading-10 py-3 font-semibold text-gray-900">
                          Edit Information
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
                                {...register("name", {
                                  required: "Name is required",
                                })}
                                type="text"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                              />
                              {errors.name && (
                                <p className="text-red-500">
                                  {errors.name.message}
                                </p>
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
                                <p className="text-red-500">
                                  {errors.email.message}
                                </p>
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
                                <p className="text-red-500">
                                  {errors.phone.message}
                                </p>
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
                                <p className="text-red-500">
                                  {errors.street.message}
                                </p>
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
                                {...register("city", {
                                  required: "City is required",
                                })}
                                type="text"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                              />
                              {errors.city && (
                                <p className="text-red-500">
                                  {errors.city.message}
                                </p>
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
                                <p className="text-red-500">
                                  {errors.region.message}
                                </p>
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
                                <p className="text-red-500">
                                  {errors.pinCode.message}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button
                          onClick={() => setShowEditForm(-1)}
                          type="button"
                          className="text-sm/6 font-semibold text-gray-900"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Edit Address
                        </button>
                      </div>
                    </div>
                  </form>
                ) : (
                  ""
                )}

                <div
                  key={index}
                  className="flex justify-between gap-x-6 py-5 border-solid border-2 border-gray-200 p-2"
                >
                  <div className="flex min-w-0 gap-x-4">
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm/6 font-semibold text-gray-900">
                        {addresses.name}
                      </p>
                      <p className="mt-1 truncate text-xs/5 text-gray-500">
                        {addresses.street}
                      </p>
                    </div>
                  </div>

                  <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end font-semibold">
                    <p className="text-sm/6 text-gray-900 ">
                      {addresses.phone}
                    </p>
                    <p className="mt-1 text-xs/5 text-gray-500">
                      {addresses.pinCode}
                    </p>

                    <button
                      onClick={(e) => handleEditForm(e, index)}
                      type="button"
                      className="text-sm text-indigo-600 hover:text-indigo-500 pt-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={(e) => handleDelete(e, index)}
                      type="button"
                      className="text-sm text-indigo-600 hover:text-indigo-500"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
