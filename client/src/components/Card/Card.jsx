import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { API } from "../../config/api";
import ModalAlert from "../../components/ModalAlert/ModalAlert";
import { Card } from "react-bootstrap";
import { TiDeleteOutline } from "react-icons/ti";

export default function CardBook(props) {
  const { book, iconDelete, tekan } = props;
  const history = useHistory();
  const [modalShow, setModalShow] = useState(false);
  const [state, dispatch] = useContext(UserContext);

  // handle Page Detail
  const handleToDetail = () => {
    state.isSubscribe ? history.push(`/detail-readbook/${book.id}`) : setModalShow(true);
  };

  const handleDeleteMyList = async () => {
    const id = book.id;
    try {
      await API.delete(`/mylist/${id}`);
      dispatch({
        type: "UPDATE",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        {iconDelete ? (
          <TiDeleteOutline size="2em" color="red" onClick={handleDeleteMyList} />
        ) : null}
      </div>
      <div onClick={() => (tekan ? handleToDetail() : history.push("/home-admin"))}>
        <Card style={{ width: "13em", border: "none", borderRadius: "12px", height: "25em" }}>
          <Card.Img
            variant="top"
            src={`http://localhost:5000/uploads/${book?.image}`}
            alt={book?.image}
            style={{ width: "100%" }}
          />
          <Card.Body>
            <Card.Title style={{ fontSize: "20px" }}>{book?.title}</Card.Title>
            <Card.Text style={{ color: "#929292", fontSize: "15px" }}>{book?.author}</Card.Text>
          </Card.Body>
        </Card>
        {/* todo transaction */}
        <ModalAlert
          show={modalShow}
          hide={() => setModalShow(false)}
          message="please make a payment to read the latest books"
          color="
          #D60000"
        />
      </div>
    </div>
  );
}
