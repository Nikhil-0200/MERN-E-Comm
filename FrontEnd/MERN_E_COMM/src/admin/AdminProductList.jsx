import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
  StarIcon,
} from "@heroicons/react/20/solid";
import { Pagination } from "../components/Pagination";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAllProducts,
  fetchAllProductsAsync,
  fetchAllProductsFilterAsync,
  fetchCategoryAsync,
  fetchBrandsAsync,
} from "../Redux/product-list/productListSlice";
import { fetchCategory } from "../Redux/product-list/productListAPI";

const AdminProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const category = useSelector((state) => state.product.category);
  const brands = useSelector((state) => state.product.brands);
  const totalItems = useSelector((state) => state.product.totalItems);
  const [filterData, setFilterData] = useState({});
  const [sort, setSort] = useState({});
  const [page, setPage] = useState(1);
  const limit = 8;



  const totalPages = Math.ceil(totalItems / limit);
  const indexOfLastItem = limit * page;
  const indexOfFirstItem = indexOfLastItem - limit;

  const centralFn = () => {
    const queryData = { ...filterData, ...sort, _page: page, _limit: limit, admin: true };

    dispatch(fetchAllProductsFilterAsync(queryData));
  };

  // Filter Function
  const handleFilter = (e, section, option) => {
    // Checkbox Status
    const checkedStatus = e.target.checked;

    // Shallow Copy Of filterData Object
    const newFilterData = { ...filterData };

    if (checkedStatus) {
      // Now in this object we have to store data like this -> {category: ["beauty", "groceries"]}

      // If there is nothing like {category:[]} then create one
      if (!newFilterData[section.id]) {
        newFilterData[section.id] = [];
      }

      // And then after creating an array push values in it.
      newFilterData[section.id].push(option.value);
    }
    // Else if it is unchecked then remove the values from array and if array length is zero delete the array.
    else {
      // agr array present h toh
      if (newFilterData[section.id]) {
        // array ko filter krdo.
        newFilterData[section.id] = newFilterData[section.id].filter(
          (ele) => ele != option.value
        );

        // agr array empty h toh usko delete krdo.
        if (newFilterData[section.id].length === 0) {
          delete newFilterData[section.id];
        }
      }
    }

    // Now update original filterData Object
    setFilterData(newFilterData);
  };

  const handleSort = (e, option) => {
    setSort({ _sort: option.sort, _order: option.order });
  };

  const handlePagination = (newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    dispatch(fetchCategoryAsync());
    dispatch(fetchBrandsAsync());
  }, []);

  useEffect(() => {
    centralFn();
  }, [filterData, sort, page]);

  useEffect(() => {
    setPage(1);
  }, [totalItems, sort]);

  const sortOptions = [
    { name: "Best Rating", sort: "rating", order: "desc", current: false },
    { name: "Price: Low to High", sort: "price", order: "asc", current: false },
    {
      name: "Price: High to Low",
      sort: "price",
      order: "desc",
      current: false,
    },
  ];

  const filters = [
    {
      id: "category",
      name: "Category",
      options: category || [],
    },
    {
      id: "brand",
      name: "Brands",
      options: brands || [],
    },
  ];

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  if (!products) {
    return <p>Loading products...</p>;
  }

  return (
    <div>
      <div className="bg-white">
        <div>
          {/* Mobile filter dialog */}
          <Dialog
            open={mobileFiltersOpen}
            onClose={setMobileFiltersOpen}
            className="relative z-40 lg:hidden"
          >
            <DialogBackdrop
              transition
              className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
            />

            <div className="fixed inset-0 z-40 flex">
              <DialogPanel
                transition
                className="relative ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
              >
                <div className="flex items-center justify-between px-4">
                  <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                  <button
                    type="button"
                    onClick={() => setMobileFiltersOpen(false)}
                    className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                  </button>
                </div>

                {/* Filters */}
                <form className="mt-4 border-t border-gray-200">
                  <h3 className="sr-only">Categories</h3>

                  {filters.map((section) => (
                    <Disclosure
                      key={section.id}
                      as="div"
                      className="border-t border-gray-200 px-4 py-6"
                    >
                      <h3 className="-mx-2 -my-3 flow-root">
                        <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                          <span className="font-medium text-gray-900">
                            {section.name}
                          </span>
                          <span className="ml-6 flex items-center">
                            <PlusIcon
                              aria-hidden="true"
                              className="h-5 w-5 group-data-[open]:hidden"
                            />
                            <MinusIcon
                              aria-hidden="true"
                              className="h-5 w-5 [.group:not([data-open])_&]:hidden"
                            />
                          </span>
                        </DisclosureButton>
                      </h3>
                      <DisclosurePanel className="pt-6">
                        <div className="space-y-6">
                          {section.options.map((option, optionIdx) => (
                            <div
                              key={option.value}
                              className="flex items-center"
                            >
                              <input
                                defaultValue={option.value}
                                defaultChecked={option.checked}
                                id={`filter-mobile-${section.id}-${optionIdx}`}
                                name={`${section.id}[]`}
                                type="checkbox"
                                onChange={(e) =>
                                  handleFilter(e, section, option)
                                }
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <label
                                htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                className="ml-3 min-w-0 flex-1 text-gray-500"
                              >
                                {option.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </DisclosurePanel>
                    </Disclosure>
                  ))}
                </form>
              </DialogPanel>
            </div>
          </Dialog>

          <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 border-2">
            <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                All Products - This is Admin Home Page
              </h1>

              <div className="flex items-center">
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                      Sort
                      <ChevronDownIcon
                        aria-hidden="true"
                        className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      />
                    </MenuButton>
                  </div>

                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                  >
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <MenuItem key={option.name}>
                          <p
                            onClick={(e) => handleSort(e, option)}
                            className={classNames(
                              option.current
                                ? "font-medium text-gray-900"
                                : "text-gray-500",
                              "block px-4 py-2 text-sm data-[focus]:bg-gray-100 data-[focus]:outline-none"
                            )}
                          >
                            {option.name}
                          </p>
                        </MenuItem>
                      ))}
                    </div>
                  </MenuItems>
                </Menu>

                <button
                  type="button"
                  className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
                >
                  <span className="sr-only">View grid</span>
                  <Squares2X2Icon aria-hidden="true" className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(true)}
                  className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                >
                  <span className="sr-only">Filters</span>
                  <FunnelIcon aria-hidden="true" className="h-5 w-5" />
                </button>
              </div>
            </div>

            <section aria-labelledby="products-heading" className="pb-24 pt-6">
              <h2 id="products-heading" className="sr-only">
                Products
              </h2>

              <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                {/* Filters */}
                <form className="hidden lg:block">
                  <h3 className="sr-only">Categories</h3>

                  {filters.map((section) => (
                    <Disclosure
                      key={section.id}
                      as="div"
                      className="border-b border-gray-200 py-6"
                    >
                      <h3 className="-my-3 flow-root">
                        <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                          <span className="font-medium text-gray-900">
                            {section.name}
                          </span>
                          <span className="ml-6 flex items-center">
                            <PlusIcon
                              aria-hidden="true"
                              className="h-5 w-5 group-data-[open]:hidden"
                            />
                            <MinusIcon
                              aria-hidden="true"
                              className="h-5 w-5 [.group:not([data-open])_&]:hidden"
                            />
                          </span>
                        </DisclosureButton>
                      </h3>
                      <DisclosurePanel className="pt-6">
                        <div className="space-y-4">
                          {section.options.map((option, optionIdx) => (
                            <div
                              key={option.value}
                              className="flex items-center"
                            >
                              <input
                                defaultValue={option.value}
                                defaultChecked={option.checked}
                                id={`filter-${section.id}-${optionIdx}`}
                                name={`${section.id}[]`}
                                type="checkbox"
                                onChange={(e) =>
                                  handleFilter(e, section, option)
                                }
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <label
                                htmlFor={`filter-${section.id}-${optionIdx}`}
                                className="ml-3 text-sm text-gray-600"
                              >
                                {option.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </DisclosurePanel>
                    </Disclosure>
                  ))}
                </form>

                {/* Product grid */}
                <div className="lg:col-span-3">
                  <div className="bg-white ">
                    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
                      <Link
                        to="/admin/AdminProductForm"
                        className="mt-4 mb-10 items-center justify-center rounded-md border border-transparent bg-green-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Add New Product
                      </Link>
                      {products ? (
                        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                          {products.map((product) => (
                            <div key={product.id}>
                              <Link
                                to={`/productDetails/${product.id}`}
                                key={product.id}
                              >
                                <div className="group relative border-2 border-black p-2">
                                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-64">
                                    <img
                                      alt={product.images}
                                      src={product.images}
                                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                    />
                                  </div>
                                  <div className="mt-4 flex justify-between">
                                    <div>
                                      <h3 className="text-sm text-gray-700">
                                        <span
                                          aria-hidden="true"
                                          className="absolute inset-0"
                                        />
                                        {product.title}
                                      </h3>
                                      <p className="mt-1 text-sm text-gray-500 flex items-center gap-2">
                                        <StarIcon className="w-3.5 h-3.5" />

                                        {product.rating}
                                      </p>
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium text-gray-900">
                                        ${product.price}
                                      </p>
                                      <p className="text-sm font-medium text-gray-900 line-through">
                                        $
                                        {parseFloat(
                                          product.price /
                                            (1 -
                                              product.discountPercentage / 100)
                                        ).toFixed(2)}
                                      </p>
                                    </div>
                                  </div>
                                  {product.deleted &&
                                  <p className="text-red-700 font-semibold">Product Is Deleted</p>
                                  }
                                </div>
                              </Link>

                              <Link
                              to={`/admin/AdminProductForm/Edit/${product.id}`}
                              className="mt-4 flex w-[45%] items-center justify-center rounded-md border border-transparent bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                Edit Product
                              </Link>
                            </div>
                          ))}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
        <Pagination
          currentPage={page}
          handlePage={handlePagination}
          totalItems={totalItems}
          totalPages={totalPages}
          indexOfLastItem={indexOfLastItem}
          indexOfFirstItem={indexOfFirstItem}
          limit={limit}
        />
      </div>
    </div>
  );
};

export default AdminProductList;
