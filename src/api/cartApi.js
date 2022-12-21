import axiosClient from "./axiosClient";

const cartApi = {
  getAll: () => {
    const url = `/cart-items`;
    return axiosClient.get(url);
  },

  get: () => {
    const url = `/cart-items/recent?limit=5`;
    return axiosClient.get(url);
  },

  add: (data) => {
    const url = `/cart-items`;
    return axiosClient.post(url, data);
  },

  update: (id, data) => {
    const url = `/cart-items/${id}`;
    return axiosClient.patch(url, data);
  },

  delete: (id) => {
    const url = `/cart-items/${id}`;
    return axiosClient.delete(url);
  },
};

export default cartApi;
