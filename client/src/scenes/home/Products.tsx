import Product from "@/components/Product";
import { useProducts } from "@/hook/useProducts";
import { useState } from "react";
import "./products.styles.css";

enum TABS {
  ALL = "all",
  NEW_ARRIVALS = "new-arrivals",
  BEST_SELLERS = "best-sellers",
  TOP_RATED = "top-rated",
}

type Props = {};

const Products = (props: Props) => {
  const { data, isError, isLoading, error } = useProducts();
  const [currentTab, setCurrentTab] = useState(TABS.ALL);

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
  const allProducts = data.data;

  // NEW ARRIVALS
  const newArrivals = data.data.filter(
    (product) => product.attributes.category === TABS.NEW_ARRIVALS
  );

  // BEST SELLERS
  const bestSellers = data.data.filter(
    (product) => product.attributes.category === TABS.BEST_SELLERS
  );

  // TOP RATED
  const topRated = data.data.filter(
    (product) => product.attributes.category === TABS.TOP_RATED
  );

  return (
    <section className="products">
      <div className="products__heading">
        <h2>
          OUR FEATURED <span>PRODUCTS</span>
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
      <section className="products__list">
        {currentTab === TABS.ALL &&
          allProducts.map((product) => (
            <Product product={product} key={`${product.id}`} />
          ))}

        {currentTab === TABS.NEW_ARRIVALS &&
          newArrivals.map((product) => (
            <Product product={product} key={`${product.id}`} />
          ))}

        {currentTab === TABS.BEST_SELLERS &&
          bestSellers.map((product) => (
            <Product product={product} key={`${product.id}`} />
          ))}

        {currentTab === TABS.TOP_RATED &&
          topRated.map((product) => (
            <Product product={product} key={`${product.id}`} />
          ))}
      </section>
    </section>
  );
};

export default Products;
