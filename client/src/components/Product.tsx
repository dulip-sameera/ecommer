import { BASE_URLS } from "@/shared/base_urls";
import { Item } from "@/shared/types";
import { addToCart, decreaseCount, increaseCount } from "@/state/cart.slice";
import { RootState } from "@/state/store";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./product.styles.css";

type Props = {
  product: Item;
};

const Product = ({ product }: Props) => {
  const cartItems = useSelector((state: RootState) => state.cart.cart);
  const dispatch = useDispatch();
  const [hover, setHover] = useState(false);

  const productInCart = cartItems.find((item) => item.item.id === product.id);

  return (
    <div className="product__card">
      <div
        className="product__card--image-container"
        onMouseOver={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <Link to={`/product/${product.id}`}>
          <img
            className="product__card--img"
            src={`${BASE_URLS.STRAPI}${product.attributes.image.data.attributes.formats.medium.url}`}
            alt={`${product.attributes.name}`}
          />
        </Link>
        {hover && (
          <div className="product__card--buttons">
            <div className="product__changecount">
              <button
                className="product__changecount--btn "
                onClick={() => dispatch(decreaseCount(product.id))}
                disabled={productInCart ? undefined : true}
              >
                <MinusIcon className="changecount--icon" />
              </button>
              <span className="product__changecount--count">
                {productInCart ? productInCart.count : 0}
              </span>

              <button
                className="product__changecount--btn "
                onClick={() => {
                  if (productInCart) {
                    dispatch(increaseCount(product.id));
                  } else {
                    dispatch(addToCart(product));
                  }
                }}
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
        )}
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
