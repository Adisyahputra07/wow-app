import React, { useState, useContext } from "react";
import { UserContext } from "../../context/userContext";
import { useHistory } from "react-router";
import { API } from "../../config/api";
// component
import NavbarPages from "../../components/NavbarPages/NavbarPages";
import { Form, Container, Button } from "react-bootstrap";
import UploadIcon2 from "../../assets/UploadIcon2.svg";
import iconAddBook from "../../assets/iconAddBook.svg";

export default function AddBook() {
  const history = useHistory();
  const [state, dispatch] = useContext(UserContext);
  const [preview, setPreview] = useState(null);
  const [item, setitem] = useState({
    title: "",
    publicationDate: "",
    pages: "",
    author: "",
    isbn: "",
    about: "",
    bookFile: null,
    image: null,
    roleId: state.user.roleId,
  });

  const handleOnChanges = (e) => {
    setitem({
      ...item,
      // handle file
      [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
    });

    if (e.target.name === "image") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const formData = new FormData();
      formData.set("title", item.title);
      formData.set("publicationDate", item.publicationDate);
      formData.set("pages", item.pages);
      formData.set("author", item.author);
      formData.set("isbn", item.isbn);
      formData.set("about", item.about);
      formData.set("bookFile", item.bookFile[0]);
      formData.set("image", item.image[0]);

      const response = await API.post("/book", formData, config);

      history.push("/income-transaction");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <NavbarPages />
      <Container className="mt-3">
        <h1 className="mb-5">Add Book</h1>
        <div>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-4">
              <Form.Control
                size="lg"
                type="text"
                placeholder="title"
                name="title"
                onChange={handleOnChanges}
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Control
                size="lg"
                type="text"
                placeholder="Publication Date"
                name="publicationDate"
                onChange={handleOnChanges}
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Control
                size="lg"
                type="text"
                placeholder="Pages"
                name="pages"
                onChange={handleOnChanges}
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Control
                size="lg"
                type="text"
                placeholder="Author"
                name="author"
                onChange={handleOnChanges}
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Control
                size="lg"
                type="text"
                placeholder="ISBN"
                name="isbn"
                onChange={handleOnChanges}
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Control
                placeholder="About This Book"
                as="textarea"
                rows={5}
                style={{ border: "2px solid #c7c7c7", backgroundColor: "#e5e5e5" }}
                name="about"
                onChange={handleOnChanges}
              />
            </Form.Group>

            <div className="d-flex justify-content-between">
              <div>
                <Form.Group className="mb-3" style={{ width: "180px" }}>
                  <div
                    className=" uploadForm  d-flex justify-content-between"
                    style={{ border: "2px solid #c7c7c7", backgroundColor: "#e5e5e5" }}
                  >
                    <label htmlFor="upload1" className=" d-flex justify-content-between">
                      <>{item.bookFile ? item.bookFile[0].name : "Attache Book File"}</>
                      <img
                        src={UploadIcon2}
                        alt="upload"
                        width="15px"
                        style={{ marginLeft: "7px" }}
                      />
                    </label>
                    <input
                      required
                      type="file"
                      hidden
                      id="upload1"
                      name="bookFile"
                      style={{ color: "#e5e5e5" }}
                      onChange={handleOnChanges}
                    />
                  </div>
                </Form.Group>
                {/* upload file */}
                {preview && (
                  <div>
                    <img
                      src={preview}
                      style={{
                        maxWidth: "150px",
                        maxHeight: "150px",
                        objectFit: "cover",
                      }}
                      alt="preview"
                    />
                  </div>
                )}

                <Form.Group className="mb-4" style={{ width: "180px" }}>
                  <div
                    className=" uploadForm  d-flex justify-content-between"
                    style={{ border: "2px solid #c7c7c7", backgroundColor: "#e5e5e5" }}
                  >
                    <label htmlFor="upload" className=" d-flex justify-content-between">
                      <>Book Cover</>
                      <img
                        src={UploadIcon2}
                        alt="upload"
                        width="15px"
                        style={{ marginLeft: "7px" }}
                      />
                    </label>
                    <input
                      required
                      type="file"
                      hidden
                      id="upload"
                      name="image"
                      style={{ color: "#e5e5e5" }}
                      onChange={handleOnChanges}
                    />
                  </div>
                </Form.Group>
              </div>
              <Form.Group className="mb-4 mt-5 btn" style={{ width: "150px" }}>
                <button type="submit" className="btn" style={{ backgroundColor: "#d60000" }}>
                  <div
                    className=" d-flex justify-content-between"
                    style={{
                      border: "2px solid #d60000",
                      backgroundColor: "#d60000",
                      color: "white",
                      borderRadius: "5px",
                    }}
                  >
                    <center>Add Book</center>
                    <img src={iconAddBook} alt="add" width="20px" />
                  </div>
                </button>
              </Form.Group>
            </div>
          </Form>
        </div>
      </Container>
    </div>
  );
}
