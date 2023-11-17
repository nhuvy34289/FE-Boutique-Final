import React from "react";

const Carousels = ({ imgs }) => {
  const firstImg = imgs[0];
  const restImgs = imgs.filter((item) => item.public_id !== firstImg.public_id);
  return (
    <>
      <div
        id="carouselExampleControls"
        className="carousel slide col-sm-10 order-1 order-sm-2"
        data-ride="carousel"
      >
        <div className="carousel-inner owl-carousel product-slider">
          <div className="carousel-item active">
            <img
              className="d-block w-100"
              src={firstImg.url}
              alt="First slide"
            />
          </div>
          {restImgs.map((img, index) => (
            <div className="carousel-item" key={index}>
              <img
                className="d-block w-100"
                src={img?.url}
                alt="Second slide"
              />
            </div>
          ))}
        </div>
        <a
          className="carousel-control-prev"
          href="#carouselExampleControls"
          role="button"
          data-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#carouselExampleControls"
          role="button"
          data-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
    </>
  );
};

export default Carousels;
