import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthAPI from "../../api/authApi";
import HistoryApi from "../../api/HistoryApi";
import MessageApi from "../../api/messageApi";
import { toastError, toastSuccess } from "../../utils/common";
import { createNotifyAction } from "../Notification/notificationSlice";

//User
export const getUserMessageAction = createAsyncThunk(
  "admin/getUserMessageAction",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await MessageApi.getMessage(payload);
      return res;
    } catch (err) {
      return rejectWithValue(err.response.msg);
    }
  }
);

export const getAllUserAction = createAsyncThunk(
  "admin/getAllUserAction",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await AuthAPI.getAllUsers();
      return res;
    } catch (err) {
      return rejectWithValue(err.response.msg);
    }
  }
);

export const addUserAction = createAsyncThunk(
  "admin/addUserAction",
  async (payload, { rejectWithValue }) => {
    const { query, setDone, anotherQuery } = payload;
    try {
      const res = await AuthAPI.postSignUp(query);
      await MessageApi.postConversation(anotherQuery);
      setDone(undefined);
      toastSuccess(`${res.msg}`);
      return res;
    } catch (err) {
      toastError(err.response.data.msg);
      return rejectWithValue(err.response.msg);
    }
  }
);

export const editUserAction = createAsyncThunk(
  "admin/editUserAction",
  async (payload, { rejectWithValue, dispatch }) => {
    const { query, setDone, currentSocket } = payload;
    try {
      const res = await AuthAPI.patchUpdateUserFromAdmin(query);

      const msg = {
        text: "Your informations has been changed !",
        recipient: res.user._id,
        url: `/manage`,
        content: "Please refresh your page to checked.",
        idUser: res.user._id,
        user: res.user.username,
      };

      dispatch(createNotifyAction({ msg, currentSocket }));
      setDone(undefined);
      toastSuccess(`${res.msg}`);
      return res;
    } catch (err) {
      toastError(err.response.data.msg);
      return rejectWithValue(err.response.msg);
    }
  }
);

export const chanagePasswordUserFromAdmin = createAsyncThunk(
  "admin/chanagePasswordUserFromAdmin",
  async (payload, { rejectWithValue }) => {
    const { query, setDone } = payload;
    try {
      const res = await AuthAPI.patchUpdatePasswordFromAdmin(query);
      setDone(undefined);
      toastSuccess(`${res.msg}`);
      return res;
    } catch (err) {
      toastError(err.response.data.msg);
      return rejectWithValue(err.response.msg);
    }
  }
);

export const searchUsersAction = createAsyncThunk(
  "admin/searchUsersAction",
  async (payload, { rejectWithValue }) => {
    const { query } = payload;
    try {
      const res = await AuthAPI.searchUser(query);
      return res;
    } catch (err) {
      return rejectWithValue(err.response.msg);
    }
  }
);

export const deleteUsersAction = createAsyncThunk(
  "admin/deleteUsersAction",
  async (payload, { rejectWithValue }) => {
    const { query, setDone } = payload;
    try {
      const res = await AuthAPI.deleteUser(query);
      setDone(undefined);
      return res;
    } catch (err) {
      return rejectWithValue(err.response.msg);
    }
  }
);

//History
export const getAllHistories = createAsyncThunk(
  "admin/getAllHistories",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await HistoryApi.getAllHistories(payload);
      return res;
    } catch (err) {
      return rejectWithValue(err.response.msg);
    }
  }
);

export const updateHistoryAction = createAsyncThunk(
  "admin/updateHistoryAction",
  async (payload, { rejectWithValue, dispatch }) => {
    const { newOrder, setDone, currentSocket } = payload;
    try {
      const res = await HistoryApi.updateHistory(newOrder);

      const msg = {
        text: "Your order has been changed !",
        recipient: res.user._id,
        url: `/manage`,
        content: "Please refresh your page to checked.",
        idUser: res.user._id,
        user: res.user.username,
      };

      dispatch(createNotifyAction({ msg, currentSocket }));

      toastSuccess(`${res.msg}`);
      setDone(undefined);
      return res;
    } catch (err) {
      return rejectWithValue(err.response.msg);
    }
  }
);

export const deleteHistoryAction = createAsyncThunk(
  "admin/deleteHistoryAction",
  async (payload, { rejectWithValue }) => {
    const { query, setDone } = payload;
    try {
      const res = await HistoryApi.deleteHistory(query);
      toastSuccess(`${res.msg}`);
      setDone(undefined);
      return res;
    } catch (err) {
      return rejectWithValue(err.response.msg);
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    messages: [],
    users: [],
    searchedUser: [],
    histories: [],
  },
  reducers: {
    updateMessages: (state, action) => {
      if (
        state.messages.id_user1 === action.payload.id_user1 &&
        state.messages.id_user2 === action.payload.id_user2
      ) {
        state.messages = action.payload;
      } else {
        state.messages = { ...state.messages };
      }
    },
    updateMessagesFromAdmin: (state, action) => {
      const newContent = {
        message: action.payload.message,
        medias: action.payload.medias,
        name: action.payload.name,
        category: action.payload.category,
      };
      state.messages.content.push(newContent);
    },
  },
  extraReducers: {
    [getUserMessageAction.fulfilled]: (state, action) => {
      state.messages = action.payload;
    },
    [getAllUserAction.fulfilled]: (state, action) => {
      state.users = action.payload.users;
    },
    [searchUsersAction.fulfilled]: (state, action) => {
      state.searchedUser = action.payload.users;
    },
    [getAllHistories.fulfilled]: (state, action) => {
      state.histories = action.payload.allHistories;
    },
  },
});

export const { updateMessages, updateMessagesFromAdmin } = adminSlice.actions;
const { reducer } = adminSlice;
export default reducer;
