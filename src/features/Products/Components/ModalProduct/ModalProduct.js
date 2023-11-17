import React from "react";
import FavouriteBtn from "../../../../components/FavouriteBtn/FavouriteBtn";
import Stars from "../../../../components/Stars/Stars";
import { percentageCaculating } from "../../../../utils/common";
import "./style.css";
const ModalProduct = ({ item }) => {
  return (
    <>
      <div
        className="modal fade show"
        id={`product_${item._id}`}
        key={item._id}
      >
        <div
          className="modal-dialog modal-lg modal-dialog-centered"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-body p-0">
              <div className="row align-items-stretch">
                <div className="col-lg-6 p-lg-0">
                  <img
                    alt="img"
                    style={{ width: "100%" }}
                    className="product-view d-block h-100 bg-cover bg-center"
                    src={item.imgs[0].url}
                    data-lightbox={`product_${item._id}`}
                  />
                  {/* {item.imgs.map((img) => (
                    <>
                      <img
                        alt="img"
                        style={{ width: "100%" }}
                        className="product-view d-block h-100 bg-cover bg-center"
                        src={img[0]}
                        data-lightbox={`product_${item._id}`}
                      />
                      <img alt="img" className="d-none" href={img[1]} />
                      <img alt="img" className="d-none" href={img[2]} />
                      <img alt="img" className="d-none" href={img[3]} />
                    </>
                  ))} */}
                </div>
                <div className="col-lg-6">
                  {/* Để tắt modal phải có class="close" và data-dissmiss="modal" và aria-label="Close" */}
                  <a
                    className="close p-4"
                    type="button"
                    href="#section_product"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    ×
                  </a>
                  <div className="p-5 my-md-4">
                    <ul className="list-inline mb-2">
                      <Stars ratings={item.ratings} />
                    </ul>
                    <h2 className="h4">{item.title}</h2>
                    <div
                      className="mt-2 mb-2 d-flex align-items-center pro-heading"
                      style={{ gap: "0 10px" }}
                    >
                      <span className="pro-sale">
                        {percentageCaculating(item?.price, item?.discount)} %
                      </span>
                      <span className="pro-price">$ {item?.price}</span>
                      <del className="pro-dis">$ {item?.discount}</del>
                    </div>
                    <p className="text-small mb-4">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      In ut ullamcorper leo, eget euismod orci. Cum sociis
                      natoque penatibus et magnis dis parturient montes nascetur
                      ridiculus mus. Vestibulum ultricies aliquam convallis.
                    </p>
                    <div className="row align-items-stretch mb-4">
                      <div className=" pl-sm-0 fix_addwish">
                        <FavouriteBtn productId={item._id} isModal={true} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalProduct;
