import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import NotifyApi from "../../api/notifyApi";

export const createNotifyAction = createAsyncThunk(
  "notification/createNotifyAction",
  async (payload, { rejectWithValue }) => {
    try {
      const { msg, currentSocket } = payload;

      const res = await NotifyApi.createNotify(msg);

      const newMsg = {
        ...res.notify,
        user: { username: msg.user.username },
      };

      currentSocket.emit("createNotify", newMsg);

      return res;
    } catch (err) {
      return rejectWithValue(err.response.msg);
    }
  }
);

export const getNotifiesAction = createAsyncThunk(
  "notification/getNotifiesAction",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await NotifyApi.getNotifies(payload);
      return res;
    } catch (err) {
      return rejectWithValue(err.response.msg);
    }
  }
);

export const isReadNotifiesAction = createAsyncThunk(
  "notification/isReadNotifiesAction",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await NotifyApi.isReadNotify(payload);
      return res;
    } catch (err) {
      return rejectWithValue(err.response.msg);
    }
  }
);

export const removeAllNotifiesAction = createAsyncThunk(
  "notification/removeAllNotifiesAction",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await NotifyApi.removeAllNotify(payload);
      return res;
    } catch (err) {
      return rejectWithValue(err.response.msg);
    }
  }
);

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    loading: false,
    data: [],
  },
  reducers: {
    updateIsReadNotifies: (state, action) => {
      const { indexMsg, newMsg } = action.payload;
      state.data.splice(indexMsg, 1, newMsg);
    },
    updateNotifies: (state, action) => {
      state.data.push(action.payload);
    },
  },
  extraReducers: {
    [createNotifyAction.fulfilled]: (state, action) => {
      // console.log(action.payload);
    },
    [getNotifiesAction.fulfilled]: (state, action) => {
      state.data = action.payload.notifies;
    },
    [isReadNotifiesAction.fulfilled]: (state, action) => {
      // console.log(action.payload);
    },
    [removeAllNotifiesAction.fulfilled]: (state, action) => {
      state.data = [];
    },
  },
});

export const { updateIsReadNotifies, updateNotifies } =
  notificationSlice.actions;
const { reducer } = notificationSlice;
export default reducer;
