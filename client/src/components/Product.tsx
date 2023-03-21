import { Item } from "@/shared/types";
import { addToCart, decreaseCount, increaseCount } from "@/state/cart.slice";
import { RootState } from "@/state/store";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./product.styles.css";

type Props = {
  product: Item;
};

const BASE_URL = "http://localhost:1337";

const Product = ({ product }: Props) => {
  const cartItems = useSelector((state: RootState) => state.cart.cart);
  const dispatch = useDispatch();
  const [hover, setHover] = useState(false);

  const productInCart = cartItems.find((item) => item.item.id === product.id);

  return (
    <div className="product__card">
      <div className="product__card--image-container">
        <img
          className="product__card--img"
          src={`${BASE_URL}${product.attributes.image.data.attributes.formats.medium.url}`}
          alt={`${product.attributes.name}`}
        />
        <div className="product__card--buttons">
          <div className="product__changecount">
            <button
              className="product__changecount--increase"
              onClick={() => dispatch(decreaseCount(product.id))}
            >
              <MinusIcon className="changecount--icon" />
            </button>
            <span className="product__changecount--count">
              {productInCart ? productInCart.count : 0}
            </span>

            <button
              className="product__changecount--decrease"
              onClick={() => dispatch(increaseCount(product.id))}
            >
              <PlusIcon className="changecount--icon" />
            </button>
          </div>

          <div className="product__addtocart">
            <button
              className="product__addtocart--button"
              onClick={() => dispatch(addToCart(product))}
            >
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
      <div className="product__card--body">
        <h4 className="product__card--body-heading">
          {product.attributes.name}
        </h4>
        <p className="product__card--body-description">
          {product.attributes.shortDescription}
        </p>
        <p className="product__card--body-price">
          $ {product.attributes.price}
        </p>
      </div>
    </div>
  );
};

export default Product;
