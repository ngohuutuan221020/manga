import * as React from "react";
import * as ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { WrapperAuthContext } from "./components/context/auth.context";

ReactDOM.createRoot(document.getElementById("root")).render(
  <WrapperAuthContext>
    <App />
  </WrapperAuthContext>
);
