import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";

function MainPage() {
  const { controlled, uncontrolled } = useAppSelector(
    (state) => state.FormsReducer,
  );
  console.log(uncontrolled);

  return (
    <>
      {controlled.map((item) =>
        Object.entries(item).map((entry) =>
          entry[0] !== "file" ? (
            <p>
              {entry[0]}: {entry[1]}
            </p>
          ) : (
            <img src={entry[1]}></img>
          ),
        ),
      )}
      {uncontrolled.map((item) =>
        Object.entries(item).map((entry) =>
          entry[0] !== "file" ? (
            <p>
              {entry[0]}: {entry[1]}
            </p>
          ) : (
            <img src={entry[1]}></img>
          ),
        ),
      )}
      <Link to="/uncontrolled">Uncontrolled Form</Link>
      <Link to="/controlled">Controlled Form</Link>
    </>
  );
}

export default MainPage;
