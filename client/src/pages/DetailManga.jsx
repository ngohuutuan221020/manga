import React from "react";
import { useParams } from "react-router-dom";
import { getDetailMangaById } from "../utils/manageAPI";
import { message } from "antd";
import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Skeleton from "@mui/material/Skeleton";

const DetailManga = () => {
  const { title, idManga } = useParams();
  const [listManga, setListManga] = React.useState([]);

  const [listChapterManga, setListChapterManga] = React.useState([]);

  async function getListChapterMangaById(idManga) {
    try {
      const res = await getDetailMangaById(idManga);

      if (!res) return message.error(res.EM);
      if (res && res.EC === 0) {
        setListManga(res.DATA.Manga);
        setListChapterManga(res.DATA.Chapters);
      }
      if (res && res.EC === 1) {
        message.warning(res.EM);
      }
    } catch (error) {
      message.error(error);
    }
  }
  const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);
    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const year = date.getUTCFullYear();
    return `${day}/${month}/${year}`;
  };
  React.useEffect(() => {
    getListChapterMangaById(idManga);
  }, [idManga]);
  return (
    <div className="detailManga mb-5">
      <div
        className="container"
        style={{
          display: "flex",
          margin: "2rem auto",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          maxWidth: "1200px",
          flexWrap: "wrap",
          gap: "2rem",
        }}
      >
        <div
          className="img"
          style={{
            flex: "0 0 314px",
            height: "100%",
            maxHeight: "100%",
          }}
        >
          {listManga?.coverImage ? (
            <Image
              src={listManga?.coverImage}
              rounded
              style={{
                height: "400px",
                width: "267px",
                objectFit: "cover",
                boxShadow: "10px 10px 5px lightblue",
              }}
            />
          ) : (
            <Skeleton variant="rounded" width={267} height={400} />
          )}
        </div>
        <div
          className="info"
          style={{
            display: "flex",
            flex: "1 1 auto",
            flexDirection: "column",
            justifyContent: "flex-end",
            margin: "0 1rem",
            WebkitBoxFlex: "1",
            width: "500px",
          }}
        >
          {listManga && listManga.coverImage ? (
            <div className="info">
              <Card.Title
                className="mb-2"
                style={{ textTransform: "uppercase", fontWeight: "700" }}
              >
                {listManga?.title}
              </Card.Title>
              <Card.Text>Giới thiệu: {listManga?.description}</Card.Text>
              <Card.Text>Tác giả: {listManga?.author}</Card.Text>
              <Card.Text>Thể loại: {listManga?.genre}</Card.Text>
              <Card.Text>Star: {listManga?.star}/5 ⭐⭐⭐⭐⭐</Card.Text>
              <Card.Text>View: {listManga?.totalView}</Card.Text>
              <Card.Text>
                Cập nhật: {formatDate(listManga?.updatedAt)}
              </Card.Text>
              <Card.Text>
                Trạng thái:{" "}
                <a
                  style={
                    listManga?.status === "Đang tiến hành"
                      ? { color: "red", textTransform: "uppercase" }
                      : { color: "green", textTransform: "uppercase" }
                  }
                >
                  {listManga?.status}
                </a>
              </Card.Text>
            </div>
          ) : (
            <>
              <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
              <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
              <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
              <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
              <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
            </>
          )}
        </div>
      </div>
      <div className="container">
        <h3>Danh sách chương</h3>
        {!listChapterManga.length > 0 && (
          <>
            <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
            <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
            <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
            <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
            <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
          </>
        )}
        {listChapterManga &&
          listChapterManga.length > 0 &&
          listChapterManga.map((item, index) => {
            const name = item?.nameChapter?.replace(/\s+/g, "-");

            return (
              <ListGroup key={index}>
                <ListGroup.Item
                  action
                  href={`/${title}/${idManga}/${name}/${item._id}`}
                >
                  {item?.nameChapter}
                </ListGroup.Item>
              </ListGroup>
            );
          })}
      </div>
    </div>
  );
};

export default DetailManga;
