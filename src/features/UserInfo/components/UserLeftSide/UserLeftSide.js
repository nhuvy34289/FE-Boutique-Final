import React from "react";

const UserLeftSide = ({ auth, indexTab, setIndexTab }) => {
  return (
    <>
      <div className="row">
        <div className="col-12 d-flex justify-content-center">
          <div className="thongtin_ava text-bold">
            Welcome {" "}{auth?.user?.username.toUpperCase()}
          </div>
        </div>
        <div className="col-12">
          <div
            className="nav flex-column nav-pills mt-3"
            id="v-pills-tab"
            role="tablist"
            aria-orientation="vertical"
          >
            <a
              className={
                indexTab === 0
                  ? "nav-user nav-link active fs-link"
                  : "nav-user nav-link fs-link"
              }
              onClick={() => setIndexTab(0)}
              id="v-pills-home-tab"
              data-toggle="pill"
              href="#thongtintaikhoan_tab"
              role="tab"
              aria-controls="v-pills-home"
              aria-selected="true"
            >
              Account Infomations
            </a>
            <a
              className={
                indexTab === 1
                  ? "nav-user nav-link active fs-link"
                  : "nav-user nav-link fs-link"
              }
              onClick={() => setIndexTab(1)}
              id="v-pills-profile-tab"
              data-toggle="pill"
              href="#v-pills-profile"
              role="tab"
              aria-controls="v-pills-profile"
              aria-selected="false"
            >
              Your history
            </a>
            <a
              className={
                indexTab === 2
                  ? "nav-user nav-link active fs-link"
                  : "nav-user nav-link fs-link"
              }
              onClick={() => setIndexTab(2)}
              id="v-pills-profile-tab"
              data-toggle="pill"
              href="#doimatkhau_tab"
              role="tab"
              aria-controls="v-pills-profile"
              aria-selected="false"
            >
              Change Password
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserLeftSide;
