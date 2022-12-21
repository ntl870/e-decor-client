import axiosClient from "./axiosClient";
import axiosPublic from "./axiosPublic";

const shopApi = {
  getShops: (params) => {
    const url = "/shops";
    return axiosPublic.get(url, { params });
  },
  getShop: (id) => {
    const url = `/shops/${id}`;
    return axiosPublic.get(url);
  },

  // shop
  createShop: (data) => {
    const url = "/shops";
    return axiosClient.post(url, data);
  },
  updateShop: (data) => {
    const url = `/shops/${data.id}`;
    return axiosClient.put(url, data);
  },

  getMyShop: () => {
    const url = "/shops/my-shop";
    return axiosClient.get(url);
  },
};

export default shopApi;
