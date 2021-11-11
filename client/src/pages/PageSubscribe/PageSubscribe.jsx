import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext";
import "./PageSubscribe.css";
import "bootstrap/dist/css/bootstrap.min.css";
// icon
import UploadIcon from "../../assets/UploadIcon.svg";
import wow from "../../assets/wow.png";
import pandingIcon from "../../assets/panding-icon.svg";
import approveIcon from "../../assets/reading.svg";

//Components
import SideBar from "../../components/SideBar/SideBar";
import { Button, Form } from "react-bootstrap";
import ModalAlert from "../../components/ModalAlert/ModalAlert";
import { API } from "../../config/api";
import Loading from "../Loading/Loading";

export default function PageSubscribe() {
  const [state, dispatch] = useContext(UserContext);
  const [modalShow, setModalShow] = useState(false);
  const [subscribe, setSubscribe] = useState(false);
  const [transaction, setTransaction] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const id = state.user.id;

  const [item, setitem] = useState({
    transferProof: null,
  });

  // Get Status Transaction
  const getTransaction = async () => {
    try {
      setIsLoading(true);
      const response = await API.get("/transaction/" + id);
      const data = response.data.data;
      setTransaction(data);

      console.log(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

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

  const handleSubscribe = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("image", item.image[0]);

    try {
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const res = await API.post("/transaction", formData, config);
      dispatch({
        type: "UPDATE",
      });
      dispatch({
        type: "SUBSCRIBE",
        payload: false,
      });
      setModalShow(true);
      setSubscribe(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTransaction();
  }, [state.isUpdate]);

  if (isLoading) return <Loading />;
  return (
    <div>
      <div style={{ marginLeft: "36px", marginRight: "36px", display: "flex" }}>
        <SideBar />
        {transaction.length < 1 && (
          <div className="form-container" style={{ margin: "210px auto" }}>
            <div className="form-header" style={{ textAlign: "center" }}>
              <h1>Premium</h1>
              <span>Pay now and access all the latest books from </span>
              <img src={wow} alt="icon" />
            </div>
            <div className="form-id" style={{ textAlign: "center", marginTop: "30px" }}>
              <img src={wow} alt="icon" />
              <b>: {state.user.accountNumber}</b>
            </div>
            <div style={{ marginTop: "20px", padding: "20px" }}>
              <Form onSubmit={handleSubscribe}>
                <Form.Group className="mb-4" controlId="ControlInput3">
                  <Form.Control
                    // required
                    type="number"
                    value={state.user.accountNumber}
                    placeholder="Input your account number"
                    name="accountNumber"
                    className="form-dominant color-dominant"
                    style={{ backgroundColor: "#E5E5E5", border: "1px solid #BCBCBC" }}
                  />
                </Form.Group>

                <Form.Group>
                  <div
                    className="form-dominant color-dominant uploadForm mb-5"
                    style={{ border: "1px solid #BCBCBC", color: "#D60000" }}
                  >
                    <label htmlFor="upload" className="d-flex justify-content-between">
                      <>Attache proof of transfer</>
                      <img src={UploadIcon} alt="upload" width="15px" />
                    </label>
                    <input
                      required
                      type="file"
                      hidden
                      id="upload"
                      name="image"
                      onChange={handleOnChanges}
                    />
                  </div>
                </Form.Group>
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
                {/* button */}
                <center>
                  <Button
                    type="submit"
                    className="button-dominant mt-3"
                    type="submit"
                    style={{ backgroundColor: "#D60000", border: "1px solid #D60000" }}
                  >
                    Send
                  </Button>
                </center>
              </Form>
            </div>
          </div>
        )}
        {(transaction.length > 0 && transaction[0]?.paymentStatus === "panding") ||
        transaction[0]?.paymentStatus === "Cancel" ? (
          <div className="form-container" style={{ margin: "210px auto" }}>
            <div className="form-header" style={{ textAlign: "center" }}>
              <img
                src={pandingIcon}
                alt="pandingIcon"
                style={{
                  width: "20em",
                  height: "20em",
                }}
              />
              {transaction[0]?.paymentStatus === "panding" && <h4>Tunggu Proses Konfirmasi...</h4>}
              {transaction[0]?.paymentStatus === "Cancel" && (
                <h4>Maaf Transaksi Anda Ditolak...</h4>
              )}
            </div>
          </div>
        ) : (
          transaction[0]?.paymentStatus === "Approve" && (
            <div className="form-container" style={{ margin: "210px auto" }}>
              <div className="form-header" style={{ textAlign: "center" }}>
                <img
                  src={approveIcon}
                  alt="readingcon"
                  style={{
                    width: "20em",
                    height: "20em",
                  }}
                />
                <h4>Anda Telah Berlangganan di Window Of World...</h4>
              </div>
            </div>
          )
        )}
      </div>
      <ModalAlert
        show={modalShow}
        hide={() => setModalShow(false)}
        message="Thank you for subscribing to premium, your premium package will be active after our admin approves your transaction, thank you"
        color="
        #29BD11"
      />
    </div>
  );
}
