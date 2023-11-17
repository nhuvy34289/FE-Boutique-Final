import axiosClient from "./axiosClient";

const RatingApi = {
  createRating: (data) => {
    const url = `/rating`;
    return axiosClient.post(url, data);
  },
  updateRating: (data) => {
    const url = `/rating`;
    return axiosClient.patch(url, data);
  },
  deleteRating: (query) => {
    const url = `/rating${query}`;
    return axiosClient.delete(url);
  },
  likeRating: (data) => {
    const url = `/rating/like`;
    return axiosClient.patch(url, data);
  },
  unLikeRating: (data) => {
    const url = `/rating/unlike`;
    return axiosClient.patch(url, data);
  },
};

export default RatingApi;
