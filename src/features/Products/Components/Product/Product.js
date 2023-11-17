import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FavouriteBtn from "../../../../components/FavouriteBtn/FavouriteBtn";
import { toastError } from "../../../../utils/common";
import { addToCart } from "../../../Cart/cartSlice";
import "./style.css";
const Product = ({ item, auth, dispatch }) => {
  const { currentSocket } = useSelector((state) => state.socket);

  const handleAddToCart = (product) => {
    const firstLogin = localStorage.getItem("firstLogin");
    if (firstLogin) {
      const data = {
        idUser: auth.user._id,
        idProduct: product._id,
        nameProduct: product.title,
        priceProduct: product.price,
        sizeProduct: product.sizes[0],
        countProduct: 1,
        img: product.imgs[0],
      };
      dispatch(addToCart({ data, currentSocket }));
    } else {
      return toastError("Please login now to use this function");
    }
  };
  return (
    <>
      <div className="col-xl-3 col-lg-4 col-sm-6" key={item._id}>
        <div className="product text-center">
          <div className="product-top">
            <div className="position-relative mb-3">
              <div className="badge text-white badge-"></div>
              <Link className="d-block" to={`/detail/${item._id}`}>
                <img
                  className="img-fluid w-100"
                  src={item?.imgs[0]?.url}
                  alt="..."
                />
              </Link>
              <div className="product-overlay">
                <ul className="mb-0 list-inline">
                  <li className="list-inline-item m-0 p-0">
                    <FavouriteBtn productId={item._id} isModal={false} />
                  </li>
                  <li className="list-inline-item m-0 p-0">
                    {item?.count === 0 ? (
                      <button className="btn btn-sm btn-dark" disabled>
                        Out of Stock
                      </button>
                    ) : (
                      <button
                        className="btn btn-sm btn-dark"
                        onClick={() => handleAddToCart(item)}
                      >
                        Add to cart
                      </button>
                    )}
                  </li>
                  <li className="list-inline-item mr-0">
                    {/* Dùng Modal phải có href để nó hiện ra thằng đó và thuộc tính data-toggle="modal" để mở modal*/}
                    <a
                      className="btn btn-sm btn-outline-dark"
                      href={`#product_${item._id}`}
                      data-toggle="modal"
                    >
                      <i className="fas fa-expand"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="product-price">
            <h6>
              {" "}
              <a className="reset-anchor" href="detail.html">
                {item.title}
              </a>
            </h6>
            <p className="small text-muted">${item.price}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
