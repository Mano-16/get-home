import React from "react";
import "./Button.css";

const Button = (props) => {
  return (
    <button
      onClick={() => (props.onFunc ? props.onFunc() : "")}
      className="reusebtn"
      style={{
        backgroundColor: props.bgcolor,
        color: props.color,
        padding: props.p,
        display: props.d,
        marginTop: props.mt,
      }}
    >
      {props.children}
    </button>
  );
};

export default Button;
