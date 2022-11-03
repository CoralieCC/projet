import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./store/store.js";
import { Provider } from "react-redux";
import { setAuthorizationToken } from "./utils/utils.js";
import { disconnect, setCurrentUser } from "./store/authSlice";
import jwtDecode from 'jwt-decode'
import axios from "axios";

if (localStorage.getItem('token')) {
  axios({
    url: "http://localhost:8000/book",
    method: 'get',
    headers: {
      'Authorization' : 'Bearer ' +localStorage.getItem('token')
    }
  })
    .catch(err => {
      localStorage.removeItem('token')
      store.dispatch(disconnect())
    })

    setAuthorizationToken(localStorage.getItem('token'));
    store.dispatch(setCurrentUser(jwtDecode(localStorage.getItem('token'))));
  
  
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
