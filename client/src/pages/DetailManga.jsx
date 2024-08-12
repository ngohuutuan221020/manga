import React from "react";
import { useParams } from "react-router-dom";
import { getDetailMangaById } from "../utils/manageAPI";
import { message } from "antd";
import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ImageGithub from "../assets/github.webp";
import Skeleton from "@mui/material/Skeleton";

const DetailManga = () => {
  const { title, idManga } = useParams();
  const [listManga, setListManga] = React.useState([]);
  console.log("🚀 ~ DetailManga ~ listManga:", listManga);
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
          {listManga?.AvtTruyen ? (
            <Image
              src={listManga?.AvtTruyen}
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
            gap: "1rem 0",
          }}
        >
          {listManga && listManga.AvtTruyen ? (
            <>
              <Card.Title>{listManga?.TenTruyen}</Card.Title>
              <Card.Text>Giới thiệu: {listManga?.GioiThieuTruyen}</Card.Text>
              <Card.Text>Tác giả: {listManga?.TacGia}</Card.Text>
              <Card.Text>Thể loại: {listManga?.TheLoai}</Card.Text>
              <Card.Text>
                Trạng thái:{" "}
                <a
                  style={
                    listManga?.TrangThai === "Đang tiến hành"
                      ? { color: "red", textTransform: "uppercase" }
                      : { color: "green", textTransform: "uppercase" }
                  }
                >
                  {listManga?.TrangThai}
                </a>
              </Card.Text>
            </>
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
            <Skeleton variant="text" sx={{ fontSize: "3rem" }} />
            <Skeleton variant="text" sx={{ fontSize: "3rem" }} />
            <Skeleton variant="text" sx={{ fontSize: "3rem" }} />
          </>
        )}
        {listChapterManga &&
          listChapterManga.length > 0 &&
          listChapterManga.map((item, index) => {
            const nameChapter = item.title.replace(/\s+/g, "-");
            return (
              <ListGroup key={index}>
                <ListGroup.Item
                  action
                  href={`/${title}/${idManga}/${nameChapter}/${item._id}`}
                >
                  {item.title}
                </ListGroup.Item>
              </ListGroup>
            );
          })}
      </div>
    </div>
  );
};

export default DetailManga;
