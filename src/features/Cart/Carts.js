import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import CheckoutAPI from "../../api/checkOutApi";
import StripeAPI from "../../api/stripeApi";
import { KEY } from "../../constants/Sizes";
import { totalCaculating } from "../../utils/common";
import { resetCart } from "./cartSlice";
import CartList from "./components/CartList/CartList";
import Loading from "../../assets/loading.gif";
const Carts = () => {
  const { cart, auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [redirect, setRedirect] = useState(false);
  const [stripeToken, setStripeToken] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const onCheckout = () => {
    setRedirect(true);
  };

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const data = {
          tokenId: stripeToken.id,
          amount: Math.round(totalCaculating(cart.cartItems) * 100),
        };

        const newData = {
          fullname: stripeToken.card.name,
          email: stripeToken.email,
          phone: stripeToken.card.address_zip,
          address: stripeToken.card.address_line1,
          idUser: auth.user._id,
        };

        await StripeAPI.postStripe(data);

        setLoaded(newData);
      } catch (error) {
        console.log(error.message);
      }
    };
    stripeToken && makeRequest();
  }, [stripeToken, cart, auth]);

  useEffect(() => {
    if (loaded) {
      const makeRequest = async () => {
        await CheckoutAPI.postEmail(loaded);
        dispatch(resetCart());
        //Dùng setTimeout delay 3s
        //Sau 4s nó sẽ thực hiện
        setTimeout(() => {
          setStripeToken(null);
          setLoaded(false);
        }, 4000);
      };
      makeRequest();
    }
  }, [dispatch, loaded]);

  return (
    <>
      <div className="container">
        <section className="py-5 bg-light">
          <div className="container">
            <div className="row px-4 px-lg-5 py-lg-4 align-items-center">
              <div className="col-lg-6">
                <h1 className="h2 text-uppercase mb-0">Cart</h1>
              </div>
              <div className="col-lg-6 text-lg-right">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb justify-content-lg-end mb-0 px-0">
                    <li className="breadcrumb-item active" aria-current="page">
                      Cart
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </section>
        {localStorage.getItem("firstLogin") ? (
          <>
            <section className="py-5">
              <h2 className="h5 text-uppercase mb-4">Shopping cart</h2>
              <div className="row">
                <div className="col-lg-8 mb-4 mb-lg-0">
                  <CartList cartItems={cart.cartItems} />
                  <div className="bg-light px-4 py-3">
                    <div className="row align-items-center text-center">
                      <div className="col-md-6 mb-3 mb-md-0 text-md-left">
                        <Link
                          className="btn btn-link p-0 text-dark btn-sm"
                          to={`/shop`}
                        >
                          <i className="fas fa-long-arrow-alt-left mr-2"> </i>
                          Continue shopping
                        </Link>
                      </div>
                      <div className="col-md-6 text-md-right">
                        {redirect && <Redirect to={"/checkout"} />}
                        <span
                          className="btn btn-outline-dark btn-sm"
                          onClick={onCheckout}
                        >
                          Procceed to checkout
                          <i className="fas fa-long-arrow-alt-right ml-2"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4">
                  <div className="card border-0 rounded-0 p-lg-4 bg-light">
                    <div className="card-body">
                      <h5 className="text-uppercase mb-4">Cart total</h5>
                      <ul className="list-unstyled mb-0">
                        <li className="d-flex align-items-center justify-content-between">
                          <strong className="text-uppercase small font-weight-bold">
                            Subtotal
                          </strong>
                          <span className="text-muted small">
                            ${totalCaculating(cart.cartItems)}
                          </span>
                        </li>
                        <li className="border-bottom my-2"></li>
                        <li className="d-flex align-items-center justify-content-between mb-4">
                          <strong className="text-uppercase small font-weight-bold">
                            Total
                          </strong>
                          <span>${totalCaculating(cart.cartItems)}</span>
                        </li>
                        <li>
                          <>
                            <div className="form-group mb-0">
                              <StripeCheckout
                                name="Boutique Shop"
                                image="https://thumbs.dreamstime.com/z/lets-shopping-logo-design-template-shop-icon-135610500.jpg"
                                billingAddress
                                shippingAddress
                                description="Online Payment here!"
                                amount={Math.round(totalCaculating(cart.cartItems) * 100)}
                                token={onToken}
                                stripeKey={KEY}
                              >
                                <>
                                  {loaded ? (
                                    <img
                                      src={Loading}
                                      alt="Loading"
                                      width="50px"
                                    />
                                  ) : (
                                    <button className="btn btn-dark btn-sm btn-block">
                                      {" "}
                                      <i className="fas fa-gift mr-2"></i>Check
                                      out Online
                                    </button>
                                  )}
                                </>
                              </StripeCheckout>
                            </div>
                          </>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>{" "}
          </>
        ) : (
          <>
            <section className="py-5">
              <h2 className="h5 text-uppercase mb-4 text-center">
                PLease login now !
              </h2>
            </section>
          </>
        )}
      </div>
    </>
  );
};

export default Carts;
