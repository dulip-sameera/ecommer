import "./App.css";
import NavBar from "@/scenes/nav-bar";
import Home from "@/scenes/home";
import Footer from "@/scenes/footer";
import Cart from "@/scenes/cart/Cart";
import { Routes, Route } from "react-router-dom";
import SingleProduct from "@/scenes/single-product";
import Checkout from "@/scenes/checkout";
import Confirmation from "./scenes/confirmation";

type Props = {};

const App = (props: Props) => {
  return (
    <div className="app">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<SingleProduct />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="checkout/success" element={<Confirmation />} />
      </Routes>
      <Cart />
      <Footer />
    </div>
  );
};

export default App;
