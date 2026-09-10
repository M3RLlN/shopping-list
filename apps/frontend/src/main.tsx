import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "@fontsource-variable/caveat/wght.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

import { httpItemRepository } from "./repositories/HttpItemRepository.ts";
httpItemRepository.findAll().then(console.log);
