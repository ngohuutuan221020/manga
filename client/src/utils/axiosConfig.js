import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

// instance.defaults.headers.common["Authorization"] = VITE_AUTH_TOKEN;
// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("AccessToken");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    if (response && response.data) return response.data;
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
