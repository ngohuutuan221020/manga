import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import Image from "react-bootstrap/Image";
import imageCompression from "browser-image-compression";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";
import { Empty } from "antd";
import Table from "react-bootstrap/Table";
import {
  createNewManga,
  deleteManga,
  getAllManga,
  getChapterByIdManga,
} from "../../utils/manageAPI";
import { message } from "antd";
import Accordion from "react-bootstrap/Accordion";
import Figure from "react-bootstrap/Figure";
import { addChapterById } from "../../utils/manageAPI";
import LoadingBar from "react-top-loading-bar";

const Manage = () => {
  const [formData, setFormData] = useState({
    title: "",
    introduction: "",
    author: "",
    genre: "",
    status: "Đang tiến hành",
    coverImage: null,
  });
  const [progress, setProgress] = useState(0);
  const [base64Images, setBase64Images] = useState([]);
  const [nameChapter, setNameChapter] = useState("");
  const [loading, setLoading] = useState(false);
  const [compressedImage, setCompressedImage] = useState(null);
  const [listManga, setListManga] = useState([]);
  const [listChapterManga, setListChapterManga] = useState([]);

  function titleChapter(e) {
    setNameChapter(e.target.value);
  }

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
  async function getListChapterMangaById(id) {
    try {
      const res = await getChapterByIdManga(id);
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
  useEffect(() => {
    getListManga();
  }, []);

  const handleChange = async (e) => {
    const { name, value, files } = e.target;
    if (name === "coverImage" && files.length > 0) {
      setLoading(true);
      const file = files[0];
      const options = {
        maxSizeMB: 1,
        useWebWorker: true,
      };
      try {
        const compressedFile = await imageCompression(file, options);

        const reader = new FileReader();
        reader.readAsDataURL(compressedFile);
        reader.onloadend = () => {
          const base64data = reader.result;
          setFormData((prevData) => ({
            ...prevData,
            coverImage: base64data,
          }));
          setCompressedImage(base64data);
          setLoading(false);
        };
      } catch (error) {
        console.error("Error while compressing image:", error);
        setLoading(false);
      }
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await createNewManga(formData);
      if (response.EC === 0) {
        message.success(response.EM);
        setNameChapter("");
        setBase64Images([]);
      }
      if (response.EC === 1) {
        message.warning(response.EM);
      }
    } catch (error) {
      console.error("Error creating manga: ", error?.response?.data?.EM);
    } finally {
      setLoading(false);
      getListManga();
    }
  };

  const handleFileChange = async (event) => {
    setLoading(true);
    setProgress(10);
    const files = Array.from(event.target.files);
    setProgress(30);
    const compressedFiles = await Promise.all(
      files.map(async (file) => {
        const options = {
          maxSizeMB: 1,
          useWebWorker: true,
        };
        try {
          const compressedFile = await imageCompression(file, options);

          const reader = new FileReader();
          return new Promise((resolve, reject) => {
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(compressedFile);
          });
        } catch (error) {
          console.error("Error while compressing image:", error);
        }
      })
    );
    setProgress(60);
    setBase64Images((prevBase64Images) => [
      ...prevBase64Images,
      ...compressedFiles,
    ]);
    setProgress(100);
    setLoading(false);
  };

  async function handleAddChapter(chapterId) {
    setLoading(true);
    try {
      const data = {
        title: nameChapter,
        images: base64Images,
      };

      const response = await addChapterById(chapterId, data);
      if (response.EC === 0) {
        message.success(response.EM);
        setNameChapter("");
        setBase64Images([]);
      }
      if (response.EC === 1) {
        message.warning(response.EM);
      }
    } catch (error) {
      console.error("Error creating manga: ", error);
    } finally {
      setLoading(false);
    }
  }
  async function deleteMangaId(id) {
    setLoading(true);
    try {
      const response = await deleteManga(id);
      if (response.EC === 0) {
        message.success(response.EM);
        getListManga();
      }
      if (response.EC === 1) {
        message.warning(response.EM);
      }
    } catch (error) {
      message.error(error.response.data.EM);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div
      style={{
        marginBottom: "2rem",
      }}
    >
      <LoadingBar
        color="#f11946"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <Tabs
        defaultActiveKey="list-manga"
        id="uncontrolled-tab-example"
        className="mb-3"
        style={{
          justifyContent: "center",
          borderRadius: "25px",
          boxShadow: "1px rgba(0,0,0,0.2)",
          padding: "1rem",
        }}
      >
        <Tab eventKey="list-manga" title="List Manga">
          <Container>
            {listManga && listManga.length > 0 ? (
              <div
                className="ImageList"
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "1rem",
                  flexDirection: "row",
                }}
              >
                {listManga.map((item) => (
                  <ImageListItem
                    className="ImageListItem"
                    key={item._id}
                    style={{ height: "300px", width: "250px" }}
                  >
                    <img
                      src={item.AvtTruyen}
                      alt={item.TenTruyen}
                      width="100%"
                      height="100%"
                      loading="lazy"
                    />
                    <ImageListItemBar
                      title={item.TenTruyen}
                      subtitle={item.TacGia}
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
                ))}
              </div>
            ) : (
              <Empty />
            )}
          </Container>
        </Tab>
        <Tab eventKey="create" title="Create">
          <Form
            onSubmit={handleSubmit}
            style={{
              borderRadius: "25px",
              boxShadow: "0 0 10px rgba(0,0,0,0.2)",
              maxWidth: "90%",
              margin: "1rem auto",
              padding: "2rem",
              backgroundColor: "#fafafa",
            }}
          >
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Tên Truyện</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Giới thiệu</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="introduction"
                  value={formData.introduction}
                  onChange={handleChange}
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Tác giả</Form.Label>
                <Form.Control
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Thể loại</Form.Label>
                <Form.Control
                  type="text"
                  name="genre"
                  value={formData.genre}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Trạng thái</Form.Label>
                <Form.Select
                  aria-label="STATUS"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="Đang tiến hành">Đang tiến hành</option>
                  <option value="Hoàn thành">Hoàn thành</option>
                  <option value="Đã bỏ">Đã bỏ</option>
                </Form.Select>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Ảnh bìa</Form.Label>
                <Form.Control
                  required
                  type="file"
                  accept="image/*"
                  name="coverImage"
                  onChange={handleChange}
                />
              </Form.Group>
              <Col xs={4} md={2}>
                {compressedImage && <Image src={compressedImage} thumbnail />}
              </Col>
            </Row>
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : (
                "Upload"
              )}
            </Button>
          </Form>
          <Container>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#ID</th>
                  <th>Tên truyện</th>
                  <th>Tác giả</th>
                  <th>Trạng thái</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {listManga &&
                  listManga.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{item._id}</td>
                        <td>{item.TenTruyen}</td>
                        <td>{item.TacGia}</td>

                        <td>{item.TrangThai}</td>
                        <td>
                          <Button
                            className="mx-2"
                            onClick={() => deleteMangaId(item._id)}
                          >
                            Xóa
                          </Button>
                          <Button className="mx-2">Sửa</Button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          </Container>
        </Tab>
        <Tab eventKey="add-chapter" title="Add Chapter">
          {listManga &&
            listManga.length > 0 &&
            listManga.map((item, index) => {
              return (
                <Container key={index}>
                  <Accordion
                    onClick={() => getListChapterMangaById(item._id)}
                    style={{
                      marginBottom: "1rem",
                    }}
                  >
                    <Accordion.Item eventKey={index}>
                      <Accordion.Header>
                        <Figure.Image
                          width={50}
                          height={50}
                          alt="50x50"
                          src={item.AvtTruyen}
                          style={{
                            marginRight: "1rem",
                          }}
                        />
                        {item.TenTruyen}
                      </Accordion.Header>
                      <Accordion.Body>
                        <Form.Group as={Col} className="mb-3">
                          <Form.Label>Tên chương</Form.Label>
                          <Form.Control
                            type="text"
                            name="title"
                            onChange={titleChapter}
                            value={nameChapter}
                            required
                          />
                        </Form.Group>

                        <Form.Group
                          controlId="formFileMultiple"
                          className="mb-3"
                        >
                          <Form.Control
                            accept="image/*"
                            type="file"
                            name="imageChapter"
                            onChange={handleFileChange}
                            multiple
                          />
                        </Form.Group>

                        <Button
                          onClick={() => handleAddChapter(item._id)}
                          variant="primary"
                          disabled={loading}
                          className="mb-3"
                          style={{
                            marginLeft: "1rem",
                          }}
                        >
                          {loading ? (
                            <Spinner
                              as="span"
                              animation="border"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                            />
                          ) : (
                            "Upload"
                          )}
                        </Button>
                        {listChapterManga &&
                          listChapterManga.length > 0 &&
                          listChapterManga.map((item, index) => {
                            return (
                              <ListGroup as="ol" numbered key={index}>
                                <ListGroup.Item
                                  as="li"
                                  className="d-flex justify-content-between align-items-start"
                                >
                                  <div className="ms-2 me-auto">
                                    <div className="fw-bold">{item.title}</div>
                                    ID Manga {item.idManga}
                                  </div>
                                  <Badge bg="primary" pill>
                                    {item.images.length}
                                  </Badge>
                                </ListGroup.Item>
                              </ListGroup>
                            );
                          })}
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </Container>
              );
            })}
        </Tab>
      </Tabs>
    </div>
  );
};

export default Manage;
