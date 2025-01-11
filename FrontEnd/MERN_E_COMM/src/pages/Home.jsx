import { Link } from "react-router-dom";
import ProductList from "../Redux/product-list/ProductList";
import { Footer } from "../components/Footer";

const Home = () => {
  return (
    <div>
      <ProductList />
      {/* <Link to="/admin">Admin</Link> */}
      <Footer/>
    </div>
  );
};

export default Home;
