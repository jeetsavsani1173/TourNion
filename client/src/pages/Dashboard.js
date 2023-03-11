import React, { useState, useEffect } from "react";
import {
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBBtn,
  MDBCardGroup,
  MDBCardImage,
  MDBCardText,
  MDBCardTitle,
  MDBIcon,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteTour, getToursByUser } from "../redux/features/tourSlice";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Helmet, HelmetProvider } from "react-helmet-async";

const Dashboard = () => {
  const { user } = useSelector((state) => ({ ...state.auth }));
  const { userTours, loading } = useSelector((state) => ({ ...state.tour }));
  const userId = user?.result?._id;
  const dispatch = useDispatch();

  // for dispalying popup of delete operation
  const [show, setShow] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const handleClose = () => {
    setShow(false);
    setSelectedUser(null);
  };
  const handleShow = (item) => {
    setShow(true);
    setSelectedUser(item);
  };

  useEffect(() => {
    if (userId) dispatch(getToursByUser(userId));
  }, [userId]);

  const excerpt = (str) => {
    if (str.length > 45) {
      str = str.substring(0, 45) + "...";
    }
    return str;
  };

  const handleDelete = (id) => {
    // console.log(id);
    dispatch(deleteTour({ id, toast }));
    handleClose();
  };

  // spinner
  if (loading) {
    return <Spinner />;
  }

  return (
    <div
      style={{
        margin: "auto",
        padding: "120px",
        maxWidth: "900px",
        alignContent: "center",
      }}
    >
      <HelmetProvider>
        <Helmet>
          <title>Dashboard: {user?.result?.name}</title>
        </Helmet>
      </HelmetProvider>
      <h4 className="text-center">Dashboard: {user?.result?.name}</h4>
      <hr style={{ maxWidth: "570px" }} />
      {userTours &&
        userTours.map((item) => {
          return (
            <MDBCardGroup key={item._id}>
              <MDBCard
                style={{
                  maxWidth: "600px",
                  boxShadow:
                    "rgba(0, 0, 0, 0.15) 0px 15px 25px, rgba(0, 0, 0, 0.05) 0px 5px 10px",
                }}
                className="mt-3 mb-2"
              >
                <MDBRow className="g-0">
                  <MDBCol md="4">
                    <MDBCardImage
                      className="rounded"
                      src={item.imageFile}
                      alt={item.title}
                      fluid
                    />
                  </MDBCol>
                  <MDBCol md="8">
                    <MDBCardBody>
                      <MDBCardTitle className="text-start">
                        <Link to={`/tour/${item._id}`}>{item.title}</Link>
                      </MDBCardTitle>
                      <MDBCardText className="text-start">
                        <small className="text-muted">
                          {excerpt(item.description)}
                        </small>
                      </MDBCardText>
                      <div
                        style={{
                          marginLeft: "5px",
                          float: "right",
                          marginTop: "-60px",
                        }}
                      >
                        <MDBBtn className="mt-1" tag="a" color="none">
                          <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                              <Modal.Title>
                                Deleting The Tour : {selectedUser?.title}
                              </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              Are you sure you want to delete this tour ?
                            </Modal.Body>
                            <Modal.Footer>
                              <Button variant="secondary" onClick={handleClose}>
                                Close
                              </Button>
                              <Button
                                variant="danger"
                                onClick={() => handleDelete(selectedUser?._id)}
                              >
                                Delete
                              </Button>
                            </Modal.Footer>
                          </Modal>
                          <MDBIcon
                            fas
                            icon="trash"
                            style={{ color: "#dd4b39" }}
                            size="lg"
                            // onClick={() => handleDelete(item._id)}
                            onClick={() => handleShow(item)}
                          />
                        </MDBBtn>
                        <Link to={`/editTour/${item._id}`}>
                          <MDBIcon
                            fas
                            icon="edit"
                            style={{ color: "#55acee", marginLeft: "10px" }}
                            size="lg"
                          />
                        </Link>
                      </div>
                    </MDBCardBody>
                  </MDBCol>
                </MDBRow>
              </MDBCard>
            </MDBCardGroup>
          );
        })}
    </div>
  );
};

export default Dashboard;
