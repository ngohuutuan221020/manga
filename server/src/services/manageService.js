const Manga = require("../models/Manga");
const Chapter = require("../models/Chapter");

async function createMangaService(
  title,
  introduction,
  author,
  genre,
  status,
  coverImage
) {
  try {
    const newManga = await Manga.create({
      TenTruyen: title,
      GioiThieuTruyen: introduction,
      TacGia: author,
      TheLoai: genre,
      TrangThai: status,
      TotalView: 0,
      TopHot: "Yes",
      AvtTruyen: coverImage,
    });
    if (!newManga)
      return {
        EC: 1,
        EM: "Create Manga Failed",
      };
    return {
      EC: 0,
      EM: "Create Manga Success",
      DATA: newManga,
    };
  } catch (error) {
    console.error(error);
    return res.status(500).json({ EC: 2, EM: "Create Manga Error" });
  }
}
async function getAllMangaService() {
  try {
    const mangas = await Manga.find({}).sort({ _id: -1 });
    if (!mangas)
      return {
        EC: 1,
        EM: "Get All Manga Failed",
      };
    return {
      EC: 0,
      EM: "Get All Manga Success",
      DATA: mangas,
    };
  } catch (error) {
    console.error(error);
    return res.status(500).json({ EC: 2, EM: "Get All Manga Error" });
  }
}
async function addChapterByIdService(chapterId, title, imageURL) {
  try {
    const chapter = await Chapter.create({
      idManga: chapterId,
      title: title,
      images: imageURL,
    });
    if (!chapter)
      return {
        EC: 1,
        EM: "Add Chapter Failed",
      };
    return {
      EC: 0,
      EM: "Add Chapter Success",
      DATA: chapter,
    };
  } catch (error) {
    console.error(error);
    return res.status(500).json({ EC: 2, EM: "Get All Manga Error" });
  }
}
async function getChapterByIdMangaService(chapterId) {
  try {
    const chapter = await Chapter.find({
      idManga: chapterId,
    });

    if (!chapter)
      return {
        EC: 1,
        EM: "Get Chapter Failed",
      };
    return {
      EC: 0,
      EM: "Get Chapter Success",
      DATA: chapter,
    };
  } catch (error) {
    console.error(error);
    return res.status(500).json({ EC: 2, EM: "Get All Manga Error" });
  }
}
async function getDetailMangaByIdService(id) {
  try {
    const manga = await Manga.findById(id);
    if (!manga)
      return {
        EC: 1,
        EM: "Add manga Failed",
      };
    const chapters = await Chapter.find({ idManga: id }).select("title");

    if (!chapters)
      return {
        EC: 1,
        EM: "Search chapter Failed",
      };
    return {
      EC: 0,
      EM: "Add manga Success",
      DATA: {
        Manga: manga,
        Chapters: chapters,
      },
    };
  } catch (error) {
    console.error(error);
    return res.status(500).json({ EC: 2, EM: "Get All Manga Error" });
  }
}
async function getChapterByIdService(id) {
  try {
    const chapter = await Chapter.findById(id);

    if (!chapter)
      return {
        EC: 1,
        EM: "Get chapter Failed",
      };
    return {
      EC: 0,
      EM: "Get chapter Success",
      DATA: chapter,
    };
  } catch (error) {
    console.error(error);
    return res.status(500).json({ EC: 2, EM: "Get chapter Error" });
  }
}
async function deleteMangaByIdService(id) {
  try {
    const deleteManga = await Manga.findByIdAndDelete(id);

    if (!deleteManga)
      return {
        EC: 1,
        EM: "DeleteManga Failed",
      };
    return {
      EC: 0,
      EM: "DeleteManga Success",
      DATA: deleteManga,
    };
  } catch (error) {
    console.error(error);
    return res.status(500).json({ EC: 2, EM: "DeleteManga Error" });
  }
}

module.exports = {
  getAllMangaService,
  createMangaService,
  addChapterByIdService,
  getChapterByIdMangaService,
  getDetailMangaByIdService,
  getChapterByIdService,
  deleteMangaByIdService,
};
