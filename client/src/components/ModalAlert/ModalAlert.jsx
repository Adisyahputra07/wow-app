import React from "react";
import { Modal } from "react-bootstrap";

export default function PopUpAlert(props) {
  const { show, hide, message, color } = props;

  return (
    <div>
      <Modal show={show} onHide={hide} centered>
        <div style={{ paddingLeft: "30px", paddingRight: "30px" }}>
          <p style={{ marginTop: "1em", textAlign: "center", fontSize: "20px", color: `${color}` }}>
            {message}
          </p>
        </div>
      </Modal>
    </div>
  );
}
