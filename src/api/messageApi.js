import axiosClient from "./axiosClient";

const MessageApi = {
  getMessage: (query) => {
    const url = `/messages${query}`;
    return axiosClient.get(url);
  },
  postMessage: (data) => {
    const url = `/send`;
    return axiosClient.post(url, data);
  },
  postConversation: (query) => {
    const url = `/conversation${query}`;
    return axiosClient.post(url);
  },
};
export default MessageApi;
