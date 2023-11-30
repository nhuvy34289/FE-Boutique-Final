import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "../features/Admin/adminSlice";
import authReducer from "../features/Auth/authSlice";
import cartReducer from "../features/Cart/cartSlice";
import conversationReducer from "../features/Conversations/conversationSlice";
import globalReducer from "../features/Global/globalSlice";
import socketClientReducer from "../features/Global/socketSLice";
import historyReducer from "../features/History/historySlice";
import productDetailReducer from "../features/ProductDetails/productDetailSlice";
import productReducer from "../features/Products/productSlice";
import notificationReducer from "../features/Notification/notificationSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    global: globalReducer,
    productDetail: productDetailReducer,
    cart: cartReducer,
    history: historyReducer,
    conversation: conversationReducer,
    socket: socketClientReducer,
    admin: adminReducer,
    notification: notificationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
