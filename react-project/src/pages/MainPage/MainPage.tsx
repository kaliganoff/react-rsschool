import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Main from "../../components/Main/Main";
import search from "../../services/search";

function MainPage() {
  const [results, setResults] = useState<[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (localStorage.kaliganoffQuery) {
      search(localStorage.kaliganoffQuery).then((result: []) =>
        setResults(result)
      );
    } else {
      setIsLoading(true);
      search('').then((result: []) => {
        setResults(result);
        setIsLoading(false);
      }
      );
    }
  }, [])

  function HandleSearch(query: string) {
    setIsLoading(true);
    search(query).then((result) => {
      setResults(result); 
      setIsLoading(false);
    }
    );
    localStorage.kaliganoffQuery = query;
  }

  return (
      <>
        <Header
          onSearch={HandleSearch}
          searchValue={localStorage.kaliganoffQuery}
        ></Header>
        <Main
          results={results}
          isLoading={isLoading}
        ></Main>
      </>
    );
}

export default MainPage;
