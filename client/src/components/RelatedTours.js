import React from "react";
import {
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { excerpt } from "../utility";

const RelatedTours = ({ relatedTours, tourId }) => {
  return (
    <div style={{ marginTop: "30px" }}>
      {relatedTours && relatedTours.length > 0 && (
        <>
          {relatedTours.length > 1 && (
            <h4 style={{ marginBottom: "30px" }}>Related Tours</h4>
          )}
          <MDBRow className="row-cols-1 row-cols-md-3 g-4">
            {relatedTours
              .filter((item) => item._id !== tourId)
              .splice(0, 3)
              .map((item) => (
                <MDBCol>
                  <MDBCard>
                    <Link to={`/tour/${item._id}`}>
                      <MDBCardImage
                        src={item.imageFile}
                        alt={item.title}
                        position="top"
                        style={{
                          maxWidth: "95%",
                          height: "190px",
                        }}
                      />
                    </Link>
                    <div style={{ float: "left" }}>
                      {item.tags.map((item) => (
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
                      <MDBCardTitle className="text-start">
                        {item.title}
                      </MDBCardTitle>
                      <MDBCardText className="text-start">
                        {excerpt(item.description, 45)}
                      </MDBCardText>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              ))}
          </MDBRow>
        </>
      )}
    </div>
  );
};

export default RelatedTours;
