import { createRoot } from "react-dom/client";

// 1. Perbaikan path CSS
import "./assets/tailwind.css"; 

// 2. Perbaikan path App.jsx
import App from "./App.jsx"; 

createRoot(document.getElementById("root")).render(
    <div>
        <App />
    </div>
);
