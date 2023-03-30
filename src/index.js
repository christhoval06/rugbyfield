import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import registerServiceWorker from "./registerServiceWorker";
import Store from "./stores";


const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<App store={Store}/>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

registerServiceWorker();
