import { Item } from "@/shared/types";
import "./products.styles.css";

type Props = {
  product: Item;
};

const BASE_URL = "http://localhost:1337";

const Product = ({ product }: Props) => {
  return (
    <div className="product__card">
      <div className="product__card--image-container">
        <img
          className="product__card--img"
          src={`${BASE_URL}${product.attributes.image.data.attributes.formats.medium.url}`}
          alt={`${product.attributes.name}`}
        />
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
