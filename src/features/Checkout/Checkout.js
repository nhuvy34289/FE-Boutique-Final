import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Loading from "../../assets/loading.gif";
import { toastError } from "../../utils/common";
import { checkOutAction } from "../Cart/cartSlice";
import CheckoutInput from "./components/CheckoutInput/CheckoutInput";
const Checkout = () => {
  const initialState = {
    fullname: "",
    email: "",
    phone: "",
    address: "",
  };

  const dispatch = useDispatch();
  const history = useHistory();
  const { auth, cart } = useSelector((state) => state);

  const [checkoutInput, setCheckoutInput] = useState(initialState);
  const [success, setSuccess] = useState(false);
  const [load, setLoad] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCheckoutInput({
      ...checkoutInput,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      checkoutInput.fullname === "" ||
      checkoutInput.email === "" ||
      checkoutInput.address === "" ||
      checkoutInput.phone === ""
    ) {
      return toastError("Please fill up the form !");
    } else {
      const data = {
        ...checkoutInput,
        idUser: auth.user._id,
      };
      setLoad(true);
      dispatch(checkOutAction({ data }));
      setTimeout(() => {
        setSuccess(true);
        setLoad(false);
      }, 1500);

    }
  };
  console.log(success);

  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");
    if (!firstLogin) {
      history.push("/");
    }
  }, [history]);

  return (
    <div>
      <div className="container">
        <section className="py-5 bg-light">
          <div className="container">
            <div className="row px-4 px-lg-5 py-lg-4 align-items-center">
              <div className="col-lg-6">
                <h1 className="h2 text-uppercase mb-0">Checkout</h1>
              </div>
              <div className="col-lg-6 text-lg-right">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb justify-content-lg-end mb-0 px-0">
                    <li className="breadcrumb-item">
                      <Link to="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item">
                      <Link to="/cart">Cart</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Checkout
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </section>

        {!success ? (
          <section className="py-5">
            <h2 className="h5 text-uppercase mb-4">Billing details</h2>
            {cart?.cartItems?.length > 0 && (
              <div className="row">
                <div className="col-lg-8">
                  <CheckoutInput
                    value={checkoutInput.fullname}
                    handleInputChange={handleInputChange}
                    name="fullname"
                    placeholder="Enter your fullname ..."
                  />
                  <CheckoutInput
                    value={checkoutInput.email}
                    handleInputChange={handleInputChange}
                    name="email"
                    placeholder="Enter your email ..."
                  />
                  <CheckoutInput
                    value={checkoutInput.phone}
                    handleInputChange={handleInputChange}
                    name="phone"
                    placeholder="Enter your mobile phone ..."
                    type="number"
                  />
                  <CheckoutInput
                    value={checkoutInput.address}
                    handleInputChange={handleInputChange}
                    name="address"
                    placeholder="Enter your address ..."
                  />
                  {load ? (
                    <div className="col-lg-12 form-group text-center">
                      <img src={Loading} alt="Loading" className="loader-img" />
                    </div>
                  ) : (
                    <div className="col-lg-12 form-group text-center">
                      <button
                        className="btn btn-dark"
                        style={{ color: "white" }}
                        type="submit"
                        onClick={handleSubmit}
                      >
                        Place order
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </section>
        ): (
          <section className="py-5">
          <div className="p-5">
            <h1>You Have Successfully Ordered!</h1>
            <p style={{ fontSize: "1.2rem" }}>Please Check Your Email.</p>
          </div>
        </section>
        )}

        {/* {success && (

        )} */}
      </div>
    </div>
  );
};

export default Checkout;
