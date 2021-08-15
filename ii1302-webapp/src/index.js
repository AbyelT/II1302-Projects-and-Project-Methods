import React from "react";
import ReactDOM from "react-dom";
import thunk from "redux-thunk"
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { compose, createStore, applyMiddleware } from "redux";
import persistState from 'redux-localstorage';
import reducer from "./data/reducers/user_reducer"
import * as firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import "./index.css";

const firebaseConfig = {
    apiKey: "AIzaSyCIrpYGQLp6JVlz16ryFtmau0ajT-MqLzU",
    authDomain: "pager-project-ii1302.firebaseapp.com",
    databaseURL: "https://pager-project-ii1302.firebaseio.com",
    projectId: "pager-project-ii1302",
    storageBucket: "pager-project-ii1302.appspot.com",
    messagingSenderId: "578988167558",
    appId: "1:578988167558:web:8a0574b3e61bae0b585c07",
    measurementId: "G-LC0XFGJEYT"
};

firebase.initializeApp(firebaseConfig);

const enhancer = compose(
  applyMiddleware(thunk),
  persistState()
);

const store = createStore(reducer, enhancer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more aboutview service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
