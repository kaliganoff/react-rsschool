async function search(query: string) {
  const response = await fetch(`https://swapi.dev/api/people/?search=${query}`);
  const result = await response.json();
  console.log(result.results);
  return result.results;
}

export default search;
