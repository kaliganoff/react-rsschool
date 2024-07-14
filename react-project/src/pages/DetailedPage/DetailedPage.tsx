import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Result } from "../../interfaces/interfaces";
import "./DetailedPage.css";

function DetailedPage() {
  const params = useParams();
  const [details, setDetails] = useState<Result>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
      setIsLoading(true);
      search(params.name).then((result) => {
        setIsLoading(false);
        setDetails(result);
      });
    }
  }, [params]);

  return (
    <>
      <div className="detailed-page">
        {isLoading ? (
          <div className="loader-detailed"></div>
        ) : (
          <>
            <button data-testid="close-button" onClick={() => navigate(-1)}>
              Close
            </button>
            <div>
              {details?.results.map((result: DetailedResultsItem) => (
                <>
                  <p>Name: {result.name}</p>
                  <p>Mass: {result.mass}</p>
                </>
              ))}
            </div>
          </>
        )}
      </div>
      <div className="detailed-page-overlay" onClick={() => navigate(-1)}></div>
    </>
  );
}

export default DetailedPage;
