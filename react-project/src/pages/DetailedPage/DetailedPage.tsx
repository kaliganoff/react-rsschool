import { Result } from "../../interfaces/interfaces";
import { searchAPI } from "../../services/search";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

function DetailedPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: details, isFetching } = searchAPI.useFetchAllPeopleQuery<{
    data: Result;
    isFetching: boolean;
  }>({ search: searchParams.get("name"), page: "1" });
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
            <button data-testid="close-button" onClick={() => router.back()}>
              Close
            </button>
            <div>
              {details?.results.map((result: DetailedResultsItem) => (
                <div key="1">
                  <p>Name: {result.name}</p>
                  <p>Mass: {result.mass}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <div
        className="detailed-page-overlay"
        data-testid="detailed-page-overlay"
        onClick={() => router.back()}
      ></div>
    </>
  );
}

export default DetailedPage;
