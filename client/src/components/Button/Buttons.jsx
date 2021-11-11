import React from "react";
import "./Buttons.css";

export default function Buttons(props) {
  const { color, btnName, clicked } = props;
  return (
    <div>
      <button onClick={clicked} className={"btn " + color}>
        {btnName}
      </button>
    </div>
  );
}
