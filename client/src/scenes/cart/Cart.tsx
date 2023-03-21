import { BASE_URLS } from "@/shared/base_urls";
import {
  decreaseCount,
  increaseCount,
  removeFromCart,
  setIsCartOpen,
} from "@/state/cart.slice";
import { RootState } from "@/state/store";
import { XMarkIcon, MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./cart.styles.css";

type Props = {};

const Cart = (props: Props) => {
  const cart = useSelector((state: RootState) => state.cart.cart);
  const isCartOpen = useSelector((state: RootState) => state.cart.isCartOpen);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Calculate total
  const total = cart.reduce((total, curr) => {
    return total + curr.item.attributes.price * curr.count;
  }, 0);

  return (
    <section
      className="cart"
      style={{ display: isCartOpen ? "block" : "none" }}
    >
      <div className="cart__container">
        {/* HEADING */}
        <div className="cart__heading">
          <h3 className="cart__heading--h3">SHOPPING BAG ({cart.length})</h3>
          <button
            className="cart__heading--btn"
            onClick={() => dispatch(setIsCartOpen(false))}
          >
            <XMarkIcon className="cart__heading--btn-icon" />
          </button>
        </div>
        {/* CART ITEMS */}
        <div className="cart__item--container">
          {isCartOpen &&
            cart.map((cartItem) => (
              <div className="cart__item" key={cartItem.item.id}>
                <div className="cart__item__image">
                  <img
                    src={`${BASE_URLS.STRAPI}${cartItem.item.attributes.image.data.attributes.formats.medium.url}`}
                    alt={`${cartItem.item.attributes.name}`}
                    className="cart__item__image--img"
                  />
                </div>
                <div className="cart__item__body">
                  <div className="cart__item__body__heading">
                    <h4 className="cart__item__body__heading--h4">
                      {cartItem.item.attributes.name}
                    </h4>
                    <button
                      className="cart__item__body__heading--btn"
                      onClick={() => dispatch(removeFromCart(cartItem.item.id))}
                    >
                      <XMarkIcon className="cart__item__body__heading--btn-icon" />
                    </button>
                  </div>
                  <div className="cart__item__body--description">
                    {cartItem.item.attributes.shortDescription}
                  </div>
                  <div className="cart__item__body__footer">
                    <div className="cart__item__body__footer__buttons">
                      <button
                        className="cart__item__body__footer__buttons--btn"
                        onClick={() =>
                          dispatch(decreaseCount(cartItem.item.id))
                        }
                      >
                        <MinusIcon className="cart__item__body__footer__buttons--btn-icon" />
                      </button>
                      <span className="cart__item__body__footer__buttons--count">
                        {cartItem.count}
                      </span>
                      <button
                        className="cart__item__body__footer__buttons--btn"
                        onClick={() =>
                          dispatch(increaseCount(cartItem.item.id))
                        }
                      >
                        <PlusIcon className="cart__item__body__footer__buttons--btn-icon" />
                      </button>
                    </div>
                    <div className="cart__item__body__footer--price">
                      ${cartItem.item.attributes.price}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* TOTAL SECTION */}
        <div className="cart__total">
          <p className="cart__total--text">SUBTOTAL</p>
          <p className="cart__total--price">${total}</p>
        </div>

        {/* CHECKOUT BUTTON */}
        <button
          className="cart__checkout__btn"
          onClick={() => {
            navigate("checkout");
            dispatch(setIsCartOpen(false));
          }}
          disabled={cart.length <= 0 ? true : false}
        >
          CHECKOUT
        </button>
      </div>
    </section>
  );
};

export default Cart;
