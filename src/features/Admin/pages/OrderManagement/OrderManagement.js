import { Fade } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import ModalEditOrder from "@mui/material/Modal";
import { makeStyles } from "@mui/styles";
import { Space, Table, Modal } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../../components/Loading/Loading";
import { queryFormat } from "../../../../utils/common";
import { deleteHistoryAction, getAllHistories } from "../../adminSlice";
import Banner from "../../components/Banner/Banner";
import ModalOrder from "../../components/ModalOrder/ModalOrder";
import OrderDetails from "../../components/OrderDetails/OrderDetails";

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

const OrderManagement = () => {
  const { histories } = useSelector((state) => state.admin);
  const { currentSocket } = useSelector((state) => state.socket);
  const classes = useStyles();

  //State
  const [done, setDone] = useState(undefined);
  const [open, setOpen] = React.useState(false);
  const [orderEdited, setOrderEdited] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);
  const [visible, setVisible] = useState(false);
  //Actions
  const handleClose = () => {
    setOpen(false);
  };

  const editedOrder = (order) => {
    setOpen(true);
    setOrderEdited(order);
  };

  const deleteOrderAction = (order) => {
    const query = queryFormat({ id: order });
    dispatch(deleteHistoryAction({ query, setDone }));
  };

  const showModal = (order) => {
    setVisible(true);
    setOrderDetails(order);
  };

  //dispatch và useEffect
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(getAllHistories());
      setDone(true);
    }, 1800);
  }, [done, dispatch]);

  //Data tables
  const columns = [
    {
      title: "Order Id",
      dataIndex: "_id",
      key: "_id",
      responsive: ["lg"],
    },
    {
      title: "Fullname",
      dataIndex: "address",
      key: "address",
      render: (address) => (
        <>
          <p>{address.fullname}</p>
        </>
      ),
      responsive: ["sm"],
    },
    {
      title: "Mobile Phone",
      dataIndex: "address",
      key: "address",
      render: (address) => (
        <>
          <p>{address.phone}</p>
        </>
      ),
      responsive: ["sm"],
    },
    {
      title: "Fullname",
      dataIndex: "address",
      key: "address",
      render: (address) => (
        <>
          <p>{address.address}</p>
        </>
      ),
      responsive: ["sm"],
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <>
          <p>{status}</p>
        </>
      ),
      filters: [
        {
          text: "Pending",
          value: "pending",
        },
        {
          text: "Delivery",
          value: "delivery",
        },
      ],
      onFilter: (value, record) => record.status.indexOf(value) === 0,
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
      render: (order, record, index) => (
        <Space size="middle">
          <span
            style={{ cursor: "pointer" }}
            className="text-warning"
            onClick={() => {
              editedOrder({ ...order, orderIndex: index });
            }}
          >
            Edit
          </span>
          <span
            style={{ cursor: "pointer" }}
            className="text-danger"
            onClick={() => {
              deleteOrderAction(order._id);
            }}
          >
            Delete
          </span>
          <span
            style={{ cursor: "pointer" }}
            className="text-success"
            onClick={() => {
              showModal(order);
            }}
          >
            Details
          </span>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="container-fluid">
        <Banner />

        <div className="row mt-2">
          <ModalEditOrder
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
                <ModalOrder
                  handleClose={handleClose}
                  setDone={setDone}
                  orderEdited={orderEdited}
                  currentSocket={currentSocket}
                />
              </div>
            </Fade>
          </ModalEditOrder>
        </div>

        <div>
          {!done ? (
            <Loading />
          ) : (
            <Table
              columns={columns}
              dataSource={histories}
              pagination={{
                total: histories?.length,
                pageSize: 8,
                hideOnSinglePage: true,
              }}
            />
          )}
          <Modal
            title="Order Details"
            visible={visible}
            okButtonProps={{ style: { display: "none" } }}
            onCancel={() => setVisible(false)}
            cancelText="Cancel"
            className="modal_course"
          >
            <OrderDetails orderDetails={orderDetails} />
          </Modal>
        </div>
      </div>
    </>
  );
};

export default OrderManagement;
