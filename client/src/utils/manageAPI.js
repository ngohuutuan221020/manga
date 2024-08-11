import axios from "../utils/axiosConfig";

const createNewManga = (data) => {
  return axios.post("/v1/api/create-new-manga", data);
};
const getAllManga = () => {
  return axios.get("/v1/api/get-all-manga");
};
const addChapterById = (chapterId, data) => {
  return axios.post(`/v1/api/chapters/${chapterId}`, data);
};
const getChapterByIdManga = (chapterId) => {
  return axios.get(`/v1/api/get-chapters/${chapterId}`);
};
const getDetailMangaById = (id) => {
  return axios.get(`/v1/api/get-detail-manga/${id}`);
};
const getChapterById = (idChapter) => {
  return axios.get(`/v1/api/get-chapter/${idChapter}`);
};
const deleteManga = (id) => {
  return axios.delete(`/v1/api/delete-manga/${id}`);
};
export {
  createNewManga,
  getAllManga,
  addChapterById,
  getChapterByIdManga,
  getDetailMangaById,
  getChapterById,
  deleteManga,
};
