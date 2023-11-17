import queryString from "query-string";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Footer from "../../../../components/Footer/Footer";
import {
  queryFormat,
  replaceString,
  toastError,
} from "../../../../utils/common";
import { validateEmail } from "../../../../utils/validate";
import { registerAction } from "../../authSlice";
const SignUp = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const initialState = {
    username: "",
    email: "",
    password: "",
    cf_password: "",
  };
  const [inputValue, setInputValue] = useState(initialState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      inputValue.email === "" ||
      inputValue.password === "" ||
      inputValue.username === "" ||
      inputValue.cf_password === ""
    ) {
      return toastError("Please fill up your field to sign up");
    } else if (!validateEmail(inputValue.email)) {
      return toastError("Your email is incorrect format");
    } else if (inputValue.password !== inputValue.cf_password) {
      return toastError("Your password does not match");
    } else {
      let query = "?" + queryString.stringify(inputValue);

      query = replaceString(query, "%40", "@");

      let anotherQuery = queryFormat({ email: inputValue.email });

      anotherQuery = replaceString(anotherQuery, "%40", "@");

      dispatch(registerAction({ query, history, anotherQuery }));

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
              <span className="auth-form-title p-b-33">Sign Up</span>
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
              <div className="auth-input validate-input">
                <input
                  type="text"
                  className="input100"
                  placeholder="Username"
                  name="username"
                  value={inputValue.username}
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
              <div className="auth-input validate-input rs1">
                <input
                  type="password"
                  className="input100"
                  placeholder="Confirm Password"
                  name="cf_password"
                  value={inputValue.cf_password}
                  onChange={handleInputChange}
                />
              </div>

              <div className="auth-form-btns m-t-20">
                <button className="auth-form-btn" type="submit">
                  Sign Up
                </button>
              </div>

              <div className="text-center p-t-45 p-b-4">
                <span className="txt1">You have an account?</span>
                &nbsp;
                <Link to="/signIn" className="txt2 hov1">
                  Sign in
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

export default SignUp;
