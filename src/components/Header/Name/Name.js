import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logoutAction } from "../../../features/Auth/authSlice";

const Name = ({ auth }) => {
  const dispatch = useDispatch();
  return (
    <>
      <li className="nav-item dropdown">
        <a
          href="!#"
          className="nav-link dropdown-toggle"
          style={{ cursor: "pointer" }}
          id="pagesDropdown"
          data-toggle="dropdown"
          //   aria-haspopup="true"
          aria-expanded="false"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fas fa-user-alt mr-1 text-gray"></i>
          {auth?.user?.username}
        </a>
        <div className="dropdown-menu mt-3" aria-labelledby="pagesDropdown">
          {auth?.user?.isAdmin === true && (
            <Link
              className="dropdown-item border-0 transition-link"
              to={"/admin/productManagement"}
            >
              Manage Product
            </Link>
          )}

          <Link
            className="dropdown-item border-0 transition-link"
            to={"/manage"}
          >
            Manage Information
          </Link>
          <Link
            className="dropdown-item border-0 transition-link"
            to={"/wishlist"}
          >
            WishList
          </Link>
          <Link
            className="dropdown-item border-0 transition-link"
            to={"/"}
            onClick={() => dispatch(logoutAction())}
          >
            Logout
          </Link>
        </div>
      </li>
    </>
  );
};

export default Name;
