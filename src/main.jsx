import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Login from "./Components/Login/Login.jsx";
import { Provider } from "react-redux";
import store from "./store/storeIndex.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
  <BrowserRouter>
    {" "}
    <App />
    {/* <Login/> */}
  </BrowserRouter>
</Provider>
);
