import axiosClient from "./axiosClient";

const HistoryApi = {
  getUserHistory: (query) => {
    const url = `/userHistory/${query}`;
    return axiosClient.get(url);
  },
  getAllHistories: () => {
    const url = `/histories`;
    return axiosClient.get(url);
  },
  updateHistory: (data) => {
    const url = `/history`;
    return axiosClient.patch(url, data);
  },
  deleteHistory: (query) => {
    const url = `/history${query}`;
    return axiosClient.delete(url);
  },
};

export default HistoryApi;
