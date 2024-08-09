import Header from "../Header/Header";
import Main from "../Main/Main";
import { useAppDispatch } from "../../hooks/redux";
import useLSQuery from "../../hooks/useLSQuery";
import { usePathname, useSearchParams } from "next/navigation";
import { SelectedItemsSlice } from "../../store/reducers/SelectedItemsSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function MainPage() {
  const [LSQuery, setLSQuery] = useLSQuery();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const { delAll } = SelectedItemsSlice.actions;

  useEffect(() => {
    if (searchParams.get("search") !== LSQuery)
    router.push(`${pathname}?search=${LSQuery}&page=1`);
  }, [LSQuery, pathname, router, searchParams]);

  function HandleSearch(query: string) {
    router.push(`${pathname}?search=${query}&page=1`);
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
