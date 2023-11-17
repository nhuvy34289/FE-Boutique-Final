import React, { useEffect } from "react";
import { queryFormat } from "../../../../utils/common";
import Product from "../../../Products/Components/Product/Product";
import { getRelatedProducts } from "../../productDetailSlice";
const RelatedProduct = ({ categories, dispatch, productRelated }) => {
  useEffect(() => {
    const query = queryFormat({ category: categories });
    dispatch(getRelatedProducts(query));
  }, [dispatch, categories]);
  return (
    <>
      <h2 className="h5 text-uppercase mb-4">Related products</h2>
      <div className="row">
        {productRelated &&
          productRelated?.map((item) => <Product item={item} key={item._id} />)}
      </div>
    </>
  );
};

export default RelatedProduct;
