import { useState } from "react";
import "./products.styles.css";

enum TABS {
  ALL = "ALL",
  NEW_ARRIVALS = "NEW ARRIVALS",
  BEST_SELLERS = "BEST SELLERS",
  TOP_RATED = "TOP RATED",
}

type Props = {};

const Products = (props: Props) => {
  const [currentTab, setCurrentTab] = useState(TABS.ALL);

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
            <button onClick={() => setCurrentTab(TABS.ALL)}>{TABS.ALL}</button>
          </li>
          <li
            className={`${
              currentTab === TABS.NEW_ARRIVALS ? "products__tab--selected" : ""
            } products__tab`}
          >
            <button onClick={() => setCurrentTab(TABS.NEW_ARRIVALS)}>
              {TABS.NEW_ARRIVALS}
            </button>
          </li>
          <li
            className={`${
              currentTab === TABS.BEST_SELLERS ? "products__tab--selected" : ""
            } products__tab`}
          >
            <button onClick={() => setCurrentTab(TABS.BEST_SELLERS)}>
              {TABS.BEST_SELLERS}
            </button>
          </li>
          <li
            className={`${
              currentTab === TABS.TOP_RATED ? "products__tab--selected" : ""
            } products__tab`}
          >
            <button onClick={() => setCurrentTab(TABS.TOP_RATED)}>
              {TABS.TOP_RATED}
            </button>
          </li>
        </ul>
      </div>

      {/* PRODUCT LIST */}
      <div className="products__list"></div>
    </section>
  );
};

export default Products;
