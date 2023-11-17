import queryString from "query-string";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../../../../components/Footer/Footer";
import { replaceString } from "../../../../utils/common";
import { validateEmail } from "../../../../utils/validate";
import { loginAction } from "../../authSlice";
import "./style.css";

const SignIn = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const initialState = {
    email: "",
    password: "",
  };
  const [inputValue, setInputValue] = useState(initialState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputValue.email === "" || inputValue.password === "") {
      return toast.error("Please enter your email and password", {
        position: "top-right",
      });
    } else if (!validateEmail(inputValue.email)) {
      return toast.error("Your email is not incorrect format", {
        position: "top-right",
      });
    } else {
      let query = "?" + queryString.stringify(inputValue);

      query = replaceString(query, "%40", "@");

      dispatch(loginAction({ query, history }));

      setInputValue(initialState);
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
              <span className="auth-form-title p-b-33">Sign In</span>
              <div className="auth-input validate-input">
                <input
                  type="text"
                  className="input100"
                  placeholder="Email"
                  name="email"
                  value={inputValue.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="auth-input validate-input rs1">
                <input
                  type="password"
                  className="input100"
                  placeholder="Password"
                  name="password"
                  value={inputValue.password}
                  onChange={handleInputChange}
                />
              </div>

              <div className="auth-form-btns m-t-20">
                <button className="auth-form-btn" type="submit">
                  Sign in
                </button>
              </div>

              <div className="text-center p-t-45 p-b-4">
                <span className="txt1">Create an account?</span>
                &nbsp;
                <Link to="/signUp" className="txt2 hov1">
                  Sign up
                </Link>
              </div>

              <div className="text-center p-t-10 p-b-4">
                <span className="txt1">Forgot your password ?</span>
                &nbsp;
                <Link to="/forgot" className="txt2 hov1">
                  Click here
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SignIn;
