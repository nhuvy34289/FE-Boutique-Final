import { createSlice } from "@reduxjs/toolkit";

const socketClientSlice = createSlice({
  name: "socketClient",
  initialState: {
    currentSocket: {},
  },
  reducers: {
    addNewSocket: (state, action) => {
      state.currentSocket = action.payload;
    },
  },
  extraReducers: {},
});

export const { addNewSocket } = socketClientSlice.actions;
const { reducer } = socketClientSlice;
export default reducer;
