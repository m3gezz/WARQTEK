import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import MainContext from "./contexts/MainContext";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@/components/custom/theme-provider";
import router from "./routes/Router";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MainContext>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
    </MainContext>
  </StrictMode>
);
