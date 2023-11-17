import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Loading from "../../assets/loading.gif";
import Carousels from "../../components/Carousels/Carousels";
import FavouriteBtn from "../../components/FavouriteBtn/FavouriteBtn";
import Footer from "../../components/Footer/Footer";
import Stars from "../../components/Stars/Stars";
import { percentageCaculating, toastError } from "../../utils/common";
import { addToCart } from "../Cart/cartSlice";
import { createNotifyAction } from "../Notification/notificationSlice";
import ProductRating from "./components/ProductRating/ProductRating";
import RelatedProduct from "./components/RelatedProduct/RelatedProduct";
import {
  createRatingAction,
  getProductDetail,
  loadingAction,
} from "./productDetailSlice";
import "./style.css";
const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, loading, productRelated } = useSelector(
    (state) => state.productDetail
  );
  const { auth } = useSelector((state) => state);
  const { currentSocket } = useSelector((state) => state.socket);
  const [quantity, setQuantity] = useState(1);
  const [productSizes, setProductSizes] = useState("");
  const [comment, setComment] = useState("");
  const [stars, setStars] = useState(0);
  const [review, setReview] = useState("description");
  const [load, setLoad] = useState(false);
  const [onReply, setOnReply] = useState(false);

  useEffect(() => {
    const params = { id };
    const query = "?" + queryString.stringify(params);
    dispatch(loadingAction(true));
    dispatch(getProductDetail(query));
  }, [dispatch, id]);

  useEffect(() => {
    if (product?.title) {
      setProductSizes(product?.sizes[0]);
    } else {
      setProductSizes("");
    }
  }, [product]);

  useEffect(() => {
    if (onReply) {
      setStars(onReply.stars);
    }
  }, [onReply]);

  const handleIncreaseQuality = () => {
    setQuantity((prev) => prev + 1);
  };
  const handleDecreaseQuality = () => {
    if (quantity === 0) return;
    setQuantity((prev) => prev - 1);
  };

  const handleSizeChange = (e) => {
    setProductSizes(e.target.value);
  };

  const handleAddToCart = () => {
    const firstLogin = localStorage.getItem("firstLogin");
    if (firstLogin) {
      if (quantity === 0) {
        return toastError("Please choose another quanlity of this product !");
      }
      const data = {
        idUser: auth.user._id,
        idProduct: product._id,
        nameProduct: product.title,
        priceProduct: product.price,
        sizeProduct: productSizes,
        countProduct: quantity,
        img: product.imgs[0],
      };

      dispatch(addToCart({ data, currentSocket }));
    } else {
      return toastError("Please login now to use this function");
    }
  };

  const handleCancelReply = () => {
    setOnReply(false);
    setStars(0);
    setComment("");
  };

  const handlerComment = () => {
    const firstLogin = localStorage.getItem("firstLogin");
    if (firstLogin) {
      if (stars > 5 || stars === 0) {
        return toastError(
          "Stars must be at least 5 characters and more than 0!"
        );
      } else {
        setLoad(true);
        const data = {
          content: comment,
          stars: stars,
          productId: product._id,
          likes: [],
          username: auth.user.username,
          userAvatar: auth.user.avatar,
          userId: auth.user._id,
          createdAt: new Date().toISOString(),
          reply: onReply ? onReply._id : undefined,
          tag: onReply ? onReply.user : undefined,
        };

        dispatch(createRatingAction({ data, currentSocket, setLoad }));

        if (auth.user.isAdmin === true && onReply !== false) {
          const msg = {
            text: "Admin mentioned in a comment !",
            recipient: onReply.user._id,
            url: `/detail/${data.productId}`,
            content: data.content,
            idUser: onReply.user._id,
            user: data.username,
          };
          dispatch(createNotifyAction({ msg, currentSocket }));
        }

        handleCancelReply();
      }
    } else {
      return toastError("Please login now to use this function");
    }
  };

  return (
    <>
      <section className="py-5">
        <div className="container">
          <div className="row mb-5">
            {loading ? (
              <img src={Loading} alt="Loading" />
            ) : (
              <>
                <div className="col-lg-6">
                  <div className="row m-sm-0">
                    <div className="col-sm-2 p-sm-0 order-2 order-sm-1 mt-2 mt-sm-0">
                      <div
                        className="owl-thumbs d-flex flex-row flex-sm-column"
                        data-slider-id="1"
                      >
                        {product?.imgs?.map((img, index) => (
                          <div
                            className="owl-thumb-item flex-fill mb-2 mr-2 mr-sm-0"
                            key={index}
                          >
                            <img className="w-100" src={img?.url} alt="..." />
                          </div>
                        ))}
                      </div>
                    </div>

                    {product?.imgs?.length > 0 && (
                      <Carousels imgs={product.imgs} />
                    )}
                  </div>
                </div>

                <div className="col-lg-6">
                  <ul className="list-inline mb-2">
                    <Stars ratings={product.ratings} />
                  </ul>
                  <h1>{product?.title}</h1>
                  <div
                    className="mt-2 mb-2 d-flex align-items-center pro-heading"
                    style={{ gap: "0 10px" }}
                  >
                    <span className="pro-sale">
                      {percentageCaculating(product?.price, product?.discount)}{" "}
                      %
                    </span>
                    <span className="pro-price">$ {product?.price}</span>
                    <del className="pro-dis">$ {product?.discount}</del>
                  </div>
                  <div className="row align-items-stretch mb-4">
                    <div className="col-sm-5 pr-sm-0">
                      <div className="border d-flex align-items-center justify-content-between py-1 px-3 bg-white border-white">
                        <span className="small text-uppercase text-gray mr-4 no-select">
                          Quantity
                        </span>

                        <div className="quantity">
                          <button
                            className="dec-btn p-0"
                            style={{ cursor: "pointer" }}
                          >
                            <i
                              className="fas fa-caret-left"
                              onClick={handleDecreaseQuality}
                            ></i>
                          </button>
                          <input
                            className="form-control border-0 shadow-0 p-0"
                            type="text"
                            value={quantity}
                            onChange={(e) =>
                              setQuantity(parseInt(e.target.value))
                            }
                          />
                          <button
                            className="inc-btn p-0"
                            style={{ cursor: "pointer" }}
                          >
                            <i
                              className="fas fa-caret-right"
                              onClick={handleIncreaseQuality}
                            ></i>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="col-sm-3 pl-sm-0">
                      {product?.count === 0 ? (
                        <button
                          className="btn btn-dark btn-sm btn-block d-flex align-items-center justify-content-center px-0 text-white"
                          disabled
                        >
                          Out of Stock
                        </button>
                      ) : (
                        <button
                          className="btn btn-dark btn-sm btn-block d-flex align-items-center justify-content-center px-0 text-white"
                          onClick={handleAddToCart}
                        >
                          Add to cart
                        </button>
                      )}
                    </div>

                    <FavouriteBtn productId={product._id} isModal={false} />
                  </div>

                  <br />

                  <div className="productDetail-select py-2 ">
                    <strong className="text-uppercase text-dark productDetail-text">
                      Sizes:
                    </strong>
                    <select
                      className="form-select form-select-sm ml-3"
                      aria-label="Default select example"
                      value={productSizes}
                      onChange={handleSizeChange}
                    >
                      {product?.sizes?.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <ul className="list-unstyled small d-inline-block">
                    <li className=" py-2 mb-1 bg-white text-muted">
                      <strong className="text-uppercase text-dark">
                        Category:
                      </strong>
                      <span className="reset-anchor ml-2">
                        {product?.categories?.toString()}
                      </span>
                    </li>
                    <li className=" py-2 mb-1 bg-white">
                      <strong className="text-uppercase">Count:</strong>
                      <span className="ml-2 text-muted">{product?.count}</span>
                    </li>
                    <li className=" py-2 mb-1 bg-white text-muted">
                      <strong className="text-uppercase text-dark">
                        Likes:
                      </strong>
                      <span className="reset-anchor ml-2">
                        {product?.likes?.length} people
                      </span>
                    </li>
                    <li className=" py-2 mb-1 bg-white text-muted">
                      <strong className="text-uppercase text-dark">
                        Sold:
                      </strong>
                      <span className="reset-anchor ml-2">
                        {product?.sold} products
                      </span>
                    </li>
                    <li className=" py-2 mb-1 bg-white text-muted">
                      <strong className="text-uppercase text-dark">
                        Stock:
                      </strong>
                      <span className="reset-anchor ml-2">
                        {product?.count === 0 ? (
                          <span className="reset-anchor ">Out of stock</span>
                        ) : (
                          <span className="reset-anchor ">Available</span>
                        )}
                      </span>
                    </li>
                  </ul>
                </div>
              </>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">Comment:</label>
            <textarea
              className="form-control"
              rows="3"
              onChange={(e) => setComment(e.target.value)}
              value={comment}
            ></textarea>
          </div>
          <div className="d-flex justify-content-between">
            <div className="d-flex w-25">
              <span className="mt-2">Evaluate: </span>
              &nbsp; &nbsp;
              <input
                className="form-control w-25"
                type="number"
                min="1"
                max="5"
                value={stars}
                onChange={(e) => setStars(e.target.value)}
              />
              &nbsp; &nbsp;
              <span className="mt-2">Star</span>
            </div>

            <div className="d-flex align-items-center gap-2">
              {load ? (
                <img
                  src={Loading}
                  className="btn-load"
                  alt="Loading"
                  width="50px"
                />
              ) : (
                <>
                  {onReply && (
                    <button
                      className="btn btn-dark btn-sm btn-block px-0 text-white mt-2"
                      style={{ width: "8rem" }}
                      onClick={handleCancelReply}
                    >
                      Cancel Reply
                    </button>
                  )}
                  <button
                    className="btn btn-dark btn-sm btn-block px-0 text-white ml-3"
                    style={{ width: "8rem" }}
                    onClick={handlerComment}
                    disabled={comment ? false : true}
                  >
                    Send
                  </button>
                </>
              )}
            </div>
          </div>

          <br />
          <ul className="nav nav-tabs border-0">
            <li className="nav-item">
              <button
                className="nav-link fix_comment"
                onClick={(e) => setReview("description")}
                style={
                  review === "description"
                    ? { backgroundColor: "#383838", color: "#ffffff" }
                    : { color: "#383838" }
                }
              >
                Description
              </button>
            </li>
            <li className="nav-item">
              <button
                className="nav-link fix_comment"
                onClick={(e) => setReview("review")}
                style={
                  review === "review"
                    ? { backgroundColor: "#383838", color: "#ffffff" }
                    : { color: "#383838" }
                }
              >
                Reviews
              </button>
            </li>
          </ul>

          <ProductRating
            review={review}
            ratings={product.ratings}
            auth={auth}
            dispatch={dispatch}
            setOnReply={setOnReply}
            productId={id}
          />

          <RelatedProduct
            categories={product.categories}
            dispatch={dispatch}
            productRelated={productRelated}
          />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ProductDetails;
