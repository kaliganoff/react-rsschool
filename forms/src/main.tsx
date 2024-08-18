import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import UncontrolledPage from "./pages/UncontrolledPage/UncontrolledPage.tsx";
import ControlledPage from "./pages/ControlledPage/ControlledPage.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/" element={<App />} />,
    <Route path="uncontrolled/" element={<UncontrolledPage />} />,
    <Route path="controlled/" element={<ControlledPage />} />,
  ]),
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
