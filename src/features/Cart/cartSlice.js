import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CartAPI from "../../api/cartApi";
import CheckoutAPI from "../../api/checkOutApi";
import { toastSuccess } from "../../utils/common";
import { updateProductDetail } from "../ProductDetails/productDetailSlice";

export const getCartUser = createAsyncThunk(
  "cart/getCartUser",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await CartAPI.getCarts(payload);
      return res;
    } catch (err) {
      return rejectWithValue(err.response.msg);
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (payload, { rejectWithValue, dispatch }) => {
    try {
      const { data, currentSocket } = payload;

      const res = await CartAPI.postAddToCart(data);

      currentSocket.emit("addToCart", res.currentProduct);

      dispatch(updateProductDetail(res.currentProduct));

      toastSuccess(`${res.msg}`);
      return res;
    } catch (err) {
      return rejectWithValue(err.response.msg);
    }
  }
);

export const checkOutAction = createAsyncThunk(
  "cart/checkOutAction",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = payload;
      console.log('vo payload');

      const res = await CheckoutAPI.postEmail(data);

      return res;
    } catch (err) {
      return rejectWithValue(err.response.msg);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
  },
  reducers: {
    updateQualityCart: (state, action) => {
      let existingCart = JSON.parse(JSON.stringify(state.cartItems));
      existingCart = existingCart.slice();
      const indexOldCart = existingCart.findIndex(
        (item) => item._id === action.payload._id
      );
      state.cartItems.splice(indexOldCart, 1, action.payload);
    },
    deleteCartItem: (state, action) => {
      state.cartItems = action.payload;
    },
    resetCart: (state, action) => {
      state.cartItems = [];
    },
  },
  extraReducers: {
    [getCartUser.fulfilled]: (state, action) => {
      state.cartItems = action.payload.carts;
    },
    [addToCart.fulfilled]: (state, action) => {
      let existingCart = JSON.parse(JSON.stringify(state.cartItems));
      existingCart = existingCart.slice();
      const oldCart = existingCart.find(
        (item) => item._id === action.payload.newCart._id
      );

      if (oldCart) {
        const indexOldCart = existingCart.findIndex(
          (item) => item._id === oldCart._id
        );
        state.cartItems.splice(indexOldCart, 1, action.payload.newCart);
      } else {
        state.cartItems.push(action.payload.newCart);
      }
    },
    [checkOutAction.fulfilled]: (state, action) => {
      state.cartItems = [];
    },
  },
});

export const { updateQualityCart, deleteCartItem, resetCart } =
  cartSlice.actions;
const { reducer } = cartSlice;
export default reducer;
