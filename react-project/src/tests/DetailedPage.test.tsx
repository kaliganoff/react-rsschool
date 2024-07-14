import { describe, expect, it } from "vitest";
import DetailedPage from "../pages/DetailedPage/DetailedPage";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";

describe("DetailedPage", () => {
  it("renders DetailedPage", async () => {
    render(
      <MemoryRouter>
        <DetailedPage />
      </MemoryRouter>,
    );
    expect(screen.getByTestId("close-button")).toBeInTheDocument;
  });
});
