import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { UserIcon } from "@heroicons/react/24/outline";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux/es/exports";
import { useSelector } from "react-redux/es/hooks/useSelector";
import "./nav-bar.styles.css";
import { RootState } from "@/state/store";
import { setIsCartOpen } from "@/state/cart.slice";
import { Link } from "react-router-dom";

type Props = {};

const NavBar = (props: Props) => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.cart);

  return (
    <div className="navbar__container">
      <nav className="navbar">
        {/* BRAND LOGO */}
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <div className="navbar__logo">ECOMMER</div>
        </Link>

        {/* LINKS */}
        <div className="navbar__links">
          {/* SEARCH */}
          <button className="navbar__link">
            <MagnifyingGlassIcon className="navbar__link--icon" />
          </button>
          {/* ACCOUNT */}
          <button className="navbar__link">
            <UserIcon className="navbar__link--icon" />
          </button>
          {/* SHOPPING CART */}
          <button
            className="navbar__link navbar__link--cart"
            onClick={() => dispatch(setIsCartOpen(true))}
          >
            {/* DON'T SHOW IF CART IS EMPTY */}
            <span
              className={
                cart.length > 0 ? "cart__badge" : "cart__badge--hidden"
              }
            >
              {cart.length}
            </span>
            <ShoppingBagIcon className="navbar__link--icon" />
          </button>
          {/* MENU */}
          <button className="navbar__link">
            <Bars3Icon className="navbar__link--icon" />
          </button>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
