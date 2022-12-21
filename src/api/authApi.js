import axiosClient from "./axiosClient";
import axiosPublic from "./axiosPublic";

const authApi = {
  login: (data) => {
    const url = "/auth/login";
    return axiosPublic.post(url, data);
  },
  signUp: (data) => {
    const url = "/auth/register";
    return axiosPublic.post(url, data);
  },

  verifyEmail: (data) => {
    const url = "/auth/verify-email";
    return axiosPublic.post(url, data);
  },

  forgotPass: (data) => {
    const url = "/auth/forgot-password";
    return axiosPublic.post(url, data);
  },

  resetPass: (data) => {
    const url = "/auth/reset-password";
    return axiosPublic.post(url, data);
  },

  updatePass: (data) => {
    const url = "/users";
    return axiosClient.patch(url, data);
  },

  getInfo: () => {
    const url = "/users";
    return axiosClient.get(url);
  },
  updateInfo: (data) => {
    const url = "/users";
    return axiosClient.put(url, data);
  },
};

export default authApi;
