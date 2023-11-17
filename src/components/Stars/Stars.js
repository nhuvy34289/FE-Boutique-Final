import React from "react";

const Stars = ({ ratings }) => {
  const productStar = () => {
    let numArr = [];
    let numberStar;

    if (ratings?.length === 0) {
      return "";
    }

    if (ratings?.length > 0) {
      ratings?.map((item) => numArr.push(parseInt(item.stars)));
      numberStar = numArr.reduce((a, b) => a + b);
      let numCount = parseFloat(numberStar / numArr.length).toFixed(2);
      return (
        <>
          <li className="list-inline-item m-0">
            {numCount >= 1 && numCount < 2 ? (
              <>
                <i className="fas fa-star small text-warning"></i>
              </>
            ) : numCount >= 2 && numCount < 3 ? (
              <>
                <i className="fas fa-star small text-warning"></i>
                <i className="fas fa-star small text-warning"></i>
              </>
            ) : numCount >= 3 && numCount < 4 ? (
              <>
                <i className="fas fa-star small text-warning"></i>
                <i className="fas fa-star small text-warning"></i>
                <i className="fas fa-star small text-warning"></i>
              </>
            ) : numCount >= 4 && numCount < 5 ? (
              <>
                <i className="fas fa-star small text-warning"></i>
                <i className="fas fa-star small text-warning"></i>
                <i className="fas fa-star small text-warning"></i>
                <i className="fas fa-star small text-warning"></i>
              </>
            ) : (
              <>
                <i className="fas fa-star small text-warning"></i>
                <i className="fas fa-star small text-warning"></i>
                <i className="fas fa-star small text-warning"></i>
                <i className="fas fa-star small text-warning"></i>
                <i className="fas fa-star small text-warning"></i>
              </>
            )}
          </li>
        </>
      );
    }
  };
  return <>{productStar()}</>;
};

export default Stars;
