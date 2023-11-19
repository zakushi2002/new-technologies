import axios from "axios";
const baseURL = "http://localhost:5000";
export const instance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  params: {},
});
instance.interceptors.response.use(
  function (response) {
    if (response.data) {
      return response.data;
    }
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);
export const instanceFile = axios.create({
  baseURL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
  params: {},
});
instanceFile.interceptors.response.use(
  function (response) {
    if (response.data) {
      return response.data;
    }
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);
