import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RatingApi from "../../../../../api/ratingApi";
import { queryFormat, toastSuccess } from "../../../../../utils/common";
import { createNotifyAction } from "../../../../Notification/notificationSlice";
import { removeRatingProductDetail } from "../../../productDetailSlice";
import RatingLikeBtn from "../../RatingLikeBtn/RatingLikeBtn";

const RatingContent = ({
  rating,
  auth,
  caculateStars,
  setOnReply,
  onReply,
  replyCm,
  productId,
}) => {
  const [isLike, setIsLike] = useState(false);
  const [loadLike, setLoadLike] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const { currentSocket } = useSelector((state) => state.socket);
  const dispatch = useDispatch();

  useEffect(() => {
    if (rating?.likes?.find((item) => item._id === auth.user._id)) {
      setIsLike(true);
    }
  }, [rating, auth]);

  useEffect(() => {
    if (replyCm?.likes?.find((item) => item._id === auth.user._id)) {
      setIsLike(true);
    }
  }, [replyCm, auth]);

  const handleLike = async (rating) => {
    if (loadLike) return;
    setIsLike(true);

    const data = {
      ...rating,
      idRating: rating._id,
      idUser: auth.user._id,
    };

    setLoadLike(true);
    const res = await RatingApi.likeRating(data);
    toastSuccess(`${res.msg}`);

    const msg = {
      id: res.newRatings._id,
      text: "Admin liked your comment !",
      recipient: res.newRatings.user._id,
      url: `/detail/${productId}`,
      content: res.newRatings.content,
      idUser: res.newRatings.user._id,
      user: { username: res.newRatings.user.username },
    };

    dispatch(createNotifyAction({ msg, currentSocket }));

    setLoadLike(false);
  };

  const handleUnlike = async (rating) => {
    if (loadLike) return;
    setIsLike(false);

    const data = {
      ...rating,
      idRating: rating._id,
      idUser: auth.user._id,
    };

    setLoadLike(true);
    const res = await RatingApi.unLikeRating(data);
    toastSuccess(`${res.msg}`);
    setLoadLike(false);
  };

  const handleDeleteRating = async (rating) => {
    const query = queryFormat({ idRating: rating._id });
    dispatch(removeRatingProductDetail(rating));
    const res = await RatingApi.deleteRating(query);
    currentSocket.emit("deleteRatingProduct", res.newProduct);
    toastSuccess(`${res.msg}`);
  };

  const handleReplyComment = (rating) => {
    if (onReply) return setOnReply(false);
    setOnReply(rating);
  };

  return (
    <>
      <div className="row">
        <div className="col-lg-10">
          <div className="media mb-3">
            <img
              className="rounded-circle"
              src={rating.userAvatar}
              alt=""
              width="50"
            />
            <div className="media-body ml-3">
              <h6 className="mb-0 text-uppercase">{rating.username}</h6>
              <p className="small text-muted mb-0 text-uppercase">
                {moment(rating.createdAt).fromNow()}
              </p>
              <ul className="list-inline mb-1 text-xs">
                {caculateStars(rating.stars)}
              </ul>
              <p className="text-small mb-0 text-muted">
                Content: {rating.content}
                {rating.likes.length > 0 && (
                  <span>
                    {" "}
                    ( liked by admin
                    <i className="fas fa-heart" aria-hidden="true"></i> )
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>

        {auth?.user?.isAdmin === true && (
          <div className="col-lg-2 mb-3 d-flex justify-content-center align-items-center">
            <RatingLikeBtn
              isLike={isLike}
              handleLike={handleLike}
              handleUnlike={handleUnlike}
              rating={rating}
            />
            <span
              className="btn btn-sm  d-flex align-items-center justify-content-center"
              onClick={() => handleReplyComment(rating)}
            >
              <i className="fas fa-edit"></i>
            </span>
            <span
              className="btn btn-sm  d-flex align-items-center justify-content-center"
              onClick={() => handleDeleteRating(rating)}
            >
              <i className="fas fa-trash"></i>
            </span>
          </div>
        )}
      </div>
      {replyCm.length > 0 && (
        <span
          className="font-italic font-weight-bold"
          style={{ cursor: "pointer", fontSize: "13px" }}
          onClick={() => setIsShow(!isShow)}
        >
          {isShow
            ? `Hide ${replyCm.length} Reply`
            : `Show ${replyCm.length} Reply`}
        </span>
      )}

      {isShow && (
        <>
          {replyCm.length > 0 &&
            replyCm?.map((cm) => (
              <div className="row ml-3" key={cm._id}>
                <div className="col-lg-7">
                  <div className="media mb-3">
                    <img
                      className="rounded-circle"
                      src={cm.userAvatar}
                      alt=""
                      width="50"
                    />
                    <div className="media-body ml-3">
                      <h6 className="mb-0 text-uppercase">{cm.username}</h6>
                      <p className="small text-muted mb-0 text-uppercase">
                        {moment(cm.createdAt).fromNow()}
                      </p>
                      <ul className="list-inline mb-1 text-xs">
                        {caculateStars(cm.stars)}
                      </ul>
                      <p className="text-small mb-0 text-muted">
                        Content: {cm.content}
                      </p>
                    </div>
                  </div>
                </div>
                {auth?.user?.isAdmin === true && (
                  <div className="col-lg-2 mb-3 d-flex justify-content-center align-items-center">
                    <span
                      className="btn btn-sm  d-flex align-items-center justify-content-center"
                      onClick={() => handleDeleteRating(cm)}
                    >
                      <i className="fas fa-trash"></i>
                    </span>
                  </div>
                )}
              </div>
            ))}{" "}
        </>
      )}
    </>
  );
};

export default RatingContent;
