import Header from "../../components/Header/Header";
import Main from "../../components/Main/Main";
import useLSQuery from "../../hooks/useLSQuery.ts";
import { useSearchParams } from "react-router-dom";

function MainPage() {
  const [LSQuery, setLSQuery] = useLSQuery();
  const [searchParams, setSearchParams] = useSearchParams({
    search: LSQuery,
    page: "1",
  });

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
      <Main></Main>
    </>
  );
}

export default MainPage;
