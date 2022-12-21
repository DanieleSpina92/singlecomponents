import React from "react";
import ReactDOM from "react-dom/client";
import { Amplify } from "aws-amplify";
import awsconfig from "./aws-exports";
import { Provider } from "react-redux";
import store from './store/reducer'
import App from "./App";

Amplify.configure(awsconfig);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store = {store}>
        <App/>
    </Provider>
  </React.StrictMode>
);
