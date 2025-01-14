import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { checkUserAsync, resetPasswordRequestAsync } from "../Redux/auth/authSlice";

const ForgotPass = () => {
  const dispatch = useDispatch();
  const error = useSelector((state)=> state.auth.error)
  const user = useSelector((state)=> state.auth.loggedIn)
  const mailSent = useSelector((state)=> state.auth.mailSent);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();


  return (
    <div>
      {user && <Navigate to="/" />}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://img.icons8.com/?size=100&id=5_UP3A7vjD06&format=png&color=000000"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Enter email to reset password
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

          {error && (<p>{error.message}</p>
          )}
          {
            mailSent && (<p>Mail Sent</p>)
          }


          <form
            noValidate
            className="space-y-6"
            onSubmit={handleSubmit(async (data) => {
                dispatch(resetPasswordRequestAsync(data.email));
            })}
          >
            <div>
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


            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Send Email
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
           Send me back to{" "}
            <Link
              to={"/login"}
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPass;
