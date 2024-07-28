import "./Main.css";
import { Outlet, useNavigate, useSearchParams } from "react-router-dom";
import { searchAPI } from "../../services/search";
import { Result, ResultsItem } from "../../interfaces/interfaces";
import { SelectedItemsSlice } from "../../store/reducers/SelectedItemsSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { ThemeContext } from "../../context/ThemeContext";
import { useContext } from "react";

function Main() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
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
          onClick={() =>
            setSearchParams((searchParams) => {
              searchParams.set("page", `${i + 1}`);
              return searchParams;
            })
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
    link.setAttribute("download", `${items.length}.csv`);
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
                      navigate(
                        `details/${item.name}?search=${searchParams.get("search")}&page=${searchParams.get("page")}`,
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
      <Outlet />
    </main>
  );
}

export default Main;
