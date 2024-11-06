import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

export function render(element: HTMLElement) {
  createRoot(element).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
