import { useAppSelector } from "../../hooks/redux";

function MainPage() {
  const { controlled, uncontrolled } = useAppSelector(
    (state) => state.FormsReducer,
  );
  console.log(uncontrolled);

  return (
    <>
      {JSON.stringify(controlled)}
      {uncontrolled.map((item) => (
        <div>{JSON.stringify(Object.entries(item))}</div>
      ))}
    </>
  );
}

export default MainPage;
