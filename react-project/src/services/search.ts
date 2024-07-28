import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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
