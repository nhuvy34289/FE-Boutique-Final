import axiosClient from "./axiosClient";

const CartAPI = {
  getCarts: (query) => {
    const url = `/userCart/${query}`;
    return axiosClient.get(url);
  },

  postAddToCart: (data) => {
    const url = `/carts`;
    return axiosClient.post(url, data);
  },

  deleteToCart: (query) => {
    const url = `/carts/${query}`;
    return axiosClient.delete(url);
  },

  putToCart: (data) => {
    const url = `/carts`;
    return axiosClient.put(url, data);
  },

  increaseCartItem: (data) => {
    const url = `/cart/increase`;
    return axiosClient.put(url, data);
  },

  decreaseCartItem: (data) => {
    const url = `/cart/decrease`;
    return axiosClient.put(url, data);
  },
};

export default CartAPI;
