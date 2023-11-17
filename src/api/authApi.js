import axiosClient from "./axiosClient";

const AuthAPI = {
  postSignUp: (query) => {
    const url = `/register/${query}`;
    return axiosClient.post(url);
  },
  postSignIn: (query) => {
    const url = `/login/${query}`;
    return axiosClient.post(url);
  },
  postRefreshToken: (data) => {
    const url = `/refresh_token`;
    return axiosClient.post(url, data);
  },
  postLogout: () => {
    const url = "/logout";
    return axiosClient.post(url);
  },
  postForgot: (query) => {
    const url = `/forgot${query}`;
    return axiosClient.post(url);
  },
  postResetPassword: (query) => {
    const url = `/resetPassword${query}`;
    return axiosClient.post(url);
  },
  patchFavouriteProduct: (query) => {
    const url = `/favourite/${query}`;
    return axiosClient.patch(url);
  },
  patchUnFavouriteProduct: (query) => {
    const url = `/removeFavourite/${query}`;
    return axiosClient.patch(url);
  },
  patchChangePassword: (data) => {
    const url = `/changePassword`;
    return axiosClient.patch(url, data);
  },
  patchUpdateUser: (data) => {
    const url = `/user`;
    return axiosClient.patch(url, data);
  },
  getAllUsers: () => {
    const url = `/allUsers`;
    return axiosClient.get(url);
  },
  searchUser: (query) => {
    const url = `/search${query}`;
    return axiosClient.get(url);
  },
  patchUpdateUserFromAdmin: (data) => {
    const url = `/updateUserFromAdmin`;
    return axiosClient.patch(url, data);
  },
  patchUpdatePasswordFromAdmin: (data) => {
    const url = `/updatePasswordFromAdmin`;
    return axiosClient.patch(url, data);
  },
  deleteUser: (query) => {
    const url = `/user${query}`;
    return axiosClient.delete(url);
  },
};

export default AuthAPI;
