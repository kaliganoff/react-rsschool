import { UNSAFE_ErrorResponseImpl, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page" data-testid="error-page">
      <h1>Oops!</h1>
      <p>Sorry, this page was not found</p>
      <p>
        <i>
          {error instanceof UNSAFE_ErrorResponseImpl ? error.statusText : ""}
        </i>
      </p>
    </div>
  );
}
