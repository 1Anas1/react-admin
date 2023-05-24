import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { DarkModeContextProvider } from "./context/darkModeContext";
import {Authprovider} from './pages/login/Context/Authprovider'
ReactDOM.render(
  <React.StrictMode>
    <Authprovider>
    <DarkModeContextProvider>
      <App />
    </DarkModeContextProvider>
    </Authprovider>
  </React.StrictMode>,
  document.getElementById("root")
);
