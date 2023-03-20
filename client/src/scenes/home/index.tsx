import Carousel from "./Carousel";
import Newsletter from "./Newsletter";
import Products from "./Products";
import "./home.styles.css";

type Props = {};

const Home = (props: Props) => {
  return (
    <div className="home">
      <Carousel />
      <Products />
      <Newsletter />
    </div>
  );
};

export default Home;
