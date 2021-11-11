import React, { useState } from "react";
import icon from "../../assets/Icon.png";
import "./LandingPage.css";
import "bootstrap/dist/css/bootstrap.min.css";
//components
import Buttons from "../../components/Button/Buttons";
import ModalSignUp from "../../components/ModalSignUp/ModalSignUp";
import ModalSignIn from "../../components/ModalSignIn/ModalSignIn";

export default function LandingPage() {
  const [modalShow, setModalShow] = useState(false);
  const [modaSignInlShow, setModaSignInlShow] = useState(false);

  return (
    <div className="landing-page-container">
      <main>
        <div className="main">
          <img className="logo" src={icon} alt="logo" />
          <div className="submain">
            <p className="text-intro">
              Sign-up now and subscribe to enjoy all the cool and latest books - The best book
              rental service provider in Indonesia
            </p>
            <div className="button-container">
              <Buttons clicked={() => setModalShow(true)} btnName="Sign Up" color="sign-up" />
              <Buttons clicked={() => setModaSignInlShow(true)} btnName="Sign In" color="sign-in" />
            </div>
          </div>
        </div>
      </main>
      <ModalSignUp show={modalShow} hide={() => setModalShow(false)} />
      <ModalSignIn show={modaSignInlShow} hide={() => setModaSignInlShow(false)} />
    </div>
  );
}
