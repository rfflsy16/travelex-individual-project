import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "toastify-js/src/toastify.css";
import "dotenv/config";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { LoadScript } from "@react-google-maps/api";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LoadScript googleMapsApiKey={process.env.GOOGLE_MAPS_API_KEY}>
      <GoogleOAuthProvider clientId={process.env.GOOGLE_OAUTH_CLIENT_ID}>
        <App />
      </GoogleOAuthProvider>
    </LoadScript>
  </StrictMode>
);
