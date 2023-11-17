import React from "react";
import { Table } from "antd";
const OrderDetails = ({ orderDetails }) => {
  const columns = [
    {
      title: "Name",
      dataIndex: "nameProduct",
      key: "nameProduct",
    },
    {
      title: "Thumnals",
      dataIndex: "img",
      key: "img",
      render: (img) => (
        <>
          <img src={img.url} alt="img" width="50px" />
        </>
      ),
      responsive: ["lg"],
    },

    {
      title: "Price",
      dataIndex: "priceProduct",
      key: "priceProduct",
      sorter: (a, b) => a.priceProduct - b.priceProduct,
    },
    {
      title: "Size",
      dataIndex: "sizeProduct",
      key: "sizeProduct",
      filters: [
        {
          text: "S",
          value: "S",
        },
        {
          text: "M",
          value: "M",
        },
        {
          text: "L",
          value: "L",
        },
        {
          text: "XL",
          value: "XL",
        },
        {
          text: "XXL",
          value: "XXL",
        },
      ],
      onFilter: (value, record) => record.sizeProduct.indexOf(value) === 0,
    },
    {
      title: "Count",
      dataIndex: "count",
      key: "count",
      sorter: (a, b) => a.count - b.count,
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={orderDetails?.cart}
        pagination={{
          total: orderDetails?.cart?.length,
          pageSize: 4,
          hideOnSinglePage: true,
        }}
      />
    </>
  );
};

export default OrderDetails;
