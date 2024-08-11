import axios from "../utils/axiosConfig";

const register = (data) => {
  return axios.post("/v1/auth/register", data);
};

const login = (data) => {
  return axios.post("/v1/auth/login", data);
};

const getAllUser = () => {
  return axios.get("/v1/auth/get-all-user");
};

const getProfile = () => {
  return axios.get("/v1/auth/get-profile");
};

export { register, login, getAllUser, getProfile };
