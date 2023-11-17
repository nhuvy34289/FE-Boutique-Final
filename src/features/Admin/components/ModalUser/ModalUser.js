import { Grid, TextField, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  queryFormat,
  replaceString,
  toastError,
} from "../../../../utils/common";
import {
  addUserAction,
  chanagePasswordUserFromAdmin,
  editUserAction,
} from "../../adminSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: "10px",
      width: "80ch",
    },
  },
  grid: {
    flexGrow: 1,
    width: "100",
  },
  gridItem: {
    margin: "15px 0",
    display: "flex",
    justifyContent: "center",
  },
  dropzone: {
    margin: "15px 0",
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
  title: {
    margin: "5px 0",
  },
  formControl: {
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: "20px",
  },
}));

const ModalUser = ({ title, handleClose, setDone, userEdited }) => {
  const { currentSocket } = useSelector((state) => state.socket);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    password: "",
    cf_password: "",
  });

  const [actions, setActions] = useState("changeInformation");

  useEffect(() => {
    if (userEdited) {
      setUserInfo({
        username: userEdited.username,
        email: userEdited.email,
        password: "",
        cf_password: "",
      });
    }
    if (title) {
      setUserInfo({
        username: "",
        email: "",
        password: "",
        cf_password: "",
      });
    }
  }, [userEdited, title]);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    if (title === true) {
      if (userInfo.password !== userInfo.cf_password) {
        return toastError(
          "Your password does not match with confirm password !"
        );
      } else {
        let query = queryFormat(userInfo);

        query = replaceString(query, "%40", "@");

        let anotherQuery = queryFormat({ email: userInfo.email });

        anotherQuery = replaceString(anotherQuery, "%40", "@");
        dispatch(addUserAction({ query, setDone, anotherQuery }));
        handleCloseForm();
      }
    } else {
      const query = {
        ...userInfo,
        _id: userEdited._id,
      };
      if (actions === "changeInformation") {
        dispatch(editUserAction({ query, setDone, currentSocket }));
        handleCloseForm();
      } else if (actions === "changePassword") {
        if (userInfo.password !== userInfo.cf_password) {
          return toastError(
            "Your password does not match with confirm password !"
          );
        } else {
          dispatch(chanagePasswordUserFromAdmin({ query, setDone }));
          handleCloseForm();
        }
      }
    }
  };

  const handleCloseForm = () => {
    setUserInfo({
      username: "",
      email: "",
      password: "",
      cf_password: "",
    });
    handleClose();
  };

  return (
    <>
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <Grid container className={classes.grid} spacing={1}>
          <Grid item xs={12} className={classes.title}>
            <h3 className="text-center">{title ? "Add User" : "Edit User"}</h3>
            {title !== true && (
              <>
                {" "}
                <div className="custom-control custom-radio custom-control-inline mt-1">
                  <input
                    type="radio"
                    id="customRadioInline1"
                    name="customRadioInline1"
                    className="custom-control-input"
                    value="changeInformation"
                    onChange={() => setActions("changeInformation")}
                    checked={actions === "changeInformation"}
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="customRadioInline1"
                  >
                    Change Information
                  </label>
                </div>
                <div className="custom-control custom-radio custom-control-inline mb-2">
                  <input
                    type="radio"
                    id="customRadioInline2"
                    name="customRadioInline1"
                    className="custom-control-input"
                    value="changePassword"
                    onChange={() => setActions("changePassword")}
                    checked={actions === "changePassword"}
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="customRadioInline2"
                  >
                    Change Password
                  </label>
                </div>
              </>
            )}
          </Grid>
          {actions === "changeInformation" && title !== true && (
            <>
              <Grid item xs={6} className={classes.gridItem}>
                <TextField
                  id="outlined-basic"
                  label="User Name"
                  variant="outlined"
                  onChange={handleChange}
                  name="username"
                  value={userInfo.username}
                />
              </Grid>
              <Grid item xs={6} className={classes.gridItem}>
                <TextField
                  id="outlined-basic"
                  type="email"
                  label="Email"
                  variant="outlined"
                  onChange={handleChange}
                  name="email"
                  value={userInfo.email}
                />
              </Grid>{" "}
            </>
          )}

          {actions === "changePassword" && title !== true && (
            <>
              <Grid item xs={6} className={classes.gridItem}>
                <TextField
                  id="outlined-basic"
                  type="password"
                  label="Password"
                  variant="outlined"
                  onChange={handleChange}
                  name="password"
                  value={userInfo.password}
                />
              </Grid>
              <Grid item xs={6} className={classes.gridItem}>
                <TextField
                  id="outlined-basic"
                  type="password"
                  label="Confirm Password"
                  variant="outlined"
                  onChange={handleChange}
                  name="cf_password"
                  value={userInfo.cf_password}
                />
              </Grid>{" "}
            </>
          )}

          {title === true && (
            <>
              <Grid item xs={6} className={classes.gridItem}>
                <TextField
                  id="outlined-basic"
                  label="User Name"
                  variant="outlined"
                  onChange={handleChange}
                  name="username"
                  value={userInfo.username}
                />
              </Grid>
              <Grid item xs={6} className={classes.gridItem}>
                <TextField
                  id="outlined-basic"
                  type="email"
                  label="Email"
                  variant="outlined"
                  onChange={handleChange}
                  name="email"
                  value={userInfo.email}
                />
              </Grid>
              <Grid item xs={6} className={classes.gridItem}>
                <TextField
                  id="outlined-basic"
                  type="password"
                  label="Password"
                  variant="outlined"
                  onChange={handleChange}
                  name="password"
                  value={userInfo.password}
                />
              </Grid>
              <Grid item xs={6} className={classes.gridItem}>
                <TextField
                  id="outlined-basic"
                  type="password"
                  label="Confirm Password"
                  variant="outlined"
                  onChange={handleChange}
                  name="cf_password"
                  value={userInfo.cf_password}
                />
              </Grid>{" "}
            </>
          )}

          <Grid item xs={6} className={classes.gridItem}>
            {title === true && (
              <Button
                variant="contained"
                color="primary"
                disabled={
                  userInfo.password === "" ||
                  userInfo.email === "" ||
                  userInfo.username === "" ||
                  userInfo.cf_password === ""
                    ? true
                    : false
                }
                onClick={() => {
                  handleSubmit();
                }}
              >
                {title ? "Add User" : "Edit User"}
              </Button>
            )}

            {actions === "changeInformation" && title !== true && (
              <Button
                variant="contained"
                color="primary"
                disabled={
                  userInfo.email === "" || userInfo.username === ""
                    ? true
                    : false
                }
                onClick={() => {
                  handleSubmit();
                }}
              >
                {title ? "Add User" : "Edit User"}
              </Button>
            )}

            {actions === "changePassword" && title !== true && (
              <Button
                variant="contained"
                color="primary"
                disabled={
                  userInfo.password === "" || userInfo.cf_password === ""
                    ? true
                    : false
                }
                onClick={() => {
                  handleSubmit();
                }}
              >
                {title ? "Add User" : "Edit User"}
              </Button>
            )}
          </Grid>
          <Grid item xs={6} className={classes.gridItem}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                handleCloseForm();
              }}
            >
              Exit
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default ModalUser;
