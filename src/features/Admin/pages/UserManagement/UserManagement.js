import { Fade } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import ModalAddUser from "@mui/material/Modal";
import { makeStyles } from "@mui/styles";
import { Space, Table } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../../components/Loading/Loading";
import { queryFormat, toastError } from "../../../../utils/common";
import { deleteUsersAction, getAllUserAction } from "../../adminSlice";
import Banner from "../../components/Banner/Banner";
import ModalUser from "../../components/ModalUser/ModalUser";
import SearchUser from "../../components/SearchUser/SearchUser";
import "./style.css";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: "white",
    border: "2px solid #000",
    boxShadow: 5,
    padding: "20px 20px",
  },
}));

const UserManagement = () => {
  // Get user List + user Search
  const { auth } = useSelector((state) => state);
  const { users, searchedUser } = useSelector((state) => state.admin);
  const classes = useStyles();

  //State
  const [title, setTitle] = useState(true);
  const [done, setDone] = useState(undefined);
  const [open, setOpen] = React.useState(false);
  const [userEdited, setUserEdited] = useState(null);

  //Actions
  const handleClose = () => {
    setOpen(false);
  };

  const addUser = () => {
    setOpen(true);
    setTitle(true);
  };

  const editedUser = (user) => {
    setOpen(true);
    setTitle(false);
    setUserEdited(user);
  };

  const deleteUserAction = (user) => {
    if (user === auth.user._id) {
      return toastError("You can not delete yoursefl");
    } else {
      const query = queryFormat({ idUser: user });
      dispatch(deleteUsersAction({ query, setDone }));
    }
  };

  //dispatch và useEffect
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(getAllUserAction());
      setDone(true);
    }, 1800);
  }, [done, dispatch]);

  //Data tables
  const columns = [
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (avatar) => (
        <>
          <img src={avatar} alt="img" width="50px" />
        </>
      ),
      responsive: ["lg"],
    },
    {
      title: "User name",
      dataIndex: "username",
      key: "username",
      responsive: ["sm"],
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      responsive: ["sm"],
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => (
        <>
          <p>{moment(createdAt).format("MMM Do YY")}</p>
        </>
      ),
      responsive: ["lg"],
    },
    {
      title: "Actions",
      key: "action",
      render: (user, record, index) => (
        <Space size="middle">
          <span
            style={{ cursor: "pointer" }}
            className="text-warning"
            onClick={() => {
              editedUser({ ...user, userIndex: index });
            }}
          >
            Edit
          </span>
          <span
            style={{ cursor: "pointer" }}
            className="text-danger"
            onClick={() => {
              deleteUserAction(user._id);
            }}
          >
            Delete
          </span>
        </Space>
      ),
    },
  ];

  let data = searchedUser.length > 0 ? searchedUser : users;

  return (
    <>
      <div className="container-fluid">
        <Banner />
        <div className="row mt-2 ">
          <div className="col-lg-10 search-input">
            <SearchUser setDone={setDone} />
          </div>

          <div className="col-lg-2 justify-content-center d-flex">
            <button className="btnAddUser" onClick={addUser}>
              Add New User
            </button>

            <ModalAddUser
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className={classes.modal}
              open={open}
              onClose={handleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={open}>
                <div className={classes.paper} id="modal-product">
                  <ModalUser
                    title={title}
                    handleClose={handleClose}
                    setDone={setDone}
                    userEdited={userEdited}
                  />
                </div>
              </Fade>
            </ModalAddUser>
          </div>
        </div>

        <div>
          {!done ? (
            <Loading />
          ) : (
            <Table
              columns={columns}
              dataSource={data}
              pagination={{
                total: data?.length,
                pageSize: 5,
                hideOnSinglePage: true,
              }}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default UserManagement;
