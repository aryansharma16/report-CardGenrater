import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./assets/css/style.css";
import "./assets/css/root.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import GlobalKeyEvents from "./Components/GlobalKeyEvents/GlobalKeyEvents";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>

  <Provider store={store}>
    <BrowserRouter>
    <GlobalKeyEvents/>
      <App />
    </BrowserRouter>
  </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
