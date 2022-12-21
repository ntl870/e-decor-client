import axiosClient from "./axiosClient";

const promotionApi = {
  getAll: (id, params) => {
    const url = `/shops/${id}/promotions/all`;
    return axiosClient.get(url, { params });
  },
  getPromotions: (id) => {
    const url = `/shops/${id}/promotions`;
    return axiosClient.get(url);
  },

  get: (shopId, id) => {
    const url = `/shops/${shopId}/promotions/${id}`;
    return axiosClient.get(url);
  },

  create: (id, data) => {
    const url = `/shops/${id}/promotions`;
    return axiosClient.post(url, data);
  },

  update: (shopId, data) => {
    const url = `/shops/${shopId}/promotions/${data?.id}`;
    const { id, ...body } = data;
    return axiosClient.put(url, body);
  },

  delete: (shopId, id) => {
    const url = `/shops/${shopId}/promotions/${id}`;
    return axiosClient.delete(url);
  },
};

export default promotionApi;
