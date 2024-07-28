import Header from "../../components/Header/Header";
import Main from "../../components/Main/Main";
import { useAppDispatch } from "../../hooks/redux.ts";
import useLSQuery from "../../hooks/useLSQuery.ts";
import { useSearchParams } from "react-router-dom";
import { SelectedItemsSlice } from "../../store/reducers/SelectedItemsSlice.ts";

function MainPage() {
  const [LSQuery, setLSQuery] = useLSQuery();
  const [searchParams, setSearchParams] = useSearchParams({
    search: LSQuery,
    page: "1",
  });
  const dispatch = useAppDispatch();
  const { delAll } = SelectedItemsSlice.actions;

  function HandleSearch(query: string) {
    setSearchParams({ search: query, page: "1" });
    setLSQuery(query);
    dispatch(delAll());
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
