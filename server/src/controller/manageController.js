const {
  getAllMangaService,
  createMangaService,
  addChapterByIdService,
  getChapterByIdMangaService,
  getDetailMangaByIdService,
  getChapterByIdService,
  deleteMangaByIdService,
} = require("../services/manageService");

async function createMangaController(req, res) {
  const { title, introduction, author, genre, status, coverImage } = req.body;
  if (!title || !introduction || !author || !genre || !status || !coverImage) {
    return res.status(400).json({ EC: 1, EM: "Invalid request" });
  }
  try {
    const data = await createMangaService(
      title,
      introduction,
      author,
      genre,
      status,
      coverImage
    );
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ EC: 2, EM: "Internal server error" });
  }
}
async function getAllMangaController(req, res) {
  try {
    const data = await getAllMangaService();
    if (!data)
      return {
        EC: 1,
        EM: "No manga found",
      };
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ EC: 2, EM: "Internal server error" });
  }
}
async function addChapterByIdController(req, res) {
  const chapterId = req.params.chapterId;
  const { nameChapter, images } = req.body;

  if (!nameChapter || !images) {
    return res.status(400).json({ EC: 1, EM: "Invalid request" });
  }
  try {
    const data = await addChapterByIdService(chapterId, nameChapter, images);
    if (!data)
      return {
        EC: 1,
        EM: "Add chapter failed",
      };
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ EC: 2, EM: "Internal server error" });
  }
}
async function getChapterByIdMangaController(req, res) {
  const chapterId = req.params.chapterId;
  try {
    const data = await getChapterByIdMangaService(chapterId);
    if (!data)
      return {
        EC: 1,
        EM: "Add chapter failed",
      };
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ EC: 2, EM: "Internal server error" });
  }
}
async function getDetailMangaByIdController(req, res) {
  const id = req.params.id;
  try {
    const data = await getDetailMangaByIdService(id);
    if (!data)
      return {
        EC: 1,
        EM: "Add chapter failed",
      };
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ EC: 2, EM: "Internal server error" });
  }
}
async function getChapterByIdController(req, res) {
  const id = req.params.id;

  try {
    const data = await getChapterByIdService(id);
    if (!data)
      return {
        EC: 1,
        EM: "Get chapter failed",
      };
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ EC: 2, EM: "Internal server error" });
  }
}
async function deleteMangaByIdController(req, res) {
  const id = req.params.id;

  try {
    const data = await deleteMangaByIdService(id);
    if (!data)
      return {
        EC: 1,
        EM: "Get chapter failed",
      };
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ EC: 2, EM: "Internal server error" });
  }
}
module.exports = {
  getAllMangaController,
  createMangaController,
  addChapterByIdController,
  getChapterByIdMangaController,
  getDetailMangaByIdController,
  getChapterByIdController,
  deleteMangaByIdController,
};
