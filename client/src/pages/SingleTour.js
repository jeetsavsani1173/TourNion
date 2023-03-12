import React, { useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardText,
  MDBContainer,
  MDBIcon,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import moment from "moment";
import { getRelatedTours, getTour } from "../redux/features/tourSlice";
import { Link } from "react-router-dom";
import RelatedTours from "../components/RelatedTours";
// import { toast } from "react-toastify";
import { Helmet, HelmetProvider } from "react-helmet-async";
import DisqusThread from "../components/DisqusThread";

const SingleTour = () => {
  const dispatch = useDispatch();
  const { tour, relatedTours } = useSelector((state) => ({ ...state.tour }));
  const { id } = useParams();
  const tags = tour?.tags;

  useEffect(() => {
    tags && dispatch(getRelatedTours(tags));
  }, [tags]);

  useEffect(() => {
    if (id) {
      dispatch(getTour(id));
    }
  }, [id]);
  return (
    <>
      <MDBContainer>
        <MDBCard
          className="mb-3"
          style={{
            marginTop: "90px",
            boxShadow:
              "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px",
          }}
        >
          <MDBCardImage
            position="top"
            style={{
              width: "100%",
              maxHeight: "600px",
            }}
            src={tour.imageFile}
            alt={tour.title}
          />
          <MDBCardBody>
            <h3>{tour?.title}</h3>
            <span>
              <p className="text-start tourName">Created By: {tour.name}</p>
            </span>
            <div style={{ float: "left" }}>
              {/* <span className="text-start" > */}
              {tour &&
                tour.tags &&
                tour.tags.map((item) => (
                  <Link to={`/tours/tag/${item}`}>
                    <span
                      key={item}
                      className="badge mt-2 mx-1"
                      style={{
                        backgroundColor: "#e1ebf7",
                        color: "#1a91eb",
                        fontSize: "15px",
                      }}
                    >
                      {item}
                    </span>{" "}
                  </Link>
                ))}
              {/* </span> */}
            </div>
            <br />
            <MDBCardText className="text-start mt-3">
              {/* <MDBIcon
                style={{ float: "left", margin: "5px" }}
                far
                icon="calendar-alt"
                size="lg"
              /> */}
              <MDBIcon
                style={{ float: "left", margin: "11px" }}
                far
                icon="calendar-alt"
                size="lg"
              />
              <small className="text-muted mb-3">
                {moment(tour.createdAt).fromNow()}
              </small>
            </MDBCardText>
            <MDBCardText className="lead mb-0 text-start">
              {tour.description}
            </MDBCardText>
          </MDBCardBody>
        </MDBCard>
        {/* Related Tours Section */}
        <MDBCard style={{ marginTop: "50px", marginBottom: "60px" }}>
          <RelatedTours relatedTours={relatedTours} tourId={id} />
        </MDBCard>
        <DisqusThread id={id} title={tour.title} path={`/tour/${id}`} />
      </MDBContainer>
    </>
  );
};

export default SingleTour;
