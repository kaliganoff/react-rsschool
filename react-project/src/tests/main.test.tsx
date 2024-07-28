import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "@testing-library/jest-dom";
import App from "../App";
import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import DetailedPage from "../pages/DetailedPage/DetailedPage";
import { ThemeProvider } from "../context/ThemeContext";
import { Provider } from "react-redux";
import { store } from "../store/store";

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

describe("MainPage", () => {
  it("renders MainPage", async () => {
    render(    <ThemeProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ThemeProvider>);
    expect(screen.getByTestId("header")).toBeInTheDocument;
    expect(screen.getByTestId("main")).toBeInTheDocument;
    expect(screen.getByTestId("cards-list-container")).toBeInTheDocument;
    expect(screen.getByTestId("loader")).toBeInTheDocument;
  });
});
