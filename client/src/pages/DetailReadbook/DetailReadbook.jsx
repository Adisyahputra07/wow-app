import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { API } from "../../config/api";
import SideBar from "../../components/SideBar/SideBar";
import DetailReadbookCss from "./DetailReadbook.module.css";

//icon
import iconBtnDetail1 from "../../assets/iconBtnDetail1.svg";
import iconBtnDetail2 from "../../assets/iconBtnDetail2.svg";

export default function DetailReadbook() {
  const history = useHistory();
  const { id } = useParams();
  const [book, setBook] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const check = async () => {
    try {
      const check = await API.get("/myList");
      const checkBool = check.data.data.filter((item) => {
        return item.Books?.id === +id;
      });
      checkBool.length > 0 ? setIsChecked(true) : setIsChecked(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddMyList = async () => {
    try {
      const body = {
        bookId: id,
      };
      // todo
      const res = await API.post("/myList", body);
    } catch (error) {
      console.log(error);
    }

    history.push("/profile");
  };

  // get detail books
  const getBook = async () => {
    try {
      const response = await API.get("/book/" + id);
      setBook(response.data.data.book);
    } catch (error) {
      console.log(error);
    }
  };

  // if call component
  useEffect(() => {
    getBook();
    check();
  }, []);

  return (
    <div
      className={DetailReadbookCss.sideDetailBook}
      style={{ marginLeft: "36px", marginRight: "36px", display: "flex", marginBottom: "50px" }}
    >
      <SideBar />
      <div
        calssName={DetailReadbookCss.detailContainer}
        style={{
          marginLeft: "3em",
          marginRight: "3em",
          marginTop: "3em",
        }}
      >
        <div className={DetailReadbookCss.descBook}>
          <div className={DetailReadbookCss.imgBook}>
            <img src={`http://localhost:5000/uploads/${book.image}`} alt={book.image} />
          </div>
          <div className={DetailReadbookCss.listDescBook}>
            <div className={DetailReadbookCss.listDesc}>
              <h1 className={DetailReadbookCss.title}>{book.title}</h1>
              <span>{book.author}</span>
            </div>
            <div className={DetailReadbookCss.listDesc}>
              <p>Publication date</p>
              <span>{book.publicationDate}</span>
            </div>
            <div className={DetailReadbookCss.listDesc}>
              <p>Pages</p>
              <span>{book.pages}</span>
            </div>
            <div className={DetailReadbookCss.listDesc}>
              <p className="text-danger">ISBN</p>
              <span>{book.isbn}</span>
            </div>
          </div>
        </div>
        <div className={DetailReadbookCss.aboutBook}>
          <h1>About This Book</h1>
          <div className="textBook">
            <p>{book.about}</p>
          </div>
        </div>

        <div className={DetailReadbookCss.btns}>
          {isChecked ? null : (
            <div
              onClick={handleAddMyList}
              className="btn p-2 d-flex justify-content-evenly"
              style={{
                border: "2px solid #d60000",
                backgroundColor: "#d60000",
                color: "white",
                borderRadius: "5px",
                width: "162px",
                height: "50px",
                marginBottom: "20px",
                marginRight: "20px",
              }}
            >
              <center>Add My List </center>
              <img src={iconBtnDetail2} alt="add" width="15px" />
            </div>
          )}

          <div
            onClick={() => history.push("/readbook/" + id)}
            className="btn p-2 d-flex justify-content-evenly"
            style={{
              border: "2px solid #CDCDCD",
              backgroundColor: "#CDCDCD",
              color: "black",
              borderRadius: "5px",
              width: "150px",
              height: "50px",
            }}
          >
            <center>Read Book</center>
            <img src={iconBtnDetail1} alt="add" width="15px" />
          </div>
        </div>
      </div>
    </div>
  );
}
