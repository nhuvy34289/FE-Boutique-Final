import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ProductAPI from "../../api/productApi";
import RatingApi from "../../api/ratingApi";
import { cloneItem, deleteData } from "../../utils/common";

export const getProductDetail = createAsyncThunk(
  "productDetail/getProductDetail",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await ProductAPI.getProduct(payload);
      return res;
    } catch (err) {
      return rejectWithValue(err.response.msg);
    }
  }
);

export const getRelatedProducts = createAsyncThunk(
  "products/getRelatedProducts",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await ProductAPI.getRelatedProduct(payload);
      return res;
    } catch (err) {
      return rejectWithValue(err.response.msg);
    }
  }
);

export const createRatingAction = createAsyncThunk(
  "productDetail/createRatingAction",
  async (payload, { rejectWithValue }) => {
    try {
      const { data, currentSocket, setLoad } = payload;

      const res = await RatingApi.createRating(data);

      const newProduct = {
        ...res.currentProduct,
        ratings: [res.newRating, ...res.currentProduct.ratings],
      };

      currentSocket.emit("ratingProduct", newProduct);

      setLoad(false);
      return res;
    } catch (err) {
      return rejectWithValue(err.response.msg);
    }
  }
);

const productDetailSlice = createSlice({
  name: "productDetail",
  initialState: {
    product: {},
    loading: false,
    productRelated: [],
    onReply: false,
  },
  reducers: {
    loadingAction: (state, action) => {
      state.loading = action.payload;
    },
    updateProductDetail: (state, action) => {
      if (state.product._id === action.payload._id) {
        const newProduct = {
          ...state.product,
          likes: action.payload.likes,
          count: action.payload.count,
          sold: action.payload.sold,
        };
        state.product = newProduct;
      } else {
        state.product = { ...state.product };
      }
    },
    updateRatingProductDetail: (state, action) => {
      if (state.product._id === action.payload._id) {
        state.product = action.payload;
      } else {
        state.product = { ...state.product };
      }
    },
    removeRatingProductDetail: (state, action) => {
      const currentRatings = cloneItem(state.product.ratings);
      const newRating = deleteData(currentRatings, action.payload._id);
      state.product = { ...state.product, ratings: newRating };
    },
  },
  extraReducers: {
    [getProductDetail.fulfilled]: (state, action) => {
      state.product = action.payload.product;
      state.loading = false;
    },
    [createRatingAction.fulfilled]: (state, action) => {
      let existingProduct = JSON.parse(JSON.stringify(state.product));
      const newRatings = [action.payload.newRating, ...existingProduct.ratings];
      const newProduct = { ...existingProduct, ratings: newRatings };
      state.product = newProduct;
    },
    [getRelatedProducts.fulfilled]: (state, action) => {
      const relatedProducts = action.payload.relatedProducts.slice(0, 6);
      state.productRelated = relatedProducts;
    },
  },
});

export const {
  loadingAction,
  updateProductDetail,
  updateRatingProductDetail,
  removeRatingProductDetail,
} = productDetailSlice.actions;
const { reducer } = productDetailSlice;
export default reducer;
