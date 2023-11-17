import { Checkbox } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { SIZES } from "../../../../constants/Sizes";
import { filterProductBySize } from "../../productSlice";
import "./style.css";

const SortSize = () => {
  const [sizes, setSizes] = useState([]);
  console.log("🚀 ~ file: SortSize.js ~ line 10 ~ SortSize ~ sizes", sizes)
  const [load, setLoad] = useState(false);
  const dispatch = useDispatch();

  const handleSizeChange = (e) => {
    const newSizes = [...sizes];
    const clickedSize = newSizes.indexOf(e.target.value);
    if (clickedSize === -1) {
      newSizes.push(e.target.value);
    } else {
      newSizes.splice(clickedSize, 1);
    }
    setSizes(newSizes);
    setLoad(true);
  };

  useEffect(() => {
    if (load) {
      dispatch(filterProductBySize(sizes));
      setLoad(false);
    }
  }, [load, sizes, dispatch]);

  return (
    <>
      <div className="py-2 px-4 bg-dark text-white mb-3 mt-3">
        <strong className="small text-uppercase font-weight-bold">Sizes</strong>
      </div>
      <ul className="list-unstyled small text-muted pl-lg-2 font-weight-normal">
        {SIZES.map((size, index) => (
          <>
            {" "}
            <div className="d-flex align-items-center" key={index}>
              <Checkbox
                color="primary"
                value={size.name}
                onChange={(e) => handleSizeChange(e)}
              />
              <p className="checkBox-title">{size.name}</p>
            </div>{" "}
          </>
        ))}
      </ul>
    </>
  );
};

export default SortSize;
