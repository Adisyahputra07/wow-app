import React, { useContext, useEffect, useState } from "react";
import HomeCss from "./Profile.module.css";
import { UserContext } from "../../context/userContext";
import { API } from "../../config/api";

// icon image
import imgDefault from "../../assets/imgDefault.png";
import mail from "../../assets/mail.svg";
import map from "../../assets/maps.svg";
import phone from "../../assets/phone.svg";
import gender1 from "../../assets/gender.svg";
import addBooks from "../../assets/addBooks.svg";

// component
import SideBar from "../../components/SideBar/SideBar";
import CardBook from "../../components/Card/Card";
import { ModalEditProfile } from "../../components/ModalEditProfile/ModalEditProfile";
import { useHistory } from "react-router-dom";

export default function Profile() {
  const history = useHistory();
  const [modalShow, setModalShow] = useState(false);
  const [state, dispatch] = useContext(UserContext);
  const [books, setBooks] = useState([]);
  const path = `http://localhost:5000/uploads/`;

  // get books
  const getBooks = async () => {
    const response = await API.get("/mylist");
    setBooks(response.data.data);
  };

  const deleteAccount = async () => {
    try {
      await API.delete("/user");

      dispatch({
        type: "LOGOUT",
      });
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBooks();
  }, [state.isUpdate]);

  return (
    <div>
      <div>
        <div className={HomeCss.homeContainer}>
          <SideBar />
          {/* Jombotron */}
          <div className={HomeCss.sideJombotron}>
            <h1>Profile</h1>
            <div className={HomeCss.jumbotron}>
              <div className={HomeCss.contactUser}>
                <div className={HomeCss.listContact}>
                  <img src={mail} alt="mail" />
                  <div className={HomeCss.iconList}>
                    <p>{state.user.email}</p>
                    <span>mail</span>
                  </div>
                </div>
                <div className={HomeCss.listContact}>
                  <img src={gender1} alt="gender" />
                  <div className={HomeCss.iconList}>
                    <p>{state.user.gender === null ? "-" : state.user.gender}</p>
                    <span>gender</span>
                  </div>
                </div>
                <div className={HomeCss.listContact}>
                  <img src={phone} alt="phone" />
                  <div className={HomeCss.iconList}>
                    <p>{state.user.phone === null ? "-" : state.user.phone}</p>
                    <span>mobile-phone</span>
                  </div>
                </div>
                <div className={HomeCss.listContact}>
                  <img src={map} alt="map" />
                  <div className={HomeCss.iconList}>
                    <p>{state.user.address === null ? "-" : state.user.address}</p>
                    <span>Address</span>
                  </div>
                </div>
              </div>

              {/* avataruser */}
              <div>
                <div className={HomeCss.avatarUser}>
                  <div>
                    <img
                      src={state.user.image ? path + state.user.image : imgDefault}
                      alt="user"
                      className={HomeCss.avatar}
                    />
                  </div>
                  <button onClick={() => setModalShow(true)} className={HomeCss.btnEdit}>
                    Edit Profile
                  </button>
                  <button onClick={deleteAccount} className={HomeCss.btn}>
                    Delete Account
                  </button>
                </div>
              </div>
            </div>

            {/* Card */}
            <div className={HomeCss.listCard}>
              <section>
                <div>
                  <div className="row mt-1">
                    <div className="col">
                      <h3 className={HomeCss.titleCard}>My List Book</h3>
                      <span className={HomeCss.lengthBooks}>{books.length}</span>
                    </div>
                  </div>
                  <div className="row">
                    {books.length === 0 ? (
                      <center>
                        <img
                          src={addBooks}
                          alt="Add List"
                          className={HomeCss.iconBook}
                          onClick={() => history.push("/home")}
                        />
                        <h3 className="mb-5">Tambahkan Daftar Buku Mu ...</h3>
                      </center>
                    ) : (
                      books.map((item) => (
                        <div class="col-3 mt-4 mb-5">
                          {<CardBook book={item.Books} iconDelete={true} click={true} />}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
      <ModalEditProfile show={modalShow} hide={() => setModalShow(false)} />
    </div>
  );
}
