import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import ProductAPI from "../../api/productApi";
import {
  cloneItem,
  convertStringToNumber,
  deleteData,
  editData,
  toastError,
} from "../../utils/common";
import { imageUpload } from "../../utils/imageUpload";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await ProductAPI.getProducts();
      return res;
    } catch (err) {
      return rejectWithValue(err.response.msg);
    }
  }
);

export const getProductsByCategory = createAsyncThunk(
  "products/getProductsByCategory",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await ProductAPI.getProductByCategory(payload);
      return res;
    } catch (err) {
      return rejectWithValue(err.response.msg);
    }
  }
);

export const getProductPagination = createAsyncThunk(
  "products/getProductPagination",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await ProductAPI.getProductPagination(payload);
      return res;
    } catch (err) {
      return rejectWithValue(err.response.msg);
    }
  }
);

export const createNewProduct = createAsyncThunk(
  "products/createNewProduct",
  async (payload, { rejectWithValue }) => {
    try {
      const { config, setDone } = payload;
      const { title, count, desc, discount, imgs, price, sizes, categories } =
        config;
      const media = await imageUpload(imgs);

      const newProduct = {
        title,
        count: convertStringToNumber(count),
        desc,
        discount: convertStringToNumber(discount),
        imgs: media,
        price: convertStringToNumber(price),
        sizes,
        categories,
      };
      await ProductAPI.postCreateProduct(newProduct);
      setDone(undefined);
      toast.success(`${'Create Successfully!'}`, {
        position: "top-right",
      });
      // return res.savedProduct;
    } catch (err) {
      toastError(err.response.data.msg);
      return rejectWithValue(err.response.msg);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (payload, { rejectWithValue }) => {
    const { config, setDone } = payload;
    const {
      productId,
      title,
      count,
      desc,
      discount,
      imgs,
      price,
      sizes,
      categories,
      productIndex,
    } = config;
    let media = [];
    const imgNewUrl = imgs.filter((img) => !img.url);
    const imgOldUrl = imgs.filter((img) => img.url);
    try {
      if (imgNewUrl.length > 0) media = await imageUpload(imgNewUrl);

      const newProduct = {
        productId,
        title,
        count: convertStringToNumber(count),
        desc,
        discount: convertStringToNumber(discount),
        imgs: [...imgOldUrl, ...media],
        price: convertStringToNumber(price),
        sizes,
        categories,
        productIndex,
      };

      const res = await ProductAPI.updateProduct(newProduct);
      setDone(undefined);

      toast.success(`${res.msg}`, {
        position: "top-right",
      });
      const updatedProduct = {
        updatedProduct: res.updatedProduct,
        index: productIndex,
      };
      return updatedProduct;
    } catch (err) {
      toastError(err.response.data.msg);
      return rejectWithValue(err.response.msg);
    }
  }
);

export const deleteProductAction = createAsyncThunk(
  "products/deleteProduct",
  async (payload, { rejectWithValue }) => {
    try {
      const productId = payload.replace("?id=", "");
      const res = await ProductAPI.deleteProduct(payload);
      toast.success(`${res.msg}`, {
        position: "top-right",
      });
      return productId;
    } catch (err) {
      return rejectWithValue(err.response.msg);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    sellingProducts: [],
    productLists: [],
    productFilter: [],
  },
  reducers: {
    filterProducts: (state, action) => {
      let existingProducts = JSON.parse(JSON.stringify(state.productLists));
      existingProducts = existingProducts.slice();

      if (action.payload === "UpToDown") {
        state.productFilter = existingProducts.sort(
          (a, b) => Number(b.price) - Number(a.price)
        );
      } else if (action.payload === "DownToUp") {
        state.productFilter = existingProducts.sort(
          (a, b) => Number(a.price) - Number(b.price)
        );
      } else if (action.payload === "default") {
        state.productFilter = [];
      }
    },
    updateProducts: (state, action) => {
      const currentProducts = cloneItem(state.sellingProducts);
      const newProducts = editData(
        currentProducts,
        action.payload._id,
        action.payload
      );
      state.sellingProducts = newProducts;
    },
    filterProductByPrice: (state, action) => {
      let existingProducts = JSON.parse(JSON.stringify(state.productLists));
      existingProducts = existingProducts.slice();

      const vituralProducts = [];
      for (let i in existingProducts) {
        if (
          existingProducts[i].price >= action.payload[0] &&
          existingProducts[i].price <= action.payload[1]
        ) {
          vituralProducts.push(existingProducts[i]);
        }
      }
      state.productLists = vituralProducts;
    },
    filterProductBySize: (state, action) => {
      if (action.payload.length === 0) {
        state.productFilter = [];
      } else {
        let existingProducts = JSON.parse(JSON.stringify(state.productLists));
        existingProducts = existingProducts.slice();

        const newProducts = existingProducts.filter((item) => {
          const checked = item.sizes.find((size) =>
            action.payload.includes(size)
          );
          return checked !== undefined;
        });
        state.productFilter = newProducts;
      }
    },
  },
  extraReducers: {
    [getProducts.fulfilled]: (state, action) => {
      state.sellingProducts = action.payload.products;
      state.productFilter = [];
    },
    [getProductPagination.fulfilled]: (state, action) => {
      if (action.payload.paginationProducts) {
        state.productLists = action.payload.paginationProducts;
        state.productFilter = [];
      } else if (action.payload.searchedProduct) {
        state.productLists = action.payload.searchedProduct;
        state.productFilter = [];
      }
    },
    [getProductsByCategory.fulfilled]: (state, action) => {
      state.productFilter = action.payload.products;
    },
    [createNewProduct.fulfilled]: (state, action) => {
      state.productLists.unshift(action.payload);
    },
    [updateProduct.fulfilled]: (state, action) => {
      state.productLists.splice(
        action.payload.index,
        1,
        action.payload.updatedProduct
      );
    },
    [deleteProductAction.fulfilled]: (state, action) => {
      state.productLists = deleteData(state.productLists, action.payload);
    },
  },
});
export const {
  filterProducts,
  updateProducts,
  filterProductByPrice,
  filterProductBySize,
} = productSlice.actions;
const { reducer } = productSlice;
export default reducer;
