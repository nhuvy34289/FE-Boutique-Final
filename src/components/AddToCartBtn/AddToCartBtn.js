import React from "react";

const AddToCartBtn = ({ product, sizes }) => {
  return (
    <>
      <button className="btn btn-dark btn-sm btn-block d-flex align-items-center justify-content-center px-0 text-white">
        Add to cart
      </button>
    </>
  );
};

export default AddToCartBtn;
