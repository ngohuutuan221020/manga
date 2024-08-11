const express = require("express");
const router = express.Router();
const jsonwebtoken = require("../middleware/jsonwebtoken");
const {
  createMangaController,
  getAllMangaController,
  addChapterByIdController,
  getChapterByIdMangaController,
  getDetailMangaByIdController,
  getChapterByIdController,
  deleteMangaByIdController,
} = require("../controller/manageController");
const upload = require("../middleware/multer");

router.post("/create-new-manga", jsonwebtoken, createMangaController);
router.post(
  "/chapters/:chapterId",
  jsonwebtoken,
  upload.array("images"),
  addChapterByIdController
);
router.get("/get-all-manga", getAllMangaController);
router.get("/get-chapter/:id", getChapterByIdController);
router.get("/get-chapters/:chapterId", getChapterByIdMangaController);
router.get("/get-detail-manga/:id", getDetailMangaByIdController);
router.delete("/delete-manga/:id", jsonwebtoken, deleteMangaByIdController);

module.exports = router;
