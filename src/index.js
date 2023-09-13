import { createRoot } from "react-dom/client";
import AppHeader from "./components/AppHeader";
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
  <AppHeader />
);
