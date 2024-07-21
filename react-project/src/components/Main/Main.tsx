import "./Main.css";
import { Outlet, useNavigate, useSearchParams } from "react-router-dom";
import { searchAPI } from "../../services/search";
import { Result } from "../../interfaces/interfaces";

interface ResultsItem {
  name: string;
  gender: string;
  height: string;
  skin_color: string;
  birth_year: string;
}

function Main() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { data: res, isFetching } = searchAPI.useFetchAllPeopleQuery<{
    data: Result;
    isFetching: boolean;
  }>({ search: searchParams.get("search"), page: searchParams.get("page") });

  function paginate() {
    const numberOfPages = Math.floor(res && res.count / 9);
    const pages = [];
    for (let i = 0; i < numberOfPages; i++) {
      pages.push(
        <button
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

  return (
    <main className="main" data-testid="main">
      <div className="cards-list-container" data-testid="cards-list-container">
        <div className="cards-list">
          {isFetching ? (
            <div className="loader" data-testid="loader"></div>
          ) : (
            <>
              {res &&
                res.results.map((item: ResultsItem) => (
                  <div
                    onClick={() =>
                      navigate(
                        `details/${item.name}?search=${searchParams.get("search")}&page=${searchParams.get("page")}`,
                      )
                    }
                    className="item"
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
                  </div>
                ))}
            </>
          )}
        </div>
        {paginate()}
      </div>
      <Outlet />
    </main>
  );
}

export default Main;
