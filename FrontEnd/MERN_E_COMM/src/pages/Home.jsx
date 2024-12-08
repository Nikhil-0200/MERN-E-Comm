import { Link } from "react-router-dom";
import ProductList from "../Redux/product-list/ProductList";

const Home = () => {
  return (
    <div>
      <ProductList />
      <Link to="/admin">Admin</Link>
    </div>
  );
};

export default Home;
