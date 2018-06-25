// import React
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";

// import App component from the App.js file
import App from "./components/App";

// starting up redux store
const store = createStore(() => [], {}, applyMiddleware());

// render React App
ReactDOM.render(
    // provider inform childs that new state is available and update them
    <Provider store={store}><App /></Provider>
    , document.querySelector("#root")
);
