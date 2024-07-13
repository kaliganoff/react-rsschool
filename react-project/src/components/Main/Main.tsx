import React from "react";
import "./Main.css";

interface MainProps {
  results: [];
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
  return (
    <main className="main">
      {isLoading ? (
        <div className="loader"></div>
      ) : (
        results.map((item: ResultsItem) => (
          <div className="item" key={item.name}>
            <p>
              Name: <b>{item.name}</b>
            </p>
            <p>Gender: {item.gender}</p>
            <p>Height: {item.height}</p>
            <p>Skin color: {item.skin_color}</p>
            <p>Birth year: {item.birth_year}</p>
          </div>
        ))
      )}
    </main>
  );
}

export default Main;
