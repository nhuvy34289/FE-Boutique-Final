import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  likeProductAction,
  unLikeProductAction,
} from "../../features/Auth/authSlice";
import { queryFormat, toastError } from "../../utils/common";
import "./style.css";
const FavouriteBtn = ({ productId, isModal }) => {
  const [isFavourite, setIsFavourite] = useState(false);
  const [load, setLoad] = useState(false);

  const { auth } = useSelector((state) => state);
  const { currentSocket } = useSelector((state) => state.socket);

  const dispatch = useDispatch();

  useEffect(() => {
    if (auth?.user?.favouriteProducts.find((item) => item._id === productId)) {
      setIsFavourite(true);
    }
    return () => setIsFavourite(false);
  }, [auth?.user?.favouriteProducts, productId]);

  const handleLikeItem = (productId) => {
    const firstLogin = localStorage.getItem("firstLogin");
    if (firstLogin) {
      if (load) return;
      setIsFavourite(true);
      let params = { idUser: auth.user._id, idProduct: productId };
      params = queryFormat(params);
      setLoad(true);
      dispatch(likeProductAction({ params, currentSocket }));
      setLoad(false);
    } else {
      return toastError("Please login now to use this function");
    }
  };

  const handleUnLikeItem = (productId) => {
    if (load) return;
    setIsFavourite(false);
    let params = { idUser: auth.user._id, idProduct: productId };
    params = queryFormat(params);
    setLoad(true);
    dispatch(unLikeProductAction({ params, currentSocket }));
    setLoad(false);
  };
  return (
    <>
      {isFavourite ? (
        <span
          className={
            isModal
              ? "btn btn-dark btn-sm btn-block h-100 d-flex align-items-center justify-content-center px-0"
              : "btn btn-sm btn-outline-dark"
          }
          onClick={() => handleUnLikeItem(productId)}
        >
          {isModal ? (
            <div className="follow-desc">
              <i className="far fa-heart mr-2"></i>
              <p className="follow-text">Remove it from your wish list</p>
            </div>
          ) : (
            <i className="far fa-heart favourite-icon"></i>
          )}
        </span>
      ) : (
        <span
          className={
            isModal
              ? "btn btn-dark btn-sm btn-block h-100 d-flex align-items-center justify-content-center px-0"
              : "btn btn-sm btn-outline-dark"
          }
          onClick={() => handleLikeItem(productId)}
        >
          {isModal ? (
            <div className="follow-desc">
              <i className="far fa-heart mr-2 "></i>
              <p className="follow-text ">Add Too Wish List</p>
            </div>
          ) : (
            <i className="far fa-heart"></i>
          )}
        </span>
      )}
    </>
  );
};

export default FavouriteBtn;
