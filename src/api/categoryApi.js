import axiosPublic from "./axiosPublic";

const categoryApi = {
  getCategories: () => {
    const url = `/categories`;
    return axiosPublic.get(url);
  },

  getShopCategories: (id) => {
    const url = `/categories/${id}`;
    return axiosPublic.get(url);
  },
};

export default categoryApi;
