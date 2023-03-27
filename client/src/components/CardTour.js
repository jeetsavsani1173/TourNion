import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBCardGroup,
  MDBBtn,
  MDBTooltip,
} from "mdb-react-ui-kit";
import { Provider, LikeButton } from "@lyket/react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { likeTour } from "../redux/features/tourSlice";

const CardTour = ({
  imageFile,
  description,
  title,
  tags,
  _id,
  name,
  likes,
}) => {
  const { user } = useSelector((state) => ({ ...state.auth }));
  // const userId = user?.result?._id || user?.result?.googleId;
  const userId = user?.result?._id || user?.result?.googleId;
  const dispatch = useDispatch();
  const excerpt = (str) => {
    if (str.length > 45) {
      str = str.substring(0, 45) + "...";
    }
    return str;
  };

  const handleLike = () => {
    dispatch(likeTour({ _id }));
  };

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId) ? (
        <Provider
          theme={{
            colors: {
              background: "#b8fff3",
              text: "violet",
              primary: "rgba(255, 224, 138, 0.4)",
            },
          }}
        >
          <LikeButton namespace="testing-react" id="everybody-like-now" />
          &nbsp;
          <div style={{ marginTop: "auto" }}>
            {likes.length > 2 ? (
              <MDBTooltip
                tag="a"
                title={`You and ${likes.length - 1} other people likes`}
              >
                {likes.length} Likes
              </MDBTooltip>
            ) : (
              `${likes.length} Like${likes.length > 1 ? "s" : ""}`
            )}
          </div>
        </Provider>
      ) : (
        <>
          <LikeButton namespace="testing-react" id="everybody-like-now" />
          &nbsp;
          <div style={{ marginTop: "auto" }}>
            {likes.length} {likes.length === 1 ? "Like" : "Likes"}
          </div>
        </>
      );
    }
    return (
      <Provider
        theme={{
          colors: {
            background: "#b8fff3",
            text: "violet",
            primary: "rgba(255, 224, 138, 0.4)",
          },
        }}
      >
        <LikeButton namespace="testing-react" id="everybody-like-now" />
        &nbsp;
        <div style={{ marginTop: "auto" }}>Like</div>
      </Provider>
    );
  };

  return (
    <MDBCardGroup
      className="mb-4"
      style={{
        boxShadow:
          "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px",
      }}
    >
      <MDBCard className="h-100 mt-2 d-sm-flex" style={{ maxWidth: "20rem" }}>
        <MDBCardImage
          src={imageFile}
          alt={title}
          position="top"
          style={{
            maxWidth: "100%",
            height: "180px",
          }}
        />
        <div className="top-left">{name}</div>
        <div style={{ float: "left" }}>
          {tags.map((item) => (
            <Link to={`/tours/tag/${item}`}>
              <span
                key={item}
                className="badge mt-2 mx-1"
                style={{
                  backgroundColor: "#e1ebf7",
                  color: "#1a91eb",
                  fontSize: "13px",
                }}
              >
                {item}
              </span>{" "}
            </Link>
          ))}
        </div>
        <MDBCardBody>
          <MDBCardTitle className="text-start">{title}</MDBCardTitle>
          <MDBCardText className="text-start">
            {excerpt(description)}
            <Link to={`/tour/${_id}`}> Read More.</Link>
          </MDBCardText>
        </MDBCardBody>
        <MDBCardBody style={{ marginBottom: "-20px" }}>
          <MDBBtn
            tag="a"
            color="none"
            onClick={!user?.result ? null : handleLike}
          >
            {!user?.result ? (
              <MDBTooltip title="Please login to like tour" tag="a">
                <Likes />
              </MDBTooltip>
            ) : (
              <Likes />
            )}
          </MDBBtn>
        </MDBCardBody>
      </MDBCard>
    </MDBCardGroup>
  );
};

export default CardTour;
