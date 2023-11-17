import { Button, Grid, TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateHistoryAction } from "../../adminSlice";

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

const ModalOrder = ({ handleClose, setDone, orderEdited, currentSocket }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [orderInfo, setOrderInfo] = useState({
    fullname: "",
    phone: "",
    address: "",
    status: "",
  });

  useEffect(() => {
    if (orderEdited) {
      setOrderInfo({
        ...orderEdited.address,
        status: orderEdited.status,
      });
    }
  }, [orderEdited]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderInfo({
      ...orderInfo,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    const newOrder = {
      _id: orderEdited._id,
      status: orderInfo.status,
      address: {
        fullname: orderInfo.fullname,
        phone: orderInfo.phone,
        address: orderInfo.address,
      },
      userId: orderEdited.userId,
    };

    dispatch(updateHistoryAction({ newOrder, setDone, currentSocket }));
    handleCloseForm();
  };

  const handleCloseForm = () => {
    setOrderInfo({
      fullname: "",
      phone: "",
      address: "",
      status: "",
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
            <h3 className="text-center">Edit order</h3>
          </Grid>
          <Grid item xs={6} className={classes.gridItem}>
            <TextField
              id="outlined-basic"
              label="Fullname"
              variant="outlined"
              onChange={handleChange}
              name="fullname"
              value={orderInfo.fullname}
            />
          </Grid>
          <Grid item xs={6} className={classes.gridItem}>
            <TextField
              id="outlined-basic"
              label="Phone"
              variant="outlined"
              onChange={handleChange}
              name="phone"
              value={orderInfo.phone}
            />
          </Grid>
          <Grid item xs={6} className={classes.gridItem}>
            <TextField
              id="outlined-basic"
              label="Address"
              variant="outlined"
              onChange={handleChange}
              name="address"
              value={orderInfo.address}
            />
          </Grid>
          <Grid item xs={6} className={classes.gridItem}>
            <FormControl sx={{ m: 1, width: "100%" }}>
              <InputLabel id="demo-simple-select-standard-label">
                Status
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                name="status"
                value={orderInfo.status}
                onChange={handleChange}
                label="Status"
              >
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="delivery">Delivery</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} className={classes.gridItem}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                handleSubmit();
              }}
            >
              Edit order
            </Button>
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

export default ModalOrder;
