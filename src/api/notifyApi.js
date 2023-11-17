import axiosClient from "./axiosClient";

const NotifyApi = {
  createNotify: (data) => {
    const url = `/notify`;
    return axiosClient.post(url, data);
  },
  getNotifies: (query) => {
    const url = `/notifies${query}`;
    return axiosClient.get(url);
  },
  isReadNotify: (query) => {
    const url = `/isReadNotify${query}`;
    return axiosClient.patch(url);
  },
  removeAllNotify: (query) => {
    const url = `/deleteAllNotify${query}`;
    return axiosClient.delete(url);
  },
};

export default NotifyApi;
