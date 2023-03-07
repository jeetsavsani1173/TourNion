import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

const NotFound = () => {
  return (
    <div style={{ marginTop: "100px" }}>
      {/* <img src="/images/404.jpg" alt="Not Found!!" /> */}
      <h1 style={{ color: "red" }}>404 page not found!</h1>
      <h3>Oops! You seem to be lost.</h3>
      <p>Here are some helpful links:</p>
      {/* <Link to="/">Home </Link>
      <Link to="/login">login</Link> */}
      <Button variant="secondary" size="lg">
        <Link to="/">Home </Link>
      </Button>{" "}
      {/* <Button variant="secondary" size="lg">
        <Link to="/login">login</Link>
      </Button> */}
    </div>
  );
};

export default NotFound;
