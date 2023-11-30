import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Images from "../../components/Images/Images";
import Conversations from "../Conversations/Conversations";
import ModalProduct from "../Products/Components/ModalProduct/ModalProduct";
import Product from "../Products/Components/Product/Product";
import { getProducts } from "../Products/productSlice";
import "./style.css";

const HomePage = () => {
  const { sellingProducts } = useSelector((state) => state.product);
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <>
      <div className="homepage-container">
        <section className="header bg-white">
          {sellingProducts &&
            sellingProducts.map((item) => (
              <ModalProduct item={item} key={item._id} />
            ))}

          <div className="container">
            <section
              className="hero pb-3 bg-cover bg-center d-flex align-items-center"
              style={{ backgroundImage: `url(${Images.banner})` }}
            >
              <div className="container py-5">
                <div className="row px-4 px-lg-5">
                  <div className="col-lg-6">
                    <p className="text-muted small text-uppercase mb-2">
                      New Inspiration 2021
                    </p>
                    <h1 className="h2 text-uppercase mb-3">
                      20% off on new season
                    </h1>
                    <a className="btn btn-dark" href="shop.html">
                      Browse collections
                    </a>
                  </div>
                </div>
              </div>
            </section>

            <section className="pt-5">
              <header className="text-center">
                <p className="small text-muted small text-uppercase mb-1">
                  Carefully created collections
                </p>
                <h2 className="h5 text-uppercase mb-4 text-bold">
                  Browse our categories
                </h2>
              </header>
              <div className="row">
                <div className="col-md-4 mb-4 mb-md-0">
                  <Link className="category-item" to={"/shop"}>
                    <img className="img-fluid" src={Images.img1} alt="" />
                    <strong className="category-item-title">Sweater</strong>
                  </Link>
                </div>
                <div className="col-md-4 mb-4 mb-md-0">
                  <Link className="category-item mb-4" to={"/shop"}>
                    <img className="img-fluid" src={Images.img2} alt="" />
                    <strong className="category-item-title">Cardigan</strong>
                  </Link>
                  <Link className="category-item" to={"/shop"}>
                    <img className="img-fluid" src={Images.img3} alt="" />
                    <strong className="category-item-title">Hoodie</strong>
                  </Link>
                </div>
                <div className="col-md-4">
                  <Link className="category-item" to={"/shop"}>
                    <img className="img-fluid" src={Images.img4} alt="" />
                    <strong className="category-item-title">Shirt</strong>
                  </Link>
                </div>
              </div>
            </section>

            <section className="py-5" id="section_product">
              <header>
                <p className="small text-muted small text-uppercase mb-1">
                  Made the hard way
                </p>
                <h2 className="h5 text-uppercase mb-4 text-bold">
                  Top trending products
                </h2>
              </header>
              <div className="row">
                {sellingProducts &&
                  sellingProducts
                    .slice(3, 7)
                    .map((item) => (
                      <Product
                        item={item}
                        auth={auth}
                        key={item._id}
                        dispatch={dispatch}
                      />
                    ))}
              </div>
            </section>

            <section className="py-5 bg-light">
              <div className="container">
                <div className="row text-center">
                  <div className="col-lg-4 mb-3 mb-lg-0">
                    <div className="d-inline-block">
                      <div className="media align-items-end">
                        {/* <svg className="svg-icon svg-icon-big svg-icon-light">
                          <use xlinkHref="#delivery-time-1"></use>
                        </svg> */}
                        <div className="media-body text-left ml-3">
                          <h6 className="text-uppercase mb-1 text-bold">
                            Free shipping
                          </h6>
                          <p className="text-small mb-0 text-muted">
                            Free shipping worlwide
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 mb-3 mb-lg-0">
                    <div className="d-inline-block">
                      <div className="media align-items-end">
                        {/* <svg className="svg-icon svg-icon-big svg-icon-light">
                          <use xlinkHref="#helpline-24h-1"> </use>
                        </svg> */}
                        <div className="media-body text-left ml-3">
                          <h6 className="text-uppercase mb-1 text-bold">
                            24 x 7 service
                          </h6>
                          <p className="text-small mb-0 text-muted">
                            Free shipping worlwide
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="d-inline-block">
                      <div className="media align-items-end">
                        {/* <svg className="svg-icon svg-icon-big svg-icon-light">
                          <use xlinkHref="#label-tag-1"> </use>
                        </svg> */}
                        <div className="media-body text-left ml-3">
                          <h6 className="text-uppercase mb-1 text-bold">
                            Festival offer
                          </h6>
                          <p className="text-small mb-0 text-muted">
                            Free shipping worlwide
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="py-5">
              <div className="container p-0">
                <div className="row">
                  <div className="col-lg-6 mb-3 mb-lg-0">
                    <h5 className="text-uppercase text-bold">
                      Let's be friends!
                    </h5>
                    <p className="text-small text-muted mb-0">
                      Nisi nisi tempor consequat laboris nisi.
                    </p>
                  </div>
                  <div className="col-lg-6">
                    <form action="#">
                      <div className="input-group flex-column flex-sm-row mb-3">
                        <input
                          className="form-control form-control-lg py-3"
                          type="email"
                          placeholder="Enter your email address"
                          aria-describedby="button-addon2"
                        />
                        <div className="input-group-append">
                          <button
                            className="btn btn-dark btn-block"
                            id="button-addon2"
                            type="submit"
                          >
                            Subscribe
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </section>
      </div>
      <Conversations />
      <Footer />
    </>
  );
};

export default HomePage;
