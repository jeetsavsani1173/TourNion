import React, { useState, useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCardFooter,
  MDBValidation,
  MDBBtn,
  MDBIcon,
  MDBValidationItem,
  MDBSpinner,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const [formValue, setFormValue] = useState(initialState);
  const { email, password } = formValue;
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };
  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "450px",
        alignContent: "center",
        marginTop: "120px",
      }}
    >
      <MDBCard alignment="center">
        {/* <MDBIcon
          style={{ marginTop: "20px" }}
          fas
          icon="user-circle"
          className="fa-2x"
        />
        <MDBIcon
          style={{ marginTop: "20px", marginBottom: "10px" }}
          fas
          icon="user-alt"
          className="fa-2x"
        /> */}
        <MDBIcon
          style={{ marginTop: "20px", marginBottom: "10px" }}
          far
          icon="user-circle"
          className="fa-2x"
        />
        <h5>Sign In</h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} className="row g-3">
            <MDBValidationItem
              feedback="Please provide your email."
              invalid
              className="col-md-12"
            >
              <MDBInput
                label="Email"
                type="email"
                value={email}
                name="email"
                onChange={onInputChange}
                required
                invalid
                // validation="Please provide your email."
              />
            </MDBValidationItem>
            <MDBValidationItem
              feedback="Please provide your Password."
              invalid
              className="col-md-12"
            >
              <MDBInput
                label="Password"
                type="password"
                value={password}
                name="password"
                onChange={onInputChange}
                required
                invalid
                // validation="Please provide your Password."
              />
            </MDBValidationItem>
            <div className="col-12">
              <MDBBtn style={{ width: "100%" }} className="mt-2">
                Login
              </MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
        <MDBCardFooter>
          <Link to="/register">
            <p>Don't have an account ? Sign Up</p>
          </Link>
        </MDBCardFooter>
      </MDBCard>
    </div>
  );
};

export default Login;
