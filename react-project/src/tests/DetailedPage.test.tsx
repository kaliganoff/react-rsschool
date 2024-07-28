import { describe, expect, it } from "vitest";
import DetailedPage from "../pages/DetailedPage/DetailedPage";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { store } from "../store/store";

describe("DetailedPage", () => {
  it("renders DetailedPage", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <DetailedPage />
        </MemoryRouter>
      </Provider>,
    );
    expect(screen.getByTestId("loader-detailed")).toBeInTheDocument;
  });
});
