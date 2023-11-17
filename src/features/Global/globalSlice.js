import { createSlice } from "@reduxjs/toolkit";
import { cloneItem } from "../../utils/common";

const globalSlice = createSlice({
  name: "global",
  initialState: {
    onEdit: false,
    product: {},
    loading: false,
    online: [],
  },
  reducers: {
    editedProduct: (state, action) => {
      state.onEdit = action.payload.onEdit;
      state.product = action.payload.product;
    },
    handleLoading: (state, action) => {
      state.loading = action.payload;
    },
    handleOnline: (state, action) => {
      let currentUsersOnline = cloneItem(state.online);
      const checked = currentUsersOnline.includes(action.payload);
      if (checked === false) {
        state.online.push(action.payload);
      }
    },
    handleOffline: (state, action) => {
      const currentUsersOnline = cloneItem(state.online);
      const newUsers = currentUsersOnline.filter(
        (user) => user !== action.payload
      );
      state.online = newUsers;
    },
  },
});

export const { editedProduct, handleLoading, handleOnline, handleOffline } =
  globalSlice.actions;

const { reducer } = globalSlice;
export default reducer;
