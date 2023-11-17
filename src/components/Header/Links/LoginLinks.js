import React from "react";
import { Link } from "react-router-dom";

const LoginLinks = () => {
  return (
    <>
      <li className="nav-item ">
        <Link className="nav-link text-bold" to="/signin">
          ( Login )
        </Link>
      </li>
    </>
  );
};

export default LoginLinks;
