import axiosClient from "./axiosClient";
import axiosPublic from "./axiosPublic";

const productApi = {
  getProducts: (params) => {
    const url = `products`;
    return axiosPublic.get(url, { params });
  },

  getShopProducts: (id, params) => {
    const url = `shops/${id}/products`;
    return axiosPublic.get(url, { params });
  },

  get: (id) => {
    const url = `/products/${id}`;
    return axiosPublic.get(url);
  },

  // shop
  create: (data) => {
    const url = `/products`;
    return axiosClient.post(url, data);
  },

  update: (id, data) => {
    const url = `/products/${id}`;
    return axiosClient.put(url, data);
  },

  delete: (id) => {
    const url = `/products/${id}`;
    return axiosClient.delete(url);
  },

  //
  getBestSellingProducts: (params) => {
    const url = `/products/best-sellings`;
    return axiosPublic.get(url, { params });
  },

  //
  getPurchasedProducts: (params) => {
    const url = `/products/purchased`;
    return axiosClient.get(url, { params });
  },
};

export default productApi;
