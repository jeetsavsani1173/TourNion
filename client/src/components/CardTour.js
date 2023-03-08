import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBCardGroup,
  MDBBtn,
  MDBIcon,
  MDBTooltip,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const CardTour = ({ imageFile, description, title, tags, _id, name }) => {
  const excerpt = (str) => {
    if (str.length > 45) {
      str = str.substring(0, 45) + "...";
    }
    return str;
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
        {/* <span className="text-start tag-card">
          {tags.map((tag) => (
            <Link to={`/tour/tag/${tag}`}>#{tag} </Link>
          ))}
        </span> */}
        <div style={{ float: "left" }}>
          {tags.map((item) => (
            <Link to={`/tours/tag/${item}`}>
              <span
                key={item}
                className="badge mt-2 mx-1"
                style={{
                  backgroundColor: "#e1ebf7",
                  color: "#1a91eb",
                  fontSize: "12px",
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
      </MDBCard>
    </MDBCardGroup>
  );
};

export default CardTour;
