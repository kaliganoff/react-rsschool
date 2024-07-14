import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Main from "../../components/Main/Main";
import search from "../../services/search";
import useLSQuery from "../../hooks/useLSQuery.ts";
import { Result } from "../../interfaces/interfaces.ts";
import { useSearchParams } from "react-router-dom";

function MainPage() {
  const [results, setResults] = useState<Result>({ results: [], count: 0 });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [LSQuery, setLSQuery] = useLSQuery();
  const [searchParams, setSearchParams] = useSearchParams({
    search: LSQuery,
    page: "1",
  });

  useEffect(() => {
    setIsLoading(true);
    search(searchParams).then((result) => {
      setResults(result);
      setIsLoading(false);
    });
  }, [searchParams]);

  function HandleSearch(query: string) {
    setSearchParams({ search: query, page: "1" });
    setLSQuery(query);
  }

  return (
    <>
      <Header
        onSearch={HandleSearch}
        searchValue={searchParams.get("search") || ""}
      ></Header>
      <Main results={results} isLoading={isLoading}></Main>
    </>
  );
}

export default MainPage;
