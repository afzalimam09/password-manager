import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AccountProvider from "./context/AccountProvider";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <AccountProvider>
        <App />
    </AccountProvider>
);
