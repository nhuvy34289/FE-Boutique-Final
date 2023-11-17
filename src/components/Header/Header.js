import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCartUser } from "../../features/Cart/cartSlice";
import NotificationModal from "../../features/Notification/NotificationModal/NotificationModal";
import { getNotifiesAction } from "../../features/Notification/notificationSlice";
import { queryFormat } from "../../utils/common";
import LoginLinks from "./Links/LoginLinks";
import Name from "./Name/Name";
import "./style.css";
const Header = () => {
  const { auth, notification } = useSelector((state) => state);
  const [active, setActive] = useState("Home");
  const dispatch = useDispatch();
  useEffect(() => {
    const query = queryFormat({ idUser: auth?.user?._id });
    dispatch(getCartUser(query));
    dispatch(getNotifiesAction(query));
  }, [dispatch, auth]);

  const handlerActive = (value) => {
    setActive(value);
  };
  return (
    <>
      <div className="container px-0 px-lg-3">
        <nav className="navbar navbar-expand-lg navbar-light py-3 px-lg-0">
          <Link className="navbar-brand" to={`/`}>
            <span className="font-weight-bold text-uppercase text-dark">
              Boutique
            </span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item" onClick={() => handlerActive("Home")}>
                <Link
                  className="nav-link text-bold"
                  to={`/`}
                  style={
                    active === "Home"
                      ? { color: "#dcb14a" }
                      : { color: "black" }
                  }
                >
                  Home
                </Link>
              </li>
              <li className="nav-item" onClick={() => handlerActive("Shop")}>
                <Link
                  className="nav-link text-bold"
                  to={`/shop`}
                  style={
                    active === "Shop"
                      ? { color: "#dcb14a" }
                      : { color: "black" }
                  }
                >
                  Shop
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto">
              <li
                className="nav-item dropdown d-flex align-items-center"
                style={{ cursor: "pointer" }}
              >
                <span
                  className="nav-link position-relative"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i
                    className={
                      notification.data.length > 0
                        ? "fas fa-bell mr-1"
                        : "fas fa-bell mr-1 text-gray"
                    }
                  ></i>
                  {notification.data.length > 0 && (
                    <span className="nav-link-notify">
                      {notification.data.length}
                    </span>
                  )}
                </span>

                <div
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdown"
                  style={{
                    transform: "translate(-8px,14px)",
                  }}
                >
                  <NotificationModal
                    auth={auth}
                    notifications={notification.data}
                  />
                </div>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-bold" to={`/cart`}>
                  <i className="fas fa-dolly-flatbed mr-1 text-gray"></i>Cart
                </Link>
              </li>
              {auth.user ? <Name auth={auth} /> : <LoginLinks />}
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
