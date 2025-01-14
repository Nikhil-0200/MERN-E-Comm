import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutAsync } from "../Redux/auth/authSlice";
import { Navigate } from "react-router-dom";

const Logout = () => {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const status = useSelector((state) => state.auth.status);

  useEffect(() => {
    dispatch(logoutAsync());
  }, [dispatch]);

  if (status === "loading") {
    return <div>Logging out...</div>;
  }

  if (loggedIn === null) {
    return <Navigate to="/login" />;
  }

  return null; // If logged in state is not updated, render nothing
};

export default Logout;
