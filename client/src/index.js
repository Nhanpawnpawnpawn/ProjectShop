import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import reportWebVitals from "./reportWebVitals";
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./App.css";
import "./index.css";

const container = document.getElementById("root");
const root = createRoot(container); // Create a root.
root.render(<App />); // Render your app.

reportWebVitals();
