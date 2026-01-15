import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// Step 01: First to hume chahiye Provider, jo ki react-redux se mil jaayega
import { Provider } from "react-redux";
// Step 02: Store chahiye, app/store.js file me already export kiya hu, to import krne se yaha mil jaayega
import { store } from "./app/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  // Step 03: Provider, Store dono aa gaya hai, Ab issko use kaise krenge?

  // 01- Provider se wrap kr diya hu <App /> ko
  // 02- Ab Provider ko value chahiye (context-Api me dekha tha maine)
  // yaha hum value nahi bolte, yaha hum bolte hai
  // Provider ko store chahiye as props
  // Store = {store} value pass kr diya hu as props
  //Bas itna hi kaam tha, END !!
  <Provider store={store}>
    <App />
  </Provider>
);
