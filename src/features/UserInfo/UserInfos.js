import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../components/Footer/Footer";
import { queryFormat, toastError } from "../../utils/common";
import { checkImage } from "../../utils/imageUpload";
import { changlePasswordAction, updateUserAction } from "../Auth/authSlice";
import { getUserHistoryAction } from "../History/historySlice";
import UserLeftSide from "./components/UserLeftSide/UserLeftSide";
import UserRightSide from "./components/UserRightSide/UserRightSide";
import "./style.css";
const UserInfos = () => {
  const dispatch = useDispatch();
  const { auth, history } = useSelector((state) => state);

  const [userInfos, setUserInfos] = useState({});
  const [userAvatar, setUserAvatar] = useState("");
  const [userPassword, setUserPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (auth.accessToken) {
      setUserInfos({
        username: auth.user.username,
        email: auth.user.email,
      });
    }
  }, [auth]);

  useEffect(() => {
    if (auth.accessToken) {
      const query = queryFormat({ idUser: auth.user._id });
      dispatch(getUserHistoryAction(query));
    }
  }, [auth, dispatch]);

  const [indexTab, setIndexTab] = useState(0);

  const handleSubmit = () => {
    const data = {
      ...userInfos,
      avatar: userAvatar,
      auth,
    };
    setLoading(true);
    dispatch(updateUserAction(data));
    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfos({
      ...userInfos,
      [name]: value,
    });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setUserPassword({
      ...userPassword,
      [name]: value,
    });
  };

  const changeAvatar = (e) => {
    const file = e.target.files[0];
    const err = checkImage(file);
    if (err) {
      return toastError(err);
    }
    setUserAvatar(file);
  };

  const handlePassword = async () => {
    if (
      userPassword.newPassword.length < 6 ||
      userPassword.confirmPassword.length < 6
    ) {
      return toastError("Password must be at least 6 characters.!");
    } else if (userPassword.newPassword !== userPassword.confirmPassword) {
      return toastError(
        "Your Confirm Password does not match with New Password !"
      );
    } else {
      const data = {
        _id: auth.user._id,
        oldPassword: userPassword.oldPassword,
        newPassword: userPassword.newPassword,
        userEmail: auth.user.email,
      };
      setLoading(true);
      dispatch(changlePasswordAction(data));
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container main-wrapper">
        <div className="row">
          <div className="col-lg-4 col-md-4 col-sm-12 col-12 userInfo-leftSide">
            <UserLeftSide
              auth={auth}
              indexTab={indexTab}
              setIndexTab={setIndexTab}
            />
          </div>
          <div className="col-lg-8 col-md-8 col-sm-12 col-12">
            <div className="tab-content" id="v-pills-tabContent">
              <UserRightSide
                indexTab={indexTab}
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                userInfos={userInfos}
                userAvatar={userAvatar}
                changeAvatar={changeAvatar}
                userPassword={userPassword}
                handlePassword={handlePassword}
                handlePasswordChange={handlePasswordChange}
                auth={auth}
                history={history}
                loading={loading}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserInfos;
