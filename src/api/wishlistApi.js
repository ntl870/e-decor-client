import axiosClient from "./axiosClient";

const wishlistApi = {
  getAll: (params) => {
    const url = `/wishlist`;
    return axiosClient.get(url, { params });
  },

  create: (data) => {
    const url = `/wishlist`;
    return axiosClient.post(url, data);
  },

  delete: (id) => {
    const url = `/wishlist/${id}`;
    return axiosClient.delete(url);
  },
};

export default wishlistApi;
