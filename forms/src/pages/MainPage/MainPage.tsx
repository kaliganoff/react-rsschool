import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import "./MainPage.css";

function MainPage() {
  const { controlled, uncontrolled } = useAppSelector(
    (state) => state.FormsReducer,
  );
  console.log(uncontrolled);

  return (
    <>
      <div className="main-page">
        <div>
          <p>Controlled</p>
          <div>
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
          </div>
        </div>
        <div>
          <p>Uncontrolled</p>
          <div>
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
          </div>
        </div>
      </div>
      <Link to="/uncontrolled">Uncontrolled Form</Link>
      <Link to="/controlled">Controlled Form</Link>
    </>
  );
}

export default MainPage;
