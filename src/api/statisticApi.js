import axiosClient from "./axiosClient";

const statisticApi = {
  getStatistics: (params) => {
    const url = `/dashboard/statistics`;
    return axiosClient.get(url, { params });
  },
  getChart: (params) => {
    const url = `/dashboard/earnings`;
    return axiosClient.get(url, { params });
  },
};

export default statisticApi;
