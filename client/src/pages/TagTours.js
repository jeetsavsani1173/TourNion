import React, { useEffect } from "react";
import {
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBCardGroup,
} from "mdb-react-ui-kit";
import { useParams, Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { getToursByTag } from "../redux/features/tourSlice";
import { excerpt } from "../utility";

const TagTours = () => {
  const { tagTours, loading } = useSelector((state) => ({ ...state.tour }));
  const dispatch = useDispatch();
  const { tag } = useParams();

  useEffect(() => {
    if (tag) {
      dispatch(getToursByTag(tag));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tag]);

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
      <h3 className="text-center">
        Tours with tag <MDBIcon fas icon="tags" />:{" "}
        <span
          className="badge mt-2 mx-1"
          style={{
            backgroundColor: "#e1ebf7",
            color: "#1a91eb",
          }}
        >
          {tag}
        </span>
      </h3>
      <hr style={{ maxWidth: "570px" }} />
      {tagTours &&
        tagTours.map((item) => (
          <MDBCardGroup key={item._id}>
            <Link to={`/tour/${item._id}`}>
              <MDBCard
                style={{
                  maxWidth: "600px",
                  boxShadow:
                    "rgba(0, 0, 0, 0.15) 0px 15px 25px, rgba(0, 0, 0, 0.05) 0px 5px 10px",
                }}
                className="mt-2 mb-2"
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
                        {item.title}
                      </MDBCardTitle>
                      <MDBCardText className="text-start">
                        {excerpt(item.description, 90)}
                      </MDBCardText>
                      {/* <div
                        className="mb-2"
                        style={{ float: "left", marginTop: "-10px" }}
                      >
                        <Button
                          variant="secondary"
                          onClick={() => navigate(`/tour/${item._id}`)}
                        >
                          Read More
                        </Button>
                      </div> */}
                    </MDBCardBody>
                  </MDBCol>
                </MDBRow>
              </MDBCard>
            </Link>
          </MDBCardGroup>
        ))}
    </div>
  );
};

export default TagTours;
