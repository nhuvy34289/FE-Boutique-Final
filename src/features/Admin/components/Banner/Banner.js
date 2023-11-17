import React from "react";

const Banner = () => {
  return (
    <>
      <div className="row d-flex justify-content-center">
        <div className="col-xl-4 col-lg-12 col-md-12 col-sm-12 col-12 cardItem">
          <div className="bg-card bg-card1">
            <div className="bg-text">
              <h3>1000$</h3>
              <span>Monthly Income</span>
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-lg-12 col-md-12 col-sm-12 col-12 cardItem">
          <div className="bg-card bg-card2">
            <div className="bg-text">
              <h3>100</h3>
              <span>Products</span>
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-lg-12 col-md-12 col-sm-12 col-12 cardItem">
          <div className="bg-card bg-card3">
            <div className="bg-text">
              <h3>5000+</h3>
              <span>Histories</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
