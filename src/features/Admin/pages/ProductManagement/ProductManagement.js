import { Fade } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import ModalAddProduct from "@mui/material/Modal";
import { makeStyles } from "@mui/styles";
import { Space, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CategoryAPI from "../../../../api/categoryApi";
import Loading from "../../../../components/Loading/Loading";
import { queryFormat } from "../../../../utils/common";
import { editedProduct } from "../../../Global/globalSlice";
import {
  deleteProductAction,
  getProducts,
} from "../../../Products/productSlice";
import Banner from "../../components/Banner/Banner";
import ModalProduct from "../../components/ModalProduct/ModalProduct";
import SearchProduct from "../../components/SearchProduct/SearchProduct";
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
    padding: "20px 40px 30px",
  },
}));

const ProductManagement = () => {
  const { auth, product } = useSelector((state) => state);
  const classes = useStyles();
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(false);
  const [done, setDone] = useState(undefined);

  const fetchCategory = async () => {
    try {
      const res = await CategoryAPI.getCategories();
      setCategories(res.categories);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      fetchCategory();
      dispatch(getProducts());
      setDone(true);
    }, 1800);
  }, [done, dispatch]);

  const handleClose = () => {
    setOpen(false);
  };

  const addProduct = () => {
    setOpen(true);
    setTitle(true);
  };

  const deleteProduct = (productId) => {
    const query = queryFormat({ id: productId });
    dispatch(deleteProductAction(query));
  };

  const editProduct = (product) => {
    setOpen(true);
    setTitle(false);
    dispatch(editedProduct({ product, onEdit: true }));
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Thumnals",
      dataIndex: "imgs",
      key: "imgs",
      render: (imgs) => (
        <>
          <img src={imgs[0].url} alt="img" width="50px" />
        </>
      ),
      responsive: ["lg"],
    },
    {
      title: "Categories",
      key: "categories",
      dataIndex: "categories",
      render: (categories) => (
        <>
          {categories.map((cat, index) => {
            let color = categories.length > 2 ? "geekblue" : "green";
            return (
              <Tag key={index} color={color}>
                {cat.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Sizes",
      key: "sizes",
      dataIndex: "sizes",
      render: (sizes) => (
        <>
          {sizes.map((size, index) => {
            let color = sizes.length > 2 ? "darkgray" : "volcano";
            return (
              <Tag key={index} color={color}>
                {size.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
      filters: [
        {
          text: "S",
          value: "S",
        },
        {
          text: "XS",
          value: "XS",
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
      onFilter: (value, record) => record.sizes.includes(value) === true,
    },
    {
      title: "Count",
      dataIndex: "count",
      key: "count",
      sorter: (a, b) => a.count - b.count,
    },
    {
      title: "Actions",
      key: "action",
      render: (product, record, index) => (
        <Space size="middle">
          <span
            style={{ cursor: "pointer" }}
            className="text-warning"
            onClick={() => {
              editProduct({ ...product, productIndex: index });
            }}
          >
            Edit
          </span>
          <span
            style={{ cursor: "pointer" }}
            className="text-danger"
            onClick={() => {
              deleteProduct(product._id);
            }}
          >
            Delete
          </span>
        </Space>
      ),
    },
  ];

  let data =
    product?.productFilter?.length > 0
      ? product?.productFilter
      : product?.sellingProducts;

  return (
    <>
      <div className="container-fluid">
        <Banner />
        <div className="row">
          <div className="col-lg-10 search-input">
            <SearchProduct load={done} categories={categories} />
          </div>
          <div className="col-lg-2 justify-content-center d-flex">
            <button
              className="btnAddCourse"
              onClick={() => {
                addProduct();
              }}
            >
              Add Product
            </button>

            <ModalAddProduct
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
                  <ModalProduct
                    title={title}
                    handleClose={handleClose}
                    user={auth.user}
                    setDone={setDone}
                    categories={categories}
                  />
                </div>
              </Fade>
            </ModalAddProduct>
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
                total: data.length,
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

export default ProductManagement;
