import queryString from "query-string";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router";
import Loading from "../../../../assets/loading.gif";
import Footer from "../../../../components/Footer/Footer";
import { replaceString, toastError } from "../../../../utils/common";
import { resetPasswordAction } from "../../authSlice";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const { token } = useParams();
  const history = useHistory();
  const initialState = {
    password: "",
    cf_password: "",
  };

  const [load, setLoad] = useState(false);
  const [inputValue, setInputValue] = useState(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputValue.password !== inputValue.cf_password) {
      return toastError("Your password does not match with confirm password");
    } else {
      setLoad(true);
      let query =
        "?" + queryString.stringify({ password: inputValue.password, token });
      query = replaceString(query, "%40", "@");

      dispatch(resetPasswordAction({ query, setLoad, history }));
      setInputValue(initialState);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
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
              <span className="auth-form-title p-b-33">
                Reset Your Password
              </span>
              <div className="auth-input validate-input">
                <input
                  type="password"
                  className="input100"
                  placeholder="New Password"
                  name="password"
                  value={inputValue.password}
                  onChange={handleInputChange}
                />
              </div>
              <div className="auth-input validate-input mt-3">
                <input
                  type="password"
                  className="input100"
                  placeholder="Confirm Password"
                  name="cf_password"
                  value={inputValue.cf_password}
                  onChange={handleInputChange}
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
                      disabled={
                        inputValue.password === "" ||
                        inputValue.cf_password === ""
                          ? true
                          : false
                      }
                    >
                      Submit
                    </button>
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

export default ResetPassword;
