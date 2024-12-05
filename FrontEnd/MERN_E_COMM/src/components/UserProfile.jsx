import { useDispatch, useSelector } from "react-redux";

const UserProfile = () => {
  const user = useSelector((state) => state.user.userInfo);

  function handleEdit(e, index){

  }

  function handleDelete(e, index){

  }

  return (
    <div>
      <div className="mx-auto max-w-5xl px-2 sm:px-7 lg:px-8 my-10">
        <div className="flex h-full flex-col bg-white shadow-xl">
          <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
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
              </div>
            </div>
          </div>

          <div className="px-4 py-6 sm:px-6">
            <p className="flex justify-between text-base font-medium text-black-500 pb-4">
              Your Addresses:
            </p>
            {user.addresses.map((addresses, index) => (
              <div className="flex justify-between gap-x-6 py-5 border-solid border-2 border-gray-200 p-2">
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
                  <p className="text-sm/6 text-gray-900 ">{addresses.phone}</p>
                  <p className="mt-1 text-xs/5 text-gray-500">
                    {addresses.pinCode}
                  </p>

                  <button
                    onClick={(e) => handleEdit(e, index)}
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
