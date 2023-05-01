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
import { googleSignIn, login } from "../redux/features/authSlice";
// import { GoogleLogin } from "react-google-login";
import { GoogleLogin } from "google-login-react";
import { Helmet, HelmetProvider } from "react-helmet-async";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const [formValue, setFormValue] = useState(initialState);
  const { loading, error } = useSelector((state) => ({ ...state.auth }));
  const { email, password } = formValue;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // prod -> 641793618520-qcdao3qq8lrarp6jv2fpl03hl653pp39.apps.googleusercontent.com

  const devEnv = process.env.NODE_ENV !== "production";

  const clientId = devEnv
    ? "641793618520-kun4d6mc1vgemjcajsfj53teo0m8v8hj.apps.googleusercontent.com"
    : "641793618520-qcdao3qq8lrarp6jv2fpl03hl653pp39.apps.googleusercontent.com";

  useEffect(() => {
    error && toast.error(error);
  }, [error]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      dispatch(login({ formValue, navigate, toast }));
    }
  };
  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const googleSuccess = (resp) => {
    // console.log(resp);
    const email = resp && resp.email;
    const name = resp && resp.name;
    const googleId = resp && resp.sub;
    const result = { email, name, googleId };
    dispatch(googleSignIn({ result, navigate, toast }));
  };

  const googleFailure = (error) => {
    toast.error("There is Something gone wrong..");
  };
  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "470px",
        alignContent: "center",
        marginTop: "120px",
        boxShadow: "rgba(0, 0, 0, 0.4) 0px 30px 90px",
      }}
    >
      <HelmetProvider>
        <Helmet>
          <title>Login</title>
        </Helmet>
      </HelmetProvider>
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
                {loading && (
                  <MDBSpinner
                    size="sm"
                    role="status"
                    tag="span"
                    className="me-2"
                  />
                )}
                Login
              </MDBBtn>
            </div>
          </MDBValidation>
          <br />
          <div>
            <GoogleLogin
              clientId={clientId}
              render={(renderProps) => (
                <MDBBtn
                  style={{ width: "100%" }}
                  color="danger"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <MDBIcon className="me-2" fab icon="google" /> Google Sign In
                </MDBBtn>
              )}
              onSuccess={googleSuccess}
              onError={googleFailure}
            />
          </div>
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
