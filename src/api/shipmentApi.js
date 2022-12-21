import axiosClient from "./axiosClient";

const shipmentApi = {
  getAll: () => {
    const url = `/shipping-units`;
    return axiosClient.get(url);
  },

  get: (id) => {
    const url = `/shipping-units/${id}`;
    return axiosClient.get(url);
  },

  create: (data) => {
    const url = `/shipping-units`;
    return axiosClient.post(url, data);
  },

  update: (id, data) => {
    const url = `/shipping-units/${id}`;
    return axiosClient.put(url, data);
  },

  delete: (id) => {
    const url = `/shipping-units/${id}`;
    return axiosClient.delete(url);
  },
};

export default shipmentApi;
