import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../src/store/store.js";
import { StyleProvider } from "@ant-design/cssinjs";
import { ConfigProvider } from "antd";
import "@ant-design/v5-patch-for-react-19";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <StyleProvider layer>
        <ConfigProvider>
          <Provider store={store}>
            <App />
          </Provider>
        </ConfigProvider>
      </StyleProvider>
    </BrowserRouter>
  </StrictMode>
);
