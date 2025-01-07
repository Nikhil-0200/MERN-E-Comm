import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateAdmin = ({ children }) => {
  const user = useSelector((state) => state.auth.loggedIn);
  const userInfo = useSelector((state) => state.user.userInfo);

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (userInfo && userInfo.role !== "admin") {
    return <Navigate to="/" />;
  }

  // Same as Private component but it is for Admin so here we are checking if user is present and if user role is Admin. If it is admin then navigate to "/" else navigate to dashboard as user with role user goes on dashboard page.
  else {
    return children;
  }
};

export default PrivateAdmin;
