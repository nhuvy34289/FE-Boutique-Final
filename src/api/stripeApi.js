import axiosClient from "./axiosClient";

const StripeAPI = {
  postStripe: (data) => {
    const url = `/payment`;
    return axiosClient.post(url, data);
  },
};

export default StripeAPI;
