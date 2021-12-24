import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { UserContext } from "../../context/userContext";
import { API } from "../../config/api";

import imgDefault from "../../assets/imgDefault.png";
import iconJumbotron from "../../assets/Icon-jumbotron.png";
import user1 from "../../assets/user1.png";
import bill1 from "../../assets/bill1.png";
import logout1 from "../../assets/logout1.png";
import iconChats from "../../assets/chat.png";
import HomeCss from "./SideBar.module.css";
import ModalValidasi from "../ModalValidasi/ModalValidasi";
import Loading from "../../pages/Loading/Loading";

export default function SideBar(props) {
  const [state, dispatch] = useContext(UserContext);
  const path = `http://localhost:5000/uploads/`;
  const [modalShow, setModalShow] = useState(false);
  const history = useHistory();
  console.log(state);
  const id = state.user.id;
  const [isLoading, setIsLoading] = useState(false);

  const getTransaction = async () => {
    try {
      setIsLoading(true);
      const response = await API.get("/transaction/" + id);
      const data = response?.data.data;
      if (data.length > 0) {
        if (data[0].paymentStatus === "panding" || data[0].paymentStatus === "Cancel")
          dispatch({
            type: "SUBSCRIBE",
            payload: false,
          });
        else {
          dispatch({
            type: "SUBSCRIBE",
            payload: true,
          });
        }
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  console.log("ini subscribe", state);

  const handleSubscribe = () => {
    history.push("/subscribe");
  };

  useEffect(() => {
    getTransaction();
  }, [state.isUpdate]);

  if (isLoading) return <Loading />;
  return (
    <div>
      <div className={HomeCss.sideBar}>
        <div className={HomeCss.sideBar1}>
          <div className={HomeCss.iconSideBar}>
            <div onClick={() => history.push("/home")} className="logoIcon">
              <img src={iconJumbotron} alt="icon-jumbotron" />
            </div>
            <div onClick={() => history.push("/profile")} className={HomeCss.cursor}>
              <img
                src={state.user.image ? path + state.user.image : imgDefault}
                alt="user"
                className={HomeCss.avatar}
              />
            </div>
          </div>
          {/* Profile */}
          <div className={HomeCss.titleSideBar}>
            <h1 className={HomeCss.cursor}>{state.user.fullName}</h1>
            {state.isSubscribe ? (
              <span className="text-success fw-bold fs-6 btn">Subscribed</span>
            ) : (
              <span className="text-danger fw-bold fs-6 btn">Not Subscribed Yet</span>
            )}
          </div>
        </div>
        <div className={HomeCss.navGroupSideBar}>
          {/* todo Onclick */}
          <div onClick={() => history.push("/profile")} className={HomeCss.navLinkSideBar}>
            <img src={user1} alt="user1" />
            <span className={HomeCss.cursor}>Profile</span>
          </div>
          <div onClick={() => history.push("/subscribe")} className={HomeCss.navLinkSideBar}>
            <img src={bill1} alt="bill1" />
            <span className={HomeCss.cursor}>Subscribe</span>
          </div>
          <div onClick={() => history.push("/chats")} className={HomeCss.navLinkSideBar}>
            <img heigh="28px" width="28px" src={iconChats} alt="bill1" />
            <span className={HomeCss.cursor}>Chats</span>
          </div>
        </div>
        <div className={HomeCss.navLogoutSideBar}>
          <div onClick={() => setModalShow(true)} className={HomeCss.navLinkSideBar}>
            <img src={logout1} alt="logout1" />
            <span className={HomeCss.cursor}>Logout</span>
          </div>
        </div>
      </div>
      <ModalValidasi show={modalShow} hide={() => setModalShow(false)} />
    </div>
  );
}
