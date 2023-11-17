import React from "react";

const SortProduct = ({ handleSort }) => {
  return (
    <>
      <select
        className="selectpicker ml-auto"
        onChange={(e) => handleSort(e.target.value)}
      >
        <option value="default">Default sorting</option>
        <option value="DownToUp">Price: Low to High</option>
        <option value="UpToDown">Price: High to Low</option>
      </select>
    </>
  );
};

export default SortProduct;
