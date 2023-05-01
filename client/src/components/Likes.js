import React from "react";
// import { likeTour } from '../redux/features/tourSlice';
import { LikeButton, Provider } from "@lyket/react";
import { useSelector } from "react-redux";
import { MDBTooltip } from "mdb-react-ui-kit";

const Likes = ({ likes, _id }) => {
  const { user } = useSelector((state) => ({ ...state.auth }));
  const userId = user?.result?._id || user?.result?.googleId;

  // const Likes = () => {
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
    <>
      <LikeButton namespace="testing-react" id="everybody-like-now" />
      &nbsp;
      <div style={{ marginTop: "auto" }}>
        {likes.length} {likes.length === 1 ? "Like" : "Likes"}
      </div>
    </>
  );
  // };
};

export default Likes;
