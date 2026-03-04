import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "primeicons/primeicons.css";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/bootstrap4-dark-blue/theme.css";
import "/node_modules/primeflex/primeflex.css";
import "primeflex/themes/primeone-dark.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PrimeReactProvider>
      <App />
    </PrimeReactProvider>
  </StrictMode>,
);

