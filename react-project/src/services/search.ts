import { Result } from "../interfaces/interfaces";

async function search(query: URLSearchParams) {
  const response = await fetch(
    `https://swapi.dev/api/people/?search=${query.get("search") || ""}&page=${query.get("page") || "1"}`,
  );
  const result: Result = await response.json();
  return result;
}

export default search;
