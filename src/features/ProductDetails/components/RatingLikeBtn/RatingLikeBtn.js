import React from "react";

const RatingLikeBtn = ({ isLike, handleLike, handleUnlike, rating }) => {
  return (
    <>
      {isLike ? (
        <span
          className="btn btn-sm  d-flex align-items-center justify-content-center"
          onClick={() => handleUnlike(rating)}
        >
          <i className="fas fa-heart"></i>
        </span>
      ) : (
        <span
          className="btn btn-sm  d-flex align-items-center justify-content-center"
          onClick={() => handleLike(rating)}
        >
          <i className="far fa-heart"></i>
        </span>
      )}
    </>
  );
};

export default RatingLikeBtn;
