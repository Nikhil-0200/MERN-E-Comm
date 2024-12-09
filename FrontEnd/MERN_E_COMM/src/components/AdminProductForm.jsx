import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import { useSelector } from 'react-redux';

const AdminProductForm = () =>{
    const category = useSelector((state) => state.product.category);
    const brands = useSelector((state) => state.product.brands);
    

    
    return (
        <form className='border-2 border-black'>
          <div className="space-y-12 p-10">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base/7 font-semibold text-gray-900">Add Product</h2>
              
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-6">
                  <label htmlFor="title" className="block text-sm/6 font-medium text-gray-900">
                    Product Name
                  </label>
                  <div className="mt-2">
                    <div className="flex items-center rounded-md bg-white pl-0 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                      <input
                        id="title"
                        name="title"
                        type="text"
                        className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                      />
                    </div>
                  </div>
                </div>
    
                <div className="col-span-full">
                  <label htmlFor="description" className="block text-sm/6 font-medium text-gray-900">
                    Description
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="description"
                      name="description"
                      rows={3}
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      defaultValue={''}
                    />
                  </div>
                  <p className="mt-3 text-sm/6 text-gray-600">Write details about the product.</p>
                </div>

                <div className="col-span-full">
                  <label htmlFor="description" className="block text-sm/6 font-medium text-gray-900">
                    Brand
                  </label>
                  <div className="mt-2">
                    <select name="brand" id="brand">
                        <option value="">-- Choose Brand --</option>
                        {brands.map((ele)=>(
                        <option value={ele.value}>{ele.label}</option>
                        ))}
                    </select>
                  </div>
                </div>

                <div className="col-span-full">
                  <label htmlFor="description" className="block text-sm/6 font-medium text-gray-900">
                    Category
                  </label>
                  <div className="mt-2">
                    <select name="brand" id="brand">
                        <option value="">-- Choose Category --</option>
                        {category.map((ele)=>(
                        <option value={ele.value}>{ele.label}</option>
                        ))}
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                    Price
                  </label>
                  <div className="mt-2">
                    <div className="flex items-center rounded-md bg-white pl-0 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                      <input
                        id="price"
                        name="price"
                        type="number"
                        className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                      />
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="discountPercentage" className="block text-sm/6 font-medium text-gray-900">
                    Discount
                  </label>
                  <div className="mt-2">
                    <div className="flex items-center rounded-md bg-white pl-0 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                      <input
                        id="discountPercentage"
                        name="discountPercentage"
                        type="number"
                        className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                      />
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="stock" className="block text-sm/6 font-medium text-gray-900">
                    Stock
                  </label>
                  <div className="mt-2">
                    <div className="flex items-center rounded-md bg-white pl-0 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                      <input
                        id="stock"
                        name="stock"
                        type="number"
                        className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                      />
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label htmlFor="thumbnail" className="block text-sm/6 font-medium text-gray-900">
                    Thumbnail
                  </label>
                  <div className="mt-2">
                    <div className="flex items-center rounded-md bg-white pl-0 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                      <input
                        id="thumbnail"
                        name="thumbnail"
                        type="text"
                        className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                      />
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label htmlFor="image1" className="block text-sm/6 font-medium text-gray-900">
                    Image 1
                  </label>
                  <div className="mt-2">
                    <div className="flex items-center rounded-md bg-white pl-0 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                      <input
                        id="image1"
                        name="image1"
                        type="text"
                        className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                      />
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label htmlFor="image2" className="block text-sm/6 font-medium text-gray-900">
                    Image 2
                  </label>
                  <div className="mt-2">
                    <div className="flex items-center rounded-md bg-white pl-0 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                      <input
                        id="image2"
                        name="image2"
                        type="text"
                        className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                      />
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label htmlFor="image3" className="block text-sm/6 font-medium text-gray-900">
                    Image 3
                  </label>
                  <div className="mt-2">
                    <div className="flex items-center rounded-md bg-white pl-0 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                      <input
                        id="image3"
                        name="image3"
                        type="text"
                        className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                      />
                    </div>
                  </div>
                </div>

              </div>
            </div>
    
            
    
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base/7 font-semibold text-gray-900">Extra</h2>
             
    
              <div className="mt-10 space-y-10">
                <fieldset>
                  <legend className="text-sm/6 font-semibold text-gray-900">By email</legend>
                  <div className="mt-6 space-y-6">
                    <div className="flex gap-3">
                      <div className="flex h-6 shrink-0 items-center">
                        <div className="group grid size-4 grid-cols-1">
                          <input
                            defaultChecked
                            id="comments"
                            name="comments"
                            type="checkbox"
                            aria-describedby="comments-description"
                            className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                          />
                          <svg
                            fill="none"
                            viewBox="0 0 14 14"
                            className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                          >
                            <path
                              d="M3 8L6 11L11 3.5"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="opacity-0 group-has-[:checked]:opacity-100"
                            />
                            <path
                              d="M3 7H11"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="opacity-0 group-has-[:indeterminate]:opacity-100"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="text-sm/6">
                        <label htmlFor="comments" className="font-medium text-gray-900">
                          Comments
                        </label>
                        <p id="comments-description" className="text-gray-500">
                          Get notified when someones posts a comment on a posting.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="flex h-6 shrink-0 items-center">
                        <div className="group grid size-4 grid-cols-1">
                          <input
                            id="candidates"
                            name="candidates"
                            type="checkbox"
                            aria-describedby="candidates-description"
                            className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                          />
                          <svg
                            fill="none"
                            viewBox="0 0 14 14"
                            className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                          >
                            <path
                              d="M3 8L6 11L11 3.5"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="opacity-0 group-has-[:checked]:opacity-100"
                            />
                            <path
                              d="M3 7H11"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="opacity-0 group-has-[:indeterminate]:opacity-100"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="text-sm/6">
                        <label htmlFor="candidates" className="font-medium text-gray-900">
                          Candidates
                        </label>
                        <p id="candidates-description" className="text-gray-500">
                          Get notified when a candidate applies for a job.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="flex h-6 shrink-0 items-center">
                        <div className="group grid size-4 grid-cols-1">
                          <input
                            id="offers"
                            name="offers"
                            type="checkbox"
                            aria-describedby="offers-description"
                            className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                          />
                          <svg
                            fill="none"
                            viewBox="0 0 14 14"
                            className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                          >
                            <path
                              d="M3 8L6 11L11 3.5"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="opacity-0 group-has-[:checked]:opacity-100"
                            />
                            <path
                              d="M3 7H11"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="opacity-0 group-has-[:indeterminate]:opacity-100"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="text-sm/6">
                        <label htmlFor="offers" className="font-medium text-gray-900">
                          Offers
                        </label>
                        <p id="offers-description" className="text-gray-500">
                          Get notified when a candidate accepts or rejects an offer.
                        </p>
                      </div>
                    </div>
                  </div>
                </fieldset>
    
                
              </div>
            </div>
          </div>
    
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button type="button" className="text-sm/6 font-semibold text-gray-900">
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
        </form>
      )
}

export default AdminProductForm;