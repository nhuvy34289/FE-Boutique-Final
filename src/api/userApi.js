import axiosClient from "./axiosClient";

const UserAPI = {
  postSignUp: (query) => {
    const url = `/register/${query}`;
    return axiosClient.post(url);
  },
  postSignIn: (query) => {
    const url = `/login/${query}`;
    return axiosClient.post(url);
  },
};

export default UserAPI;
