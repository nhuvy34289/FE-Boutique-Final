import axiosClient from "./axiosClient";

const ProductAPI = {
  getProducts: () => {
    const url = `/products`;
    return axiosClient.get(url);
  },
  getProductByCategory: (query) => {
    const url = `/productByCategory`;
    return axiosClient.post(url, query);
  },
  getProduct: (query) => {
    const url = `/product/${query}`;
    return axiosClient.get(url);
  },
  getProductPagination: (query) => {
    const url = `/pagination/${query}`;
    return axiosClient.get(url);
  },
  postCreateProduct: (newProduct) => {
    const url = `/products`;
    return axiosClient.post(url, newProduct);
  },
  updateProduct: (newProduct) => {
    const url = `/product`;
    return axiosClient.patch(url, newProduct);
  },
  deleteProduct: (query) => {
    const url = `/product/${query}`;
    return axiosClient.delete(url);
  },
  getRelatedProduct: (query) => {
    const url = `/relatedProducts/${query}`;
    return axiosClient.get(url);
  },
};

export default ProductAPI;
