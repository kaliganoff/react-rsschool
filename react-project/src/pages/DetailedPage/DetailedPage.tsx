import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Result } from "../../interfaces/interfaces";
import "./DetailedPage.css";

function DetailedPage() {
  const params = useParams();
  const [details, setDetails] = useState<Result>();

  interface DetailedResultsItem {
    name: string;
    gender: string;
    height: string;
    skin_color: string;
    birth_year: string;
    mass: string;
  }

  useEffect(() => {
    async function search(query: string) {
      const response = await fetch(
        `https://swapi.dev/api/people/?search=${query}`,
      );
      const result: Result = await response.json();
      return result;
    }
    if (params.name) {
      search(params.name).then((result) => {
        setDetails(result);
      });
    }
  }, [params]);

  return (
    <div className="detailed-page">
      {details?.results.map((result: DetailedResultsItem) => (
        <>
          <p>Name: {result.name}</p>
          <p>Mass: {result.mass}</p>
        </>
      ))}
    </div>
  );
}

export default DetailedPage;
