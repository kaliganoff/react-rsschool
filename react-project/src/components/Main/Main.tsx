import React from "react";
import "./Main.css";
import { Result } from "../../interfaces/interfaces";
import { Outlet, useNavigate, useSearchParams } from "react-router-dom";

interface MainProps {
  results: Result;
  isLoading: boolean;
}

interface ResultsItem {
  name: string;
  gender: string;
  height: string;
  skin_color: string;
  birth_year: string;
}

function Main({ results, isLoading }: MainProps) {
  const searchParamsArray = useSearchParams();
  const setSearchParams = searchParamsArray[1];
  const navigate = useNavigate();

  function paginate() {
    const numberOfPages = Math.floor(results.count / 9);
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
    <main className="main">
      <div className="cards-list-container">
        <div className="cards-list">
          {isLoading ? (
            <div className="loader"></div>
          ) : (
            <>
              {results.results.map((item: ResultsItem) => (
                <div
                  onClick={() => navigate(`details/${item.name}`)}
                  className="item"
                  key={item.name}
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
