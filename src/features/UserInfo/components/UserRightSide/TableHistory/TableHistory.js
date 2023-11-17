import { Modal, Space, Table } from "antd";
import moment from "moment";
import * as React from "react";
import OrderDetails from "../../../../Admin/components/OrderDetails/OrderDetails";

const TableHistory = ({ history }) => {
  const [orderDetails, setOrderDetails] = React.useState(null);
  const [visible, setVisible] = React.useState(false);

  const showModal = (order) => {
    setVisible(true);
    setOrderDetails(order);
  };

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
      title: "Address",
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
      <div>
        <Table
          columns={columns}
          dataSource={history?.userHistory}
          pagination={{
            total: history?.userHistory?.length,
            pageSize: 3,
            hideOnSinglePage: true,
          }}
        />
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
    </>
  );
};

export default TableHistory;
