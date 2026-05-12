import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { ErrorBoundary } from "./components/ErrorBoundary/index.tsx";
import { App } from "./index.tsx";

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </StrictMode>,
  );
}
