import axiosClient from "./axiosClient";

const addressApi = {
  getCities: () => {
    const url = "/address/cities";
    return axiosClient.get(url);
  },

  getDistricts: (params) => {
    const url = `/address/districts`;
    return axiosClient.get(url, { params });
  },

  getWards: (params) => {
    const url = `/address/wards`;
    return axiosClient.get(url, { params });
  },
  
  //
  add: (data) => {
    const url = `/users/addresses`;
    return axiosClient.post(url, data);
  },
  getAll: () => {
    const url = `/users/addresses`;
    return axiosClient.get(url);
  },
  update: (id, data) => {
    const url = `/users/addresses/${id}`;
    return axiosClient.patch(url, data);
  },
  delete: (id) => {
    const url = `/users/addresses/${id}`;
    return axiosClient.delete(url);
  },
};

export default addressApi;
