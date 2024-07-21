import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/* async function search(query: URLSearchParams) {
  const response = await fetch(
    `https://swapi.dev/api/people/?search=${query.get("search") || ""}&page=${query.get("page") || "1"}`,
  );
  const result: Result = await response.json();
  return result;
} */

export const searchAPI = createApi({
  reducerPath: "searchAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "https://swapi.dev/api" }),
  endpoints: (build) => ({
    fetchAllPeople: build.query({
      query: (args: {
        search: string | null | undefined;
        page: string | null;
      }) => ({
        url: "/people",
        params: {
          search: args.search,
          page: args.page,
        },
      }),
    }),
  }),
});

//export default search;
