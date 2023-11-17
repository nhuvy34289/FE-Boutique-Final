import { Button, Form, Input } from "antd";
import React from "react";
import { NavLink } from "react-router-dom";
import "./style.css";
import TableHistory from "./TableHistory/TableHistory";
import Loading from "../../../../assets/loading.gif";
const UserRightSide = ({
  indexTab,
  handleSubmit,
  handleChange,
  userInfos,
  userAvatar,
  changeAvatar,
  handlePassword,
  userPassword,
  handlePasswordChange,
  auth,
  history,
  loading,
}) => {
  return (
    <>
      <div
        className={
          indexTab === 0 ? "tab-pane fade show active" : "tab-pane fade show"
        }
        id="thongtintaikhoan_tab"
        role="tabpanel"
        aria-labelledby="v-pills-home-tab"
      >
        <h2 className="thongtintaikhoan-title text-center">
          Account Informations
        </h2>

        <div className="d-flex justify-content-center">
          <div className="info_avatar">
            <img
              src={
                userAvatar
                  ? URL.createObjectURL(userAvatar)
                  : auth?.user?.avatar
              }
              alt="avatar"
            />
            <span>
              <i className="fas fa-camera" />
              <p>Change</p>
              <input
                type="file"
                name="file"
                id="file_up"
                accept="image/*"
                onChange={changeAvatar}
              />
            </span>
          </div>
        </div>

        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          layout="horizontal"
          size={"large"}
          onFinish={handleSubmit}
        >
          <Form.Item label="Enter your username">
            <Input
              name="username"
              value={userInfos.username}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Enter your email">
            <Input
              name="email"
              value={userInfos.email}
              onChange={handleChange}
            />
          </Form.Item>
          <div className="col-12 btn-thongtintaikhoan">
            {loading ? (
              <img src={Loading} alt="Loading" />
            ) : (
              <Button htmlType="submit" type="primary" size={"large"}>
                Submit
              </Button>
            )}
          </div>
        </Form>
      </div>
      <div
        className={
          indexTab === 2 ? "tab-pane fade show active" : "tab-pane fade show"
        }
        id="doimatkhau_tab"
        role="tabpanel"
        aria-labelledby="v-pills-home-tab"
      >
        <h2 className="thongtintaikhoan-title text-center">Change Password</h2>
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          layout="horizontal"
          size={"large"}
          onFinish={handlePassword}
        >
          <Form.Item label="Old password">
            <Input
              type="password"
              name="oldPassword"
              value={userPassword.oldPassword}
              onChange={handlePasswordChange}
            />
          </Form.Item>
          <Form.Item label="New Password">
            <Input
              type="password"
              name="newPassword"
              value={userPassword.newPassword}
              onChange={handlePasswordChange}
            />
          </Form.Item>
          <Form.Item label="Confirm Password">
            <Input
              type="password"
              name="confirmPassword"
              value={userPassword.confirmPassword}
              onChange={handlePasswordChange}
            />
          </Form.Item>
          <div className="col-12 btn-thongtintaikhoan">
            {loading ? (
              <img src={Loading} alt="Loading" />
            ) : (
              <Button
                htmlType="submit"
                type="primary"
                size={"large"}
                disabled={
                  userPassword.newPassword === "" ||
                  userPassword.oldPassword === "" ||
                  userPassword.confirmPassword === ""
                    ? true
                    : false
                }
              >
                Submit
              </Button>
            )}
          </div>
        </Form>
      </div>
      <div
        className={
          indexTab === 1 ? "tab-pane fade show active" : "tab-pane fade show"
        }
        id="v-pills-profile"
        role="tabpanel"
        aria-labelledby="v-pills-profile-tab"
      >
        {history?.userHistory?.length === 0 ? (
          <div className="d-flex justify-content-center">
            <div className="m-auto">
              <h3 className="text-center lead">There is no history here !</h3>
              <NavLink
                to="/shop"
                className="d-flex justify-content-center mt-5"
              >
                <Button type="primary" size={"large"}>
                  Choose products
                </Button>
              </NavLink>
            </div>
          </div>
        ) : (
          <>
            <div className="row">
              <TableHistory history={history} />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default UserRightSide;
