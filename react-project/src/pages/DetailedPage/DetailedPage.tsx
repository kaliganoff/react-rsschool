import { useNavigate, useParams } from "react-router-dom";
import { Result } from "../../interfaces/interfaces";
import "./DetailedPage.css";
import { searchAPI } from "../../services/search";

function DetailedPage() {
  const params = useParams();
  const navigate = useNavigate();
  const { data: details, isFetching } = searchAPI.useFetchAllPeopleQuery<{
    data: Result;
    isFetching: boolean;
  }>({ search: params.name, page: "1" });
  interface DetailedResultsItem {
    name: string;
    gender: string;
    height: string;
    skin_color: string;
    birth_year: string;
    mass: string;
  }

  return (
    <>
      <div className="detailed-page">
        {isFetching ? (
          <div className="loader-detailed" data-testid="loader-detailed"></div>
        ) : (
          <>
            <button data-testid="close-button" onClick={() => navigate(-1)}>
              Close
            </button>
            <div>
              {details?.results.map((result: DetailedResultsItem) => (
                <div key='1'>
                  <p>Name: {result.name}</p>
                  <p>Mass: {result.mass}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <div className="detailed-page-overlay" data-testid="detailed-page-overlay" onClick={() => navigate(-1)}></div>
    </>
  );
}

export default DetailedPage;
