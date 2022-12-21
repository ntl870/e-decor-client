import axiosClient from "./axiosClient";

const orderApi = {
  getAll: (params) => {
    const url = `/orders`;
    return axiosClient.get(url, { params });
  },

  get: (id) => {
    const url = `/orders/${id}`;
    return axiosClient.get(url);
  },

  create: (data) => {
    const url = `/orders`;
    return axiosClient.post(url, data);
  },

  update: (id, data) => {
    const url = `/orders/${id}`;
    return axiosClient.patch(url, data);
  },

  delete: (id) => {
    const url = `/orders/${id}`;
    return axiosClient.delete(url);
  },

  createNewOrder: (data) => {
    const url = `/orders`;
    return axiosClient.post(url, data);
  },

  //
  getShopOrders: (params) => {
    const url = `/orders/shop-owner`;
    return axiosClient.get(url, { params });
  },

  // update
  updateOrderStatus: (id, data) => {
    const url = `/orders/${id}/shop-owner`;
    return axiosClient.patch(url, data);
  },
  // confirm
  confirmReceiveOrder: (id) => {
    const url = `/orders/${id}/confirm-receipt`;
    return axiosClient.patch(url);
  },
  // cancel
  cancelOrder: (id) => {
    const url = `/orders/${id}/cancel`;
    return axiosClient.delete(url);
  },
};

export default orderApi;
