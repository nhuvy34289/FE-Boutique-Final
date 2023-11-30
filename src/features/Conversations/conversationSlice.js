import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import MessageApi from "../../api/messageApi";

export const getConversations = createAsyncThunk(
  "conversation/getConversations",
  async (payload, { rejectWithValue }) => {
    try {
      //   thunkAPI.dispatch(loadingAction(false));
      const res = await MessageApi.getMessage(payload);
      return res;
    } catch (err) {
      return rejectWithValue(err.response.msg);
    }
  }
);

const conversationSlice = createSlice({
  name: "conversation",
  initialState: {
    conversations: [],
  },
  reducers: {
    updateConversationsFromUser: (state, action) => {
      const newContent = {
        message: action.payload.message,
        medias: action.payload.medias,
        name: action.payload.name,
        category: action.payload.category,
      };
      state.conversations.content.push(newContent);
    },
    updateConversationsFromAdmin: (state, action) => {
      if (
        state.conversations.id_user1 === action.payload.id_user1 &&
        state.conversations.id_user2 === action.payload.id_user2
      ) {
        state.conversations = action.payload;
      } else {
        state.conversations = { ...state.conversations };
      }
    },
  },
  extraReducers: {
    [getConversations.fulfilled]: (state, action) => {
      state.conversations = action.payload;
    },
  },
});
export const { updateConversationsFromAdmin, updateConversationsFromUser } =
  conversationSlice.actions;
const { reducer } = conversationSlice;
export default reducer;
