import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import { GoogleOAuthProvider } from "@react-oauth/google";

import "./index.css";

import App from "./App";
import reducers from "./reducers";

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GoogleOAuthProvider clientId={`${process.env.REACT_APP_CLIENT_ID}`}>
    <Provider store={store}>
      <App />
    </Provider>
  </GoogleOAuthProvider>
);
