import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "normalize.css";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary.tsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from "./pages/ErrorPage/ErrorPage.tsx";
import DetailedPage from "./pages/DetailedPage/DetailedPage.tsx";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { ThemeProvider } from "./context/ThemeContext.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={
        <ErrorBoundary fallback={<p>Something went wrong...</p>}>
          <App />
        </ErrorBoundary>
      }
      errorElement={<ErrorPage />}
    >
      <Route path="details/:name" element={<DetailedPage />} />
    </Route>,
  ),
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
);
