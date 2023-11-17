import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import { Button, Checkbox, Grid, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { CKEditor } from "ckeditor4-react";
import "date-fns";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { SIZES } from "../../../../constants/Sizes";
import { toastError } from "../../../../utils/common";
import { checkImage } from "../../../../utils/imageUpload";
import { editedProduct } from "../../../Global/globalSlice";
import {
  createNewProduct,
  updateProduct,
} from "../../../Products/productSlice";
import "./style.css";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: "10px",
      width: "100%",
      height: '70ch',
      overflow: "auto",
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
  btn: {
    paddingTop: "30px !important",
    margin: "15px 0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0 20px",
    width: "100%",
  },
}));

const ModalProduct = ({ title, handleClose, user, setDone, categories }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { global } = useSelector((state) => state);

  const [productInfo, setProductInfo] = useState({
    title: "",
    price: 0,
    discount: 0,
    count: 0,
  });
  const [productImages, setProductImages] = useState([]);
  const [productDesc, setProductDesc] = useState("");
  const [productSizes, setProductSizes] = useState([]);
  const [productCategories, setProductCategories] = useState([]);

  useEffect(() => {
    if (global.onEdit === true) {
      setProductInfo({
        title: global?.product?.title,
        price: global?.product?.price,
        discount: global?.product?.discount,
        count: global?.product?.count,
      });
      setProductImages(global?.product.imgs);
    } else {
      setProductInfo({
        title: "",
        price: 0,
        discount: 0,
        count: 0,
      });
      setProductImages([]);
    }
  }, [global.product, global.onEdit]);

  const handleClear = () => {
    if (global.onEdit === true) {
      dispatch(editedProduct({ product: {}, onEdit: false }));
    }
    setProductInfo({
      title: "",
      price: 0,
      discount: 0,
      count: 0,
    });
    setProductDesc("");
    setProductImages([]);
    handleClose();
    setProductCategories([]);
    setProductSizes([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      productInfo.title === "" ||
      productInfo.price === "" ||
      productInfo.discount === "" ||
      productInfo.count === "" ||
      productDesc === "" ||
      productImages.length === 0 ||
      productCategories.length === 0 ||
      productSizes.length === 0
    ) {
      return toastError("Please fill up the form !");
    }

    if (global.onEdit === true) {
      const config = {
        ...productInfo,
        imgs: productImages,
        desc: productDesc,
        categories: productCategories,
        sizes: productSizes,
        productIndex: global.product.productIndex,
        productId: global.product._id,
      };
      dispatch(updateProduct({ config, setDone }));
    } else {
      const config = {
        ...productInfo,
        imgs: productImages,
        desc: productDesc,
        categories: productCategories,
        sizes: productSizes,
      };
      dispatch(createNewProduct({ config, setDone }));
    }
    handleClear();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductInfo({
      ...productInfo,
      [name]: value,
    });
  };

  const handleImageChange = async (e) => {
    const files = [...e.target.files];
    let err = "";
    let newImages = [];

    files.forEach((file) => {
      err = checkImage(file);
      return newImages.push(file);
    });

    if (err) return toastError(err);
    setProductImages([...productImages, ...newImages]);
  };

  const handleCategoryChange = (e) => {
    const newCategories = [...productCategories];
    const clickedCategory = newCategories.indexOf(e.target.value);
    if (clickedCategory === -1) {
      newCategories.push(e.target.value);
    } else {
      newCategories.splice(clickedCategory, 1);
    }
    setProductCategories(newCategories);
  };

  const handleSizeChange = (e) => {
    const newSizes = [...productSizes];
    const clickedSize = newSizes.indexOf(e.target.value);
    
    if (clickedSize === -1) {
      newSizes.push(e.target.value);
    } else {
      newSizes.splice(clickedSize, 1);
    }
    setProductSizes(newSizes);
  };

  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    const imageUpload = acceptedFiles[0];
    console.log(imageUpload);
  }, []);

  const { isDragActive } = useDropzone({ onDrop });

  const removeImage = (index) => {
    const newArr = [...productImages];
    newArr.splice(index, 1);
    setProductImages(newArr);
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
            <h3 className="text-center">
              {title ? "Add new product" : "Edit product"}
            </h3>
          </Grid>
          <Grid item xs={6} className={classes.gridItem}>
            <TextField
              type="text"
              id="outlined-basic"
              label="Title"
              variant="outlined"
              onChange={handleChange}
              name="title"
              value={productInfo.title}
            />
          </Grid>
          <Grid item xs={6} className={classes.gridItem}>
            <TextField
              type="number"
              id="outlined-basic"
              label="Number"
              variant="outlined"
              onChange={handleChange}
              name="count"
              value={productInfo.count}
            />
          </Grid>
          <Grid item xs={6} className={classes.gridItem}>
            <TextField
              type="number"
              id="outlined-basic"
              label="Price"
              variant="outlined"
              onChange={handleChange}
              name="price"
              value={productInfo.price}
            />
          </Grid>
          <Grid item xs={6} className={classes.gridItem}>
            <TextField
              type="number"
              id="outlined-basic"
              label="Discount"
              variant="outlined"
              onChange={handleChange}
              name="discount"
              value={productInfo.discount}
            />
          </Grid>
          <Grid item xs={12} className={classes.gridItem}>
            <div className="form-container">
              <h4>Choose Categories</h4>
              <div className="form-container-checkBox">
                {categories.map((category, index) => (
                  <div className="checkBox-form" key={category._id}>
                    <Checkbox
                      color="primary"
                      value={category.content}
                      onChange={(e) => handleCategoryChange(e)}
                    />
                    <p className="checkBox-title">{category.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </Grid>
          <Grid item xs={12} className={classes.gridItem}>
            <div className="form-container">
              <h4 className="checkBox-title">Choose Sizes</h4>
              <div className="form-container-checkBox">
                {SIZES.map((size, index) => (
                  <>
                    <div className="checkBox-form" key={index}>
                      <Checkbox
                        color="primary"
                        value={size.name}
                        onChange={(e) => handleSizeChange(e)}
                      />
                      <p className="checkBox-title">{size.name}</p>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </Grid>
          <Grid item xs={12} className={classes.gridItem}>
            <Grid item xs={6} className={classes.gridItem}>
              <CKEditor
                onChange={(evt) => setProductDesc(evt.editor.getData())}
              />
            </Grid>
            <Grid item xs={6} className={classes.dropzone}>
              <div className="container upload-container">
                <h4 className="text-center">Upload pictures</h4>
                <div className="dropzone_css">
                  <CloudUploadOutlinedIcon />
                  <input
                    type="file"
                    onChange={handleImageChange}
                    multiple
                    accept="image/*"
                    name="hinhAnh"
                    className="btn"
                  />
                  {isDragActive ? (
                    <p>Choose one or more pictures from your device </p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="show-images">
                  {productImages.length > 0 &&
                    productImages.map((img, index) => (
                      <div key={index} className="file_img">
                        <img
                          src={img.url ? img.url : URL.createObjectURL(img)}
                          alt="img"
                          className="img-thumbnail rounded"
                        />
                        <span onClick={() => removeImage(index)}>&times;</span>
                      </div>
                    ))}
                </div>
              </div>
            </Grid>
          </Grid>
          <Grid item xs={12} className={classes.btn}>
            <Button variant="contained" color="primary" type="submit">
              {title ? "Add new product" : "Edit product"}
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                handleClear();
              }}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default ModalProduct;
