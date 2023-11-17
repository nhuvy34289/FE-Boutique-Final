import axiosClient from "./axiosClient";

const CheckoutAPI = {
  postEmail: (data) => {
    const url = `/sendEmail`;
    return axiosClient.post(url, data);
  },
};

export default CheckoutAPI;
