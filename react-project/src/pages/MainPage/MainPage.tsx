import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Main from "../../components/Main/Main";
import search from "../../services/search";
import useLSQuery from "../../hooks/useLSQuery.ts";

function MainPage() {
  const [results, setResults] = useState<[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [query, setQuery] = useLSQuery();

  useEffect(() => {
    setIsLoading(true);
    search(query).then((result) => {
      setResults(result);
      setIsLoading(false);
    });
  }, [query]);

  function HandleSearch(query: string) {
    setIsLoading(true);
    search(query).then((result) => {
      setResults(result);
      setIsLoading(false);
    });
    setQuery(query);
  }

  return (
    <>
      <Header
        onSearch={HandleSearch}
        searchValue={localStorage.kaliganoffQuery}
      ></Header>
      <Main results={results} isLoading={isLoading}></Main>
    </>
  );
}

export default MainPage;
