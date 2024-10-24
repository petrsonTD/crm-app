// eslint-disable-next-line import/namespace
import { Link } from "react-router-dom";
import { JSX } from "react";

function ErrorPage(): JSX.Element {
  return (
    <>
      <div>
        Page doesn't exist.
      </div>
      <div>
        {"Go "}
        <Link to="/">
          Home
        </Link>
      </div>
    </>
  );
}

export default ErrorPage;
