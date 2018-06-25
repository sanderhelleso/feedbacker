// import materializeCSS
import "materialize-css/dist/css/materialize.min.css";

// import React, React-DOM & Redux
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";

// import App component from the App.js file
import App from "./components/App";
import reducers from "./reducers";

// starting up redux store reducer
const store = createStore(reducers, {}, applyMiddleware());

// render React App
ReactDOM.render(
    // provider inform childs that new state is available and update them
    <Provider store={store}><App /></Provider>
    , document.querySelector("#root")
);
