import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import NavBar from "./components/NavBar";
import AllRoutes from "./components/AllRoutes";
import { useEffect } from "react";
import { fetchItemByUserIdAsync } from "./Redux/cart/cartSlice";
import { fetchLoggedInUserAsync } from "./Redux/user/userSlice";
import { checkUserAsync } from "./Redux/auth/authSlice";

function App() {
  const user = useSelector((state) => state.auth.loggedIn);
  const userChecked = useSelector((state) => state.auth.userChecked);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserAsync());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(fetchItemByUserIdAsync());
      dispatch(fetchLoggedInUserAsync());
    }
  }, [dispatch, user]);

  return (
    <div>
      <NavBar />
      {userChecked && <AllRoutes />}
    </div>
  );
}

export default App;
