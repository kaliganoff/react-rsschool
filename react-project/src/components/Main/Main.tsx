import "../../styles/Main.module.css";
import { searchAPI } from "../../services/search";
import { Result, ResultsItem } from "../../interfaces/interfaces";
import { SelectedItemsSlice } from "../../store/reducers/SelectedItemsSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { ThemeContext } from "../../context/ThemeContext";
import { useContext } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import DetailedPage from "../DetailedPageComponent/DetailedPageComponent";

export const getServerSideProps = async () => {
  await fetch("https://swapi.dev/api/people");
};

function Main() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { data: res, isFetching } = searchAPI.useFetchAllPeopleQuery<{
    data: Result;
    isFetching: boolean;
  }>({
    search: searchParams.get("search") || "",
    page: searchParams.get("page") || "1",
  });
  const { save, del, delAll } = SelectedItemsSlice.actions;
  const { items } = useAppSelector((state) => state.SelectedItemsReducer);
  const dispatch = useAppDispatch();
  const { isLightTheme } = useContext(ThemeContext);

  function paginate() {
    const numberOfPages = Math.floor(res && res.count / 9);
    const pages = [];
    for (let i = 0; i < numberOfPages; i++) {
      pages.push(
        <button
          className={isLightTheme ? "" : "button-dark"}
          data-testid="pagi"
          onClick={() =>
            router.push(
              `${pathname}?search=${searchParams.get("search")}&page=${i + 1}`,
            )
          }
        >
          {i + 1}
        </button>,
      );
    }
    return pages;
  }

  function HandleSave() {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      items.map((item) => Object.values(item).join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${items.length}_items.csv`);
    link.click();
  }

  return (
    <main
      className={`main ${isLightTheme ? "main-light" : "main-dark"}`}
      data-testid="main"
    >
      <div className="cards-list-container" data-testid="cards-list-container">
        <div className="cards-list">
          {isFetching ? (
            <div className="loader" data-testid="loader"></div>
          ) : (
            <>
              {res &&
                res.results.map((item: ResultsItem) => (
                  <div
                    onClick={(e) => {
                      if (e.currentTarget !== e.target) return;
                      router.push(
                        `${pathname}/?search=${searchParams.get("search")}&page=${searchParams.get("page")}&details=1&name=${item.name}`,
                      );
                    }}
                    className={`item ${isLightTheme ? "item-light" : "item-dark"}`}
                    key={item.name}
                    data-testid="card"
                  >
                    <p>
                      Name: <b>{item.name}</b>
                    </p>
                    <p>Gender: {item.gender}</p>
                    <p>Height: {item.height}</p>
                    <p>Skin color: {item.skin_color}</p>
                    <p>Birth year: {item.birth_year}</p>
                    <input
                      type="checkbox"
                      data-testid="checkbox"
                      checked={items.includes(item)}
                      onChange={(e) => {
                        if (e.currentTarget.checked) {
                          dispatch(save(item));
                        } else {
                          dispatch(del(item));
                        }
                      }}
                    />
                  </div>
                ))}
            </>
          )}
        </div>
        {paginate()}
      </div>
      {items.length > 0 && (
        <div
          className={`flyout ${isLightTheme ? "flyout-light" : "flyout-dark"}`}
          data-testid="flyout"
        >
          <p>Number of selected items: {items.length}</p>
          <button
            className={isLightTheme ? "" : "button-dark"}
            onClick={() => dispatch(delAll())}
          >
            Unselect all
          </button>
          <button
            className={isLightTheme ? "" : "button-dark"}
            onClick={() => HandleSave()}
          >
            Download
          </button>
        </div>
      )}
      {searchParams.get("details") && <DetailedPage />}
    </main>
  );
}

export default Main;
