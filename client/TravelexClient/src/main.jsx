import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import store from "./redux/store";
import "toastify-js/src/toastify.css";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import { LoadScript } from "@react-google-maps/api";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <LoadScript googleMapsApiKey="AIzaSyBl12-VCiWi3n1L5Z4QVG6O_oSVYfLMMLg">
        <GoogleOAuthProvider clientId="655305925462-kkfikft9h1abmfecrucs21qtqlcovmq1.apps.googleusercontent.com">
          <App />
        </GoogleOAuthProvider>
      </LoadScript>
    </Provider>
  </StrictMode>
);
