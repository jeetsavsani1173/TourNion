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
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { register } from "../redux/features/authSlice";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Register = () => {
  const [formValue, setFormValue] = useState(initialState);
  const { loading, error } = useSelector((state) => ({ ...state.auth }));
  const { email, password, firstName, lastName, confirmPassword } = formValue;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    error && toast.error(error);
  }, [error]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast.error("password should match");
    }
    if (email && password && firstName && lastName && confirmPassword) {
      dispatch(register({ formValue, navigate, toast }));
    }
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
        <h5>Sign Up</h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} className="row g-3">
            <MDBValidationItem
              feedback="Please provide first Name."
              invalid
              className="col-md-6"
            >
              <MDBInput
                label="First Name"
                type="text"
                value={firstName}
                name="firstName"
                onChange={onInputChange}
                required
                invalid
                // validation="Please provide your email."
              />
            </MDBValidationItem>

            <MDBValidationItem
              feedback="Please provide last Name."
              invalid
              className="col-md-6"
            >
              <MDBInput
                label="last Name"
                type="text"
                value={lastName}
                name="lastName"
                onChange={onInputChange}
                required
                invalid
                // validation="Please provide your email."
              />
            </MDBValidationItem>

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

            <MDBValidationItem
              feedback="Please provide your Confirm Password."
              invalid
              className="col-md-12"
            >
              <MDBInput
                label="Password Confirm"
                type="password"
                value={confirmPassword}
                name="confirmPassword"
                onChange={onInputChange}
                required
                invalid
                // validation="Please provide your Password."
              />
            </MDBValidationItem>

            <div className="col-12">
              <MDBBtn style={{ width: "100%" }} className="mt-2">
                {loading && (
                  <MDBSpinner
                    size="sm"
                    role="status"
                    tag="span"
                    className="me-2"
                  />
                )}
                Register
              </MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
        <MDBCardFooter>
          <Link to="/login">
            <p>Already have an account ? Sign In</p>
          </Link>
        </MDBCardFooter>
      </MDBCard>
    </div>
  );
};

export default Register;
