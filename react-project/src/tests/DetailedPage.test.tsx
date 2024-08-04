import { describe, expect, it } from "vitest";
import DetailedPage from "../components/DetailedPageComponent/DetailedPageComponent";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { http, HttpResponse, delay } from "msw";
import { setupServer } from "msw/node";

export const handlers = [
  http.get("https://swapi.dev/api/people", async () => {
    await delay(150);
    return HttpResponse.json({
      count: 1,
      next: null,
      previous: null,
      results: [
        {
          name: "C-3PO",
          height: "167",
          mass: "75",
          hair_color: "n/a",
          skin_color: "gold",
          eye_color: "yellow",
          birth_year: "112BBY",
          gender: "n/a",
          homeworld: "https://swapi.dev/api/planets/1/",
          films: [
            "https://swapi.dev/api/films/1/",
            "https://swapi.dev/api/films/2/",
            "https://swapi.dev/api/films/3/",
            "https://swapi.dev/api/films/4/",
            "https://swapi.dev/api/films/5/",
            "https://swapi.dev/api/films/6/",
          ],
          species: ["https://swapi.dev/api/species/2/"],
          vehicles: [],
          starships: [],
          created: "2014-12-10T15:10:51.357000Z",
          edited: "2014-12-20T21:17:50.309000Z",
          url: "https://swapi.dev/api/people/2/",
        },
      ],
    });
  }),
];

const server = setupServer(...handlers);

describe("DetailedPage", () => {
  it("renders DetailedPage", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter
          initialEntries={["/details/Luke%20Skywalker?search=&page=1"]}
        >
          <DetailedPage />
        </MemoryRouter>
      </Provider>,
    );
    server.listen();
    expect(screen.getByTestId("loader-detailed")).toBeInTheDocument;
    expect(screen.getByTestId("detailed-page-overlay")).toBeInTheDocument;
    await waitFor(() => {
      expect(screen.getByTestId("close-button")).toBeInTheDocument();
    });
  });
});
