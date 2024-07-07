interface Result {
  results: [];
}

async function search(query: string) {
  const response = await fetch(`https://swapi.dev/api/people/?search=${query}`);
  const result: Result = await response.json();
  return result.results;
}

export default search;
