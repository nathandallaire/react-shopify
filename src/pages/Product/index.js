import React from "react";
import { getStoreData } from "../../utility/store";

const ProductPage = (props) => {
  const { product } = getStoreData();

  return (
    <div>
      <h1>{product.title}</h1>
      <img src={product.featured_image} alt={product.title} />
    </div>
  );
};

export default ProductPage;
