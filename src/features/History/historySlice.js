import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import HistoryApi from "../../api/HistoryApi";

export const getUserHistoryAction = createAsyncThunk(
  "history/getUserHistory",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await HistoryApi.getUserHistory(payload);
      return res;
    } catch (err) {
      return rejectWithValue(err.response.msg);
    }
  }
);

const historySlice = createSlice({
  name: "history",
  initialState: {
    userHistory: [],
  },
  extraReducers: {
    [getUserHistoryAction.fulfilled]: (state, action) => {
      state.userHistory = action.payload.userHistories;
    },
  },
});

const { reducer } = historySlice;
export default reducer;
