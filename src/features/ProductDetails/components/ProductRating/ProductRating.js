import React from "react";
import RatingContent from "./RatingContent/RatingContent";
const ProductRating = ({
  review,
  ratings,
  auth,
  setOnReply,
  onReply,
  productId,
}) => {
  const caculateStars = (stars) => {
    return (
      <>
        <li className="list-inline-item m-0">
          {stars >= 1 && stars < 2 ? (
            <>
              <i className="fas fa-star small text-warning"></i>
            </>
          ) : stars >= 2 && stars < 3 ? (
            <>
              <i className="fas fa-star small text-warning"></i>
              <i className="fas fa-star small text-warning"></i>
            </>
          ) : stars >= 3 && stars < 4 ? (
            <>
              <i className="fas fa-star small text-warning"></i>
              <i className="fas fa-star small text-warning"></i>
              <i className="fas fa-star small text-warning"></i>
            </>
          ) : stars >= 4 && stars < 5 ? (
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
  };

  const newRatings = ratings?.filter((rating) => !rating.reply);

  return (
    <>
      <div className="tab-content mb-5">
        {review === "description" ? (
          <div className="tab-pane fade show active">
            <div className="p-4 p-lg-5 bg-white">
              <h6 className="text-uppercase">Product description </h6>
              <p className="text-muted text-small mb-0">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
          </div>
        ) : (
          <div className="tab-pane fade show active">
            <div className="p-4 p-lg-5 bg-white">
              {newRatings?.length > 0 &&
                newRatings?.map((rating, index) => (
                  <RatingContent
                    rating={rating}
                    key={index}
                    auth={auth}
                    caculateStars={caculateStars}
                    setOnReply={setOnReply}
                    onReply={onReply}
                    replyCm={ratings.filter(
                      (item) => item.reply === rating._id
                    )}
                    productId={productId}
                  />
                ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductRating;
