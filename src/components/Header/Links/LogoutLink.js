import React from "react";
import { Link } from "react-router-dom";

const LogoutLink = () => {
  return (
    <>
      <li className="nav-item">
        <Link className="nav-link" to={`/signin`}>
          <i className="fas fa-user-alt mr-1 text-gray"></i>Logout
        </Link>
      </li>
    </>
  );
};

export default LogoutLink;
