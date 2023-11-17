import axiosClient from "./axiosClient";

const CategoryAPI = {
  getCategories: () => {
    const url = `/categories`;
    return axiosClient.get(url);
  },
};

export default CategoryAPI;
