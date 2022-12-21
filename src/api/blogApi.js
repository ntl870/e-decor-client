import axiosClient from "./axiosClient";
import axiosPublic from "./axiosPublic";

const blogApi = {
  getPosts: (params) => {
    const url = `/blogs`;
    return axiosPublic.get(url, { params });
  },

  get: (id) => {
    const url = `/blogs/${id}`;
    return axiosPublic.get(url);
  },

  getMyPosts: (params) => {
    const url = `/blogs/my-blog`;
    return axiosClient.get(url, { params });
  },

  create: (data) => {
    const url = `/blogs`;
    return axiosClient.post(url, data);
  },

  update: (id, data) => {
    const url = `/blogs/${id}`;
    return axiosClient.put(url, data);
  },

  delete: (id) => {
    const url = `/blogs/${id}`;
    return axiosClient.delete(url);
  },

  // LIKE
  like: (data) => {
    const url = `/blogs/${data}/likes`;
    return axiosClient.post(url);
  },
  unlike: (data) => {
    const url = `/blogs/${data}/likes`;
    return axiosClient.delete(url);
  },
  getMyLikes: (params) => {
    const url = `/blogs/my-likes`;
    return axiosClient.get(url, { params });
  },

  // decor Themes
  getDecorThemes: () => {
    const url = `/blogs/decor-themes`;
    return axiosPublic.get(url);
  },
};

export default blogApi;
