import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App.js";
import store from "./redux/store"; 

const root = document.getElementById("root");

const B = () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
};

ReactDOM.render(<B />, root); 
