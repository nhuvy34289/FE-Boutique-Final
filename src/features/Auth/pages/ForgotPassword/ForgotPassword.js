import queryString from "query-string";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../../../../components/Footer/Footer";
import { replaceString } from "../../../../utils/common";
import { validateEmail } from "../../../../utils/validate";
import { forgotPasswordAction } from "../../authSlice";
import Loading from "../../../../assets/loading.gif";
const ForgotPassword = () => {
  const dispatch = useDispatch();

  const [load, setLoad] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail(inputValue)) {
      return toast.error("Your email is not incorrect format", {
        position: "top-right",
      });
    } else {
      setLoad(true);

      let query = "?" + queryString.stringify({ email: inputValue });
      query = replaceString(query, "%40", "@");
      dispatch(forgotPasswordAction({ query, setLoad }));
      setInputValue("");
    }
  };

  return (
    <>
      <div className="auth-wrapper">
        <div className="auth-container">
          <div className="auth-form-login">
            <form
              action="#"
              className="auth-form p-l-55 p-r-55 p-t-65 p-b-50"
              onSubmit={handleSubmit}
            >
              <span className="auth-form-title p-b-33">Forgot Password</span>
              <div className="auth-input validate-input">
                <input
                  type="text"
                  className="input100"
                  placeholder="Email"
                  name="email"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
              </div>
              {load ? (
                <div className="d-flex align-items-center justify-content-center mt-3">
                  <img src={Loading} alt="Loading" width="50px" />
                </div>
              ) : (
                <>
                  <div className="auth-form-btns m-t-20">
                    <button
                      className="auth-form-btn"
                      type="submit"
                      disabled={inputValue === "" ? true : false}
                    >
                      Submit
                    </button>
                  </div>

                  <div className="text-center p-t-45 p-b-4">
                    <span className="txt1">You have an account ?</span>
                    &nbsp;
                    <Link to="/signIn" className="txt2 hov1">
                      Sign In
                    </Link>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ForgotPassword;
