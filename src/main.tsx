import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { store } from "State/store";
import { Provider } from "react-redux";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <StrictMode>
      <App />
    </StrictMode>
  </Provider>
);
