import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import AuthAPI from "../../api/authApi";
import MessageApi from "../../api/messageApi";
import { removeCharacters, toastError } from "../../utils/common";
import { imageUpload } from "../../utils/imageUpload";
import { updateProductDetail } from "../ProductDetails/productDetailSlice";

export const registerAction = createAsyncThunk(
  "user/register",
  async (payload, { rejectWithValue }) => {
    const { query, history, anotherQuery } = payload;
    try {
      const res = await AuthAPI.postSignUp(query);
      await MessageApi.postConversation(anotherQuery);
      history.push("/signIn");
      toast.success(`${res.msg}`, {
        position: "top-right",
      });
      return res;
    } catch (err) {
      toastError(err.response.data.msg);
      return rejectWithValue(err.response.msg);
    }
  }
);

export const loginAction = createAsyncThunk(
  "user/login",
  async (payload, { rejectWithValue }) => {
    const { query, history } = payload;
    try {
      const res = await AuthAPI.postSignIn(query);
      console.log("🚀 ~ file: authSlice.js:34 ~ res", res)
      history.push("/");
      toast.success(`${res.msg}`, {
        position: "top-right",
      });

      localStorage.setItem(
        "firstLogin",
        JSON.stringify(res.accessToken)
      );
      localStorage.setItem(
        "tokenRefresh",
        JSON.stringify(res.refresh_token)
      );

      return res;
    } catch (err) {
      toast.error(`${err.response.data.msg}`, {
        position: "top-right",
      });
      return rejectWithValue(err.response.msg);
    }
  }
);

export const logoutAction = createAsyncThunk(
  "user/logout",
  async (payload, { rejectWithValue }) => {
    try {
      localStorage.removeItem("firstLogin");
      localStorage.removeItem("tokenRefresh");
      const res = await AuthAPI.postLogout();
      toast.success(`${res.msg}`, {
        position: "top-right",
      });
      window.location.href = "/";

      return res;
    } catch (err) {
      toast.error(`${err.response.data.msg}`, {
        position: "top-right",
      });
      return rejectWithValue(err.response.msg);
    }
  }
);

export const forgotPasswordAction = createAsyncThunk(
  "user/forgotPasswordAction",
  async (payload, { rejectWithValue }) => {
    const { query, setLoad } = payload;
    try {
      const res = await AuthAPI.postForgot(query);
      toast.success(`${res.msg}`, {
        position: "top-right",
      });
      setLoad(false);
      return res;
    } catch (err) {
      toast.error(`${err.response.data.msg}`, {
        position: "top-right",
      });
      return rejectWithValue(err.response.msg);
    }
  }
);

export const resetPasswordAction = createAsyncThunk(
  "user/resetPasswordAction",
  async (payload, { rejectWithValue }) => {
    const { query, setLoad, history } = payload;
    try {
      const res = await AuthAPI.postResetPassword(query);
      toast.success(`${res.msg}`, {
        position: "top-right",
      });
      setLoad(false);
      history.push("/signIn");
      return res;
    } catch (err) {
      toast.error(`${err.response.data.msg}`, {
        position: "top-right",
      });
      return rejectWithValue(err.response.msg);
    }
  }
);

export const refreshTokenAction = createAsyncThunk(
  "user/refresh_token",
  async (payload, { rejectWithValue }) => {
    const tokenRefresh = localStorage.getItem("tokenRefresh");
    if (tokenRefresh) {
      try {
        const res = await AuthAPI.postRefreshToken({
          refresh_token: tokenRefresh,
        });
        return res;
      } catch (err) {
        toast.error(`${err.response.data.msg}`, {
          position: "top-right",
        });
        return rejectWithValue(err.response.msg);
      }
    }
  }
);

export const likeProductAction = createAsyncThunk(
  "user/likeProduct",
  async (payload, { rejectWithValue, dispatch }) => {
    try {
      const { params, currentSocket } = payload;

      const res = await AuthAPI.patchFavouriteProduct(params);

      dispatch(updateProductDetail(res.newProduct));

      currentSocket.emit("likeProduct", res.newProduct);

      toast.success(`${res.msg}`, {
        position: "top-right",
      });
      return res.newFavourite;
    } catch (err) {
      toast.error(`${err.response.data.msg}`, {
        position: "top-right",
      });
      return rejectWithValue(err.response.msg);
    }
  }
);

export const unLikeProductAction = createAsyncThunk(
  "user/unLikeProduct",
  async (payload, { rejectWithValue, dispatch }) => {
    try {
      const { params, currentSocket } = payload;

      const res = await AuthAPI.patchUnFavouriteProduct(params);

      dispatch(updateProductDetail(res.newProduct));

      currentSocket.emit("unLikeProduct", res.newProduct);

      toast.success(`${res.msg}`, {
        position: "top-right",
      });
      return res.newFavourite;
    } catch (err) {
      toast.error(`${err.response.data.msg}`, {
        position: "top-right",
      });
      return rejectWithValue(err.response.msg);
    }
  }
);

export const changlePasswordAction = createAsyncThunk(
  "user/changlePassword",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await AuthAPI.patchChangePassword(payload);
      toast.success(`${res.msg}`, {
        position: "top-right",
      });
      return res;
    } catch (err) {
      toast.error(`${err.response.data.msg}`, {
        position: "top-right",
      });
      return rejectWithValue(err.response.msg);
    }
  }
);

export const updateUserAction = createAsyncThunk(
  "user/updateUser",
  async (payload, { rejectWithValue }) => {
    try {
      let media;
      const { username, email, avatar, auth } = payload;

      if (avatar) media = await imageUpload([avatar]);

      const data = {
        username,
        email,
        avatar: avatar ? media[0].url : auth.user.avatar,
        _id: auth.user._id,
      };

      const res = await AuthAPI.patchUpdateUser(data);
      toast.success(`${res.msg}`, {
        position: "top-right",
      });
      return res;
    } catch (err) {
      toast.error(`${err.response.data.msg}`, {
        position: "top-right",
      });
      return rejectWithValue(err.response.msg);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {},
  extraReducers: {
    [registerAction.fulfilled]: (state, action) => {
      console.log(action.payload);
    },
    [loginAction.fulfilled]: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    },
    [refreshTokenAction.fulfilled]: (state, action) => {
      state.accessToken = action?.payload?.access_token;
      state.user = action?.payload?.user;
    },
    [likeProductAction.fulfilled]: (state, action) => {
      state.user = action.payload;
    },
    [unLikeProductAction.fulfilled]: (state, action) => {
      state.user = action.payload;
    },
    [changlePasswordAction.fulfilled]: (state, action) => {
      console.log(action.payload);
    },
    [updateUserAction.fulfilled]: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    },
  },
});

const { reducer } = userSlice;
export default reducer;
