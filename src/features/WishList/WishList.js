import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import Product from "../Products/Components/Product/Product";
import "./style.css";
const WishList = () => {
  const { auth } = useSelector((state) => state);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");
    if (!firstLogin) {
      history.push("/");
    }
  }, [history]);

  return (
    <>
      <div className="container">
        <section className="py-5 bg-light">
          <div className="container">
            <div className="row px-4 px-lg-5 py-lg-4 align-items-center">
              <div className="col-lg-6">
                <h1 className="h2 text-uppercase mb-0">Your WishList</h1>
              </div>
              <div className="col-lg-6 text-lg-right">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb justify-content-lg-end mb-0 px-0">
                    <li className="breadcrumb-item active" aria-current="page">
                      Products
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </section>

        <section className="py-5">
          <div className="container p-0">
            <div className="row">
              {auth?.user?.favouriteProducts?.length > 0 ? (
                auth?.user?.favouriteProducts?.map((item) => (
                  <Product item={item} key={item._id} auth={auth} dispatch={dispatch} />
                ))
              ) : (
                <>
                  <div className="py-5 wishList-center">
                    <h2 className="h5 text-uppercase mb-4 text-center">
                      There is no product here !
                    </h2>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default WishList;
