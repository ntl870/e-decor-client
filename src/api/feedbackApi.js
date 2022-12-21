import axiosClient from "./axiosClient";
import axiosPublic from "./axiosPublic";

const feedbackApi = {
  getAll: (id, params) => {
    const url = `/products/${id}/feedbacks`;
    return axiosPublic.get(url, { params });
  },

  create: (id, data) => {
    const url = `/products/${id}/feedbacks`;
    return axiosClient.post(url, data);
  },

  delete: (id) => {
    const url = `/feedbacks/${id}`;
    return axiosClient.delete(url);
  },
};

export default feedbackApi;
