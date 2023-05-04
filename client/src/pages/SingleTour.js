import React, { useEffect } from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardText,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBTooltip,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import moment from "moment";
import {
  getRelatedTours,
  getTour,
  likeTour,
} from "../redux/features/tourSlice";
import { Link } from "react-router-dom";
import RelatedTours from "../components/RelatedTours";
import DisqusThread from "../components/DisqusThread";
import { toast } from "react-toastify";
import Likes from "../components/Likes";
import ReactMarkdown from "react-markdown";

const SingleTour = () => {
  const dispatch = useDispatch();
  const { tour, relatedTours } = useSelector((state) => ({ ...state.tour }));
  const { user } = useSelector((state) => ({ ...state.auth }));
  const { id } = useParams();
  const tags = tour?.tags;

  useEffect(() => {
    tags && dispatch(getRelatedTours(tags));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tags]);

  useEffect(() => {
    if (id) {
      dispatch(getTour(id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleLike = () => {
    let res = dispatch(likeTour({ _id: id }));
    res && window.location.reload();
  };

  return (
    <>
      <MDBContainer>
        <MDBCard
          className="mb-3 tourHover"
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
            <MDBRow>
              <MDBCol size={"12"}>
                <h3>{tour?.title}</h3>
              </MDBCol>
            </MDBRow>
            <MDBRow className="mb-2">
              <MDBCol
                className="text-start d-flex justify-content-start"
                style={{ marginTop: "-10px" }}
              >
                <div>
                  {
                    tour.likes && (
                      <MDBBtn
                        tag="a"
                        color="none"
                        onClick={!user?.result ? null : handleLike}
                      >
                        {!user?.result ? (
                          <MDBTooltip title="Please login to like tour" tag="a">
                            <Likes likes={tour.likes} _id={id} />
                          </MDBTooltip>
                        ) : (
                          <Likes likes={tour.likes} _id={id} />
                        )}
                      </MDBBtn>
                    )
                    // <Likes likes={tour.likes} _id={id} />
                  }
                </div>
                {/* <LikeButton namespace="testing-react" id="everybody-like-now" /> */}
                <div
                  style={{
                    fontSize: "20px",
                    height: "50px",
                    width: "50px",
                  }}
                  className="shareButton"
                >
                  <MDBIcon
                    style={{ marginTop: "15px", marginLeft: "15px" }}
                    fas
                    icon="share"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `http://localhost:3000/tour/${id}`
                      );
                      toast.info("Link Copied to Clipboard");
                    }}
                  />
                </div>
                <div
                  style={{
                    fontSize: "20px",
                    height: "50px",
                    width: "50px",
                  }}
                  className="shareButton"
                >
                  <MDBIcon
                    style={{ marginTop: "15px", marginLeft: "15px" }}
                    fas
                    icon="comment"
                    onClick={() => (window.location.href = "#comments")}
                  />
                </div>
              </MDBCol>
            </MDBRow>

            <span>
              <p className="text-start tourName">Created By: <Link to={`#userid`}>{tour.name}</Link></p>
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
            {/* <MDBCardText className="lead mb-0 text-start">
              {tour.description}
            </MDBCardText> */}
            <MDBCardText className="lead mb-0 text-start">
              <ReactMarkdown>{tour.description}</ReactMarkdown>
            </MDBCardText>
          </MDBCardBody>
        </MDBCard>
        {/* Related Tours Section */}
        <MDBCard style={{ marginTop: "50px", marginBottom: "60px" }}>
          <RelatedTours relatedTours={relatedTours} tourId={id} />
        </MDBCard>
        <DisqusThread id={id} title={tour.title} path={`/tour/${id}`} />
        <div id="comments"></div>
      </MDBContainer>
    </>
  );
};

export default SingleTour;
