import Product from "@/components/Product";
import { useProducts } from "@/hook/useProducts";
import { setItems } from "@/state/cart.slice";
import { RootState } from "@/state/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./products.styles.css";

enum TABS {
  ALL = "all",
  NEW_ARRIVALS = "new-arrivals",
  BEST_SELLERS = "best-sellers",
  TOP_RATED = "top-rated",
}

type Props = {};

const Products = (props: Props) => {
  const [currentTab, setCurrentTab] = useState<TABS>(TABS.ALL);
  const { data, isError, isLoading, error } = useProducts();

  const productList = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setItems(data?.data));
  }, [data]);

  if (isLoading) {
    return (
      <section className="products">
        <div> Loading...</div>
      </section>
    );
  }

  if (isError) {
    console.log("🚀 ~ PRODUCT FETCHING ERROR:", error);
    return (
      <section className="products">
        <div>Something Went Wrong</div>
        <div>{error.message}</div>
      </section>
    );
  }

  // ALl
  const allProducts = productList;

  // NEW ARRIVALS
  const newArrivals = productList?.filter(
    (product) => product.attributes.category === TABS.NEW_ARRIVALS
  );

  // BEST SELLERS
  const bestSellers = productList?.filter(
    (product) => product.attributes.category === TABS.BEST_SELLERS
  );

  // TOP RATED
  const topRated = productList?.filter(
    (product) => product.attributes.category === TABS.TOP_RATED
  );

  return (
    <section className="products">
      <div className="products__heading">
        <h2>
          Our Featured <span>Products</span>
        </h2>
      </div>

      {/* CATEGORY TABS */}
      <div className="products__tabs">
        <ul>
          <li
            className={`${
              currentTab === TABS.ALL ? "products__tab--selected" : ""
            } products__tab`}
          >
            <button onClick={() => setCurrentTab(TABS.ALL)}>ALL</button>
          </li>
          <li
            className={`${
              currentTab === TABS.NEW_ARRIVALS ? "products__tab--selected" : ""
            } products__tab`}
          >
            <button onClick={() => setCurrentTab(TABS.NEW_ARRIVALS)}>
              NEW ARRIVALS
            </button>
          </li>
          <li
            className={`${
              currentTab === TABS.BEST_SELLERS ? "products__tab--selected" : ""
            } products__tab`}
          >
            <button onClick={() => setCurrentTab(TABS.BEST_SELLERS)}>
              BEST SELLERS
            </button>
          </li>
          <li
            className={`${
              currentTab === TABS.TOP_RATED ? "products__tab--selected" : ""
            } products__tab`}
          >
            <button onClick={() => setCurrentTab(TABS.TOP_RATED)}>
              TOP RATED
            </button>
          </li>
        </ul>
      </div>

      {/* PRODUCT LIST */}
      <section className="products__list--container">
        <div className="products__list">
          {currentTab === TABS.ALL &&
            allProducts?.map((product) => (
              <Product product={product} key={`${product.id}`} />
            ))}

          {currentTab === TABS.NEW_ARRIVALS &&
            newArrivals?.map((product) => (
              <Product product={product} key={`${product.id}`} />
            ))}

          {currentTab === TABS.BEST_SELLERS &&
            bestSellers?.map((product) => (
              <Product product={product} key={`${product.id}`} />
            ))}

          {currentTab === TABS.TOP_RATED &&
            topRated?.map((product) => (
              <Product product={product} key={`${product.id}`} />
            ))}
        </div>
      </section>
    </section>
  );
};

export default Products;
