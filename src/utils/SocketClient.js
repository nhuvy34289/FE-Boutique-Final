import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateMessages } from "../features/Admin/adminSlice";
import { updateConversationsFromAdmin } from "../features/Conversations/conversationSlice";
import { handleOffline, handleOnline } from "../features/Global/globalSlice";
import { updateNotifies } from "../features/Notification/notificationSlice";
import {
  updateProductDetail,
  updateRatingProductDetail,
} from "../features/ProductDetails/productDetailSlice";

const SocketClient = () => {
  const { auth } = useSelector((state) => state);
  const { currentSocket } = useSelector((state) => state.socket);
  const dispatch = useDispatch();

  // Connect User - Disconnect User

  useEffect(() => {
    currentSocket.emit("joinUser", auth.user);
  }, [auth, currentSocket]);

  //   Like - UnLike Product

  useEffect(() => {
    currentSocket.on("likeProductToClient", (product) => {
      dispatch(updateProductDetail(product));
    });
    return () => currentSocket.off("likeProductToClient");
  }, [currentSocket, dispatch]);

  useEffect(() => {
    currentSocket.on("unLikeProductToClient", (product) => {
      dispatch(updateProductDetail(product));
    });
    return () => currentSocket.off("unLikeProductToClient");
  }, [currentSocket, dispatch]);

  // Carts

  useEffect(() => {
    currentSocket.on("addToCartToClient", (product) => {
      dispatch(updateProductDetail(product));
    });
    return () => currentSocket.off("addToCartToClient");
  }, [currentSocket, dispatch]);

  useEffect(() => {
    currentSocket.on("increaseCartItemToClient", (product) => {
      dispatch(updateProductDetail(product));
    });
    return () => currentSocket.off("increaseCartItemToClient");
  }, [currentSocket, dispatch]);

  useEffect(() => {
    currentSocket.on("decreaseCartItemToClient", (product) => {
      dispatch(updateProductDetail(product));
    });
    return () => currentSocket.off("decreaseCartItemToClient");
  }, [currentSocket, dispatch]);

  useEffect(() => {
    currentSocket.on("deleteCartItemToClient", (product) => {
      dispatch(updateProductDetail(product));
    });
    return () => currentSocket.off("deleteCartItemToClient");
  }, [currentSocket, dispatch]);

  // Rating Product

  useEffect(() => {
    currentSocket.on("ratingProductToClient", (rating) => {
      dispatch(updateRatingProductDetail(rating));
    });
    return () => currentSocket.off("ratingProductToClient");
  }, [currentSocket, dispatch]);

  useEffect(() => {
    currentSocket.on("deleteRatingProductToClient", (rating) => {
      dispatch(updateRatingProductDetail(rating));
    });
    return () => currentSocket.off("deleteRatingProductToClient");
  }, [currentSocket, dispatch]);

  // Messages
  useEffect(() => {
    currentSocket.on("receive_message", (newMessages) => {
      dispatch(updateMessages(newMessages));
      dispatch(updateConversationsFromAdmin(newMessages));
    });
    return () => currentSocket.off("receive_message");
  }, [currentSocket, dispatch]);

  //Notify
  useEffect(() => {
    currentSocket.on("createNotifyToClient", (newMsg) => {
      dispatch(updateNotifies(newMsg));
    });
    return () => currentSocket.off("createNotifyToClient");
  }, [currentSocket, dispatch]);

  //Online - Offline
  useEffect(() => {
    currentSocket.emit("checkUserOnline", auth.user);
  }, [currentSocket, auth]);

  useEffect(() => {
    currentSocket.on("checkUserOnlineToClient", (users) => {
      dispatch(handleOnline(users._id));
    });
    return () => currentSocket.off("checkUserOnlineToClient");
  }, [currentSocket, dispatch]);

  useEffect(() => {
    currentSocket.on("checkUserOfflineToClient", (id) => {
      dispatch(handleOffline(id));
    });
    return () => currentSocket.off("checkUserOfflineToClient");
  }, [currentSocket, dispatch]);

  return <> </>;
};

export default SocketClient;
