import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import { UserContext } from "../../context/userContext";
import { API, auth } from "../../config/api";
// components
import icon from "../../assets/UploadIcon2.svg";
import { Modal, Form, Button } from "react-bootstrap";

export const ModalEditProfile = (props) => {
  const history = useHistory();
  const [state, dipatch] = useContext(UserContext);
  const id = state.user.id;
  const [preview, setPreview] = useState("");
  const { show, hide } = props;
  const [item, setItems] = useState({
    fullName: "",
    email: "",
    gender: "",
    phone: "",
    address: "",
    image: null,
    roleId: state.user.roleId,
  });

  const handleOnChanges = (e) => {
    setItems({
      ...item,
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
      formData.set("fullName", item.fullName);
      formData.set("email", item.email);
      formData.set("gender", item.gender);
      formData.set("phone", item.phone);
      formData.set("address", item.address);
      formData.set("image", item.image[0]);

      const res = await API.patch("/profile/" + id, formData, config);

      history.push("/home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Modal
        show={show}
        onHide={hide}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        dialogClassName="modalSignUp"
      >
        <Modal.Body className="formContainer ">
          <div className="form-header mb-4">
            <h2>Edit Your Profile</h2>
          </div>
          <div className="form-body">
            <Form onSubmit={handleSubmit}>
              <Form.Control
                name="fullName"
                size="lg"
                type="text"
                placeholder="name"
                onChange={(e) => handleOnChanges(e)}
              />
              <br />
              <Form.Control
                name="email"
                size="lg"
                type="email"
                placeholder="email"
                onChange={(e) => handleOnChanges(e)}
              />
              <br />
              <Form.Control
                name="gender"
                size="lg"
                type="text"
                placeholder="gender"
                onChange={(e) => handleOnChanges(e)}
              />
              <br />
              <Form.Control
                name="phone"
                size="lg"
                type="number"
                placeholder="phone"
                onChange={(e) => handleOnChanges(e)}
              />
              <br />
              <Form.Group className="mb-4">
                <Form.Control
                  placeholder="address"
                  as="textarea"
                  rows={5}
                  style={{ border: "2px solid #c7c7c7", backgroundColor: "#e5e5e5" }}
                  name="address"
                  onChange={(e) => handleOnChanges(e)}
                />
              </Form.Group>
              {preview && (
                <div>
                  <img
                    src={preview}
                    style={{
                      maxWidth: "130px",
                      maxHeight: "130px",
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
                    <>Photo Profile</>
                    <img src={icon} alt="upload" width="15px" style={{ marginLeft: "7px" }} />
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
              <Button type="submit" className="btn-signUp mt-1 mb-4">
                Save
              </Button>
            </Form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};
