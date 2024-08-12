import React from "react";
import { useParams } from "react-router-dom";
import { getChapterById, getChapterByIdManga } from "../utils/manageAPI";
import { Button, message } from "antd";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { LazyLoadImage } from "react-lazy-load-image-component";
const DetailChapter = () => {
  const { title, idManga, chapter, idChapter } = useParams();

  const [listChapterManga, setListChapterManga] = React.useState([]);
  const [lengthChapterManga, setLengthChapterManga] = React.useState([]);

  const [disableButtonPre, setDisableButtonPre] = React.useState(false);
  const [disableButtonNext, setDisableButtonNext] = React.useState(false);

  async function getListChapterMangaById(idChapter) {
    try {
      const res = await getChapterById(idChapter);
      if (!res) return message.error(res.EM);
      if (res && res.EC === 0) {
        setListChapterManga(res.DATA);
      }
      if (res && res.EC === 1) {
        message.warning(res.EM);
      }
    } catch (error) {
      message.error(error);
    }
  }

  async function getLengthChapterManga(idManga) {
    try {
      const res = await getChapterByIdManga(idManga);
      if (!res) return message.error(res.EM);
      if (res && res.EC === 0) {
        setLengthChapterManga(res.DATA);
      }
      if (res && res.EC === 1) {
        message.warning(res.EM);
      }
    } catch (error) {
      message.error(error);
    }
  }

  const index = lengthChapterManga.findIndex(
    (chapter) => chapter._id === idChapter
  );

  let currentIndex = index;

  function updateDisplay() {
    let obj = lengthChapterManga[currentIndex];

    const nameChapter = obj.title.replace(/\s+/g, "-");
    window.location.href = `/${title}/${idManga}/${nameChapter}/${obj._id}`;
  }

  function handleClickButtonPre() {
    if (currentIndex > 0) {
      currentIndex--;
      updateDisplay();
    } else {
      message.warning("Đã đến chương đầu tiên");
      setDisableButtonPre(true);
    }
  }

  function handleClickButtonNext() {
    if (currentIndex < lengthChapterManga.length - 1) {
      currentIndex++;
      updateDisplay();
    } else {
      message.warning("Đã đến chương cuối cùng");
      setDisableButtonNext(true);
    }
  }

  React.useEffect(() => {
    getListChapterMangaById(idChapter);
    getLengthChapterManga(idManga);
  }, [idChapter, idManga]);

  return (
    <div className="container ">
      <Breadcrumb className="mt-4 font-semibold text-lg">
        <Breadcrumb.Item href="/home">Home</Breadcrumb.Item>
        <Breadcrumb.Item href={`/${title}/${idManga}`}>{title}</Breadcrumb.Item>
        <Breadcrumb.Item active>{chapter}</Breadcrumb.Item>
      </Breadcrumb>

      <div
        style={{
          textAlign: "center",
          textTransform: "uppercase",
          fontWeight: "bold",
        }}
      >
        <div className="button flex gap-4">
          <Button onClick={handleClickButtonPre} disabled={disableButtonPre}>
            ◀ Sau
          </Button>
          <Button onClick={handleClickButtonNext} disabled={disableButtonNext}>
            Trước ▶
          </Button>
        </div>
        <h2>{listChapterManga.title}</h2>
      </div>
      {listChapterManga &&
        listChapterManga?.images?.length > 0 &&
        listChapterManga?.images?.map((item, index) => {
          return (
            <LazyLoadImage
              key={index}
              alt={item}
              width={"100%"}
              height={"auto"}
              src={item}
            />
          );
        })}
    </div>
  );
};

export default DetailChapter;
