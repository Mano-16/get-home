import "./subMain.css";
import Login from "./Components/Login/Login.jsx";
import ReactDOM from "react-dom";

import React from "react";

export const BackDrop = () => {
  return <div className="backDrop"></div>;
};
export const Modal = (props) => {
  return <div className="Modal">{props.children}</div>;
};

const portalElement = document.getElementById("suboot");

const Portal = (props) => {
  if (!props.show) return null;
  return ReactDOM.createPortal(
    <div>
      <BackDrop />
      <Modal>{props.children}</Modal>
    </div>,
    portalElement
  );
};
export default Portal;
