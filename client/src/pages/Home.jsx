import React, { useEffect, useState } from "react";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { getAllManga } from "../utils/manageAPI";
import { message } from "antd";
import ImageListItem from "@mui/material/ImageListItem";
import IconButton from "@mui/material/IconButton";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import Container from "@mui/material/Container";
import { Empty } from "antd";
import Skeleton from "../components/Skeleton";
const Home = () => {
  const [listManga, setListManga] = useState([]);
  function handleDetailChapter(name, id) {
    const formattedName = name.replace(/\s+/g, "-");
    window.location.href = `${formattedName}/${id}`;
  }
  useEffect(() => {
    async function getListManga() {
      try {
        const res = await getAllManga();

        if (!res) return message.error(res.EM);
        if (res && res.EC === 0) {
          setListManga(res.DATA);
        }
        if (res && res.EC === 1) {
          message.warning(res.EM);
        }
      } catch (error) {
        message.error(error);
      }
    }
    getListManga();
  }, []);

  return (
    <Container>
      <h3
        style={{
          fontWeight: "bold",
          margin: "2rem 0",
          textTransform: "uppercase",
          letterSpacing: "0.1rem",
        }}
      >
        Top HOT Manga
      </h3>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          flexDirection: "row",
          padding: "2rem",
          marginTop: "1rem ",
          backgroundColor: "rgba(0, 0, 0, 0.05)",
          borderRadius: "2rem",
        }}
      >
        {listManga && listManga.length > 0 ? (
          <>
            {listManga.map((item) => {
              return (
                <ImageListItem
                  className="transition-transform duration-300 hover:scale-110"
                  key={item._id}
                  style={{
                    height: "300px",
                    width: "250px",
                    cursor: "pointer",
                    translate: "",
                  }}
                  onClick={() => handleDetailChapter(item.TenTruyen, item._id)}
                >
                  <img
                    style={{
                      borderRadius: "1rem",
                    }}
                    src={item.AvtTruyen}
                    alt={item.TenTruyen}
                    width="100%"
                    height="100%"
                    loading="lazy"
                  />
                  <ImageListItemBar
                    title={item.TenTruyen}
                    subtitle={item.TacGia}
                    style={{
                      borderRadius: "0 0 1rem 1rem",
                    }}
                    actionIcon={
                      <IconButton
                        sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                        aria-label={`info about ${item.TenTruyen}`}
                      >
                        <WhatshotIcon
                          style={{
                            color: "red",
                          }}
                        />
                      </IconButton>
                    }
                  />
                </ImageListItem>
              );
            })}
          </>
        ) : (
          <div style={{ margin: "0 auto" }}>
            <Skeleton />
          </div>
        )}
      </div>
    </Container>
  );
};

export default Home;
