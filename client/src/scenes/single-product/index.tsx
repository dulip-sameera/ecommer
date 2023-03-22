import Product from "@/components/Product";
import { useFetchProductsByFiltering } from "@/hook/useFetchProductsByFiltering";
import { useProduct } from "@/hook/useProduct";
import { BASE_URLS } from "@/shared/base_urls";
import { Item } from "@/shared/types";
import { addToCart, decreaseCount, increaseCount } from "@/state/cart.slice";
import { RootState } from "@/state/store";
import { HeartIcon, MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./single-product.styles.css";

type Props = {};

enum PRODUCT_TABS {
  "DESCRIPTION" = "description",
  "REVIEWS" = "reviews",
}

const SingleProduct = (props: Props) => {
  const { id } = useParams();
  const productPageId = id ? id : "";
  const { data, isLoading, isError, error } = useProduct(productPageId);
  const cart = useSelector((state: RootState) => state.cart.cart);
  const dispatch = useDispatch();
  const [currentTab, setCurrentTab] = useState(PRODUCT_TABS.DESCRIPTION);

  const product = data?.data;

  const productsInSameCategory = useFetchProductsByFiltering(
    `filters[category][$eq]=${product?.attributes.category}`,
    { enabled: !!product?.id }
  );

  if (isLoading) {
    return (
      <section className="oneproduct">
        <div className="oneproduct__container" style={{ color: "red" }}>
          <div>Loading...</div>
        </div>
      </section>
    );
  }

  if (isError) {
    console.log(
      "🚀 ~ file: single-product/index.tsx:18 ~ SingleProduct ~ error:",
      error
    );
    return (
      <section className="oneproduct">
        <div className="oneproduct__container" style={{ color: "red" }}>
          <h1>Something Went Wrong</h1>
          <div>{error?.message}</div>
        </div>
      </section>
    );
  }

  const productInCart = cart.find((item) => item.item.id === product?.id);

  if (product) {
    return (
      <section className="oneproduct">
        <div className="oneproduct__container">
          <div className="oneproduct__product">
            <div className="oneproduct__product__image">
              <img
                src={`${BASE_URLS.STRAPI}${product.attributes.image.data.attributes.formats.medium.url}`}
                alt=""
                className="oneproduct__product__image--img"
              />
            </div>
            <div className="oneproduct__product__details">
              <div className="oneproduct__product__details__navigation">
                <p className="oneproduct__product__details__navigation--item">
                  Home/Item
                </p>
                <p className="oneproduct__product__details__navigation--item">
                  Prev Next
                </p>
              </div>
              <div className="oneproduct__product__details__body">
                <div className="oneproduct__product__details__body__heading">
                  <h1 className="oneproduct__product__details__body__heading--h1">
                    {product.attributes.name}
                  </h1>
                  <p className="oneproduct__product__details__body__heading--price">
                    ${product.attributes.price}
                  </p>
                </div>
                <div className="oneproduct__product__details__body__description">
                  {product.attributes.shortDescription}
                </div>
              </div>
              <div className="oneproduct__product__details__actions">
                <div className="oneproduct__product__details__actions__countchange">
                  <button
                    className="oneproduct__product__details__actions__countchange--btn"
                    onClick={() => dispatch(decreaseCount(product.id))}
                  >
                    <MinusIcon className="oneproduct__product__details__actions__countchange--btn-icon" />
                  </button>
                  <span className="oneproduct__product__details__actions__countchange--count">
                    {productInCart ? productInCart.count : 0}
                  </span>
                  <button
                    className="oneproduct__product__details__actions__countchange--btn"
                    onClick={() => dispatch(increaseCount(product.id))}
                  >
                    <PlusIcon className="oneproduct__product__details__actions__countchange--btn-icon" />
                  </button>
                </div>
                <button
                  className="oneproduct__product__details__actions__addtocart-btn"
                  onClick={() => dispatch(addToCart(product))}
                >
                  ADD TO CART
                </button>
              </div>
              <div className="oneproduct__product__details__favorite">
                <HeartIcon className="oneproduct__product__details__favorite--icon" />
                <span className="oneproduct__product__details__favorite--text">
                  ADD TO WISHLIST
                </span>
              </div>
              <div className="oneproduct__product__details__category">
                CATEGORIES:{" "}
                {product.attributes.category.replace("-", " ").toUpperCase()}
              </div>
            </div>
          </div>

          {/* REVIEW SECTION */}
          <div className="oneproduct__product__other">
            <ul className="oneproduct__product__other__tabs">
              <li
                className={`oneproduct__product__other__tabs--tab ${
                  currentTab === PRODUCT_TABS.DESCRIPTION
                    ? "oneproduct__product__other__tabs--tab-selected"
                    : ""
                } `}
                onClick={() => setCurrentTab(PRODUCT_TABS.DESCRIPTION)}
              >
                DESCRIPTION
              </li>
              <li
                className={`oneproduct__product__other__tabs--tab ${
                  currentTab === PRODUCT_TABS.REVIEWS
                    ? "oneproduct__product__other__tabs--tab-selected"
                    : ""
                } `}
                onClick={() => setCurrentTab(PRODUCT_TABS.REVIEWS)}
              >
                REVIEWS
              </li>
            </ul>

            <div className="oneproduct__product__other__tabs--content">
              {currentTab === PRODUCT_TABS.DESCRIPTION &&
                product.attributes.longDescription}
              {currentTab === PRODUCT_TABS.REVIEWS && "Reviews"}
            </div>
          </div>

          {/* RELATED PRODUCTS */}
          <div className="oneproduct__related">
            <h2 className="oneproduct__related__heading--h2">
              Related Products
            </h2>

            <div className="oneproduct__related__products">
              {productsInSameCategory.isLoading && "Loading..."}
              {productsInSameCategory.isError &&
                `Something Went Wrong! Error: ${productsInSameCategory.error.message}`}
              {productsInSameCategory.data &&
                productsInSameCategory.data.data
                  .filter((item) => item.id !== product.id)
                  .slice(0, 4)
                  .map((item) => <Product product={item} />)}
            </div>
          </div>
        </div>
      </section>
    );
  } else {
    return <></>;
  }
};

export default SingleProduct;
