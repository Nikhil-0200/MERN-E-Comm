import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { store } from "./store.js";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const alertOptions = {
  timeout: 5000,
  position: positions.BOTTOM_LEFT,
};

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
  <Provider store={store}>
  <AlertProvider template={AlertTemplate} {...alertOptions}>
    <App />
  </AlertProvider>
  </Provider>
  </BrowserRouter>
);
