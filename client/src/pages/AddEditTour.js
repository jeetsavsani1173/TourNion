import React, { useState, useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBValidation,
  MDBBtn,
  MDBInput,
  MDBValidationItem,
  MDBTextArea,
} from "mdb-react-ui-kit";
import ChipInput from "material-ui-chip-input";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createTour, updateTour } from "../redux/features/tourSlice";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

// initial state of tour
const initialState = {
  title: "",
  description: "",
  tags: [],
};

const AddEditTour = () => {
  const [tourData, setTourData] = useState(initialState);
  const [tagErrMsg, setTagErrMsg] = useState(null);
  const [fileErrMsg, setFileErrMsg] = useState(null);
  const [image, setImage] = useState(null);
  const [markdownContent, setMarkdownContent] = useState("");

  const { error, userTours } = useSelector((state) => ({
    ...state.tour,
  }));
  const { user } = useSelector((state) => ({ ...state.auth }));
  const { title, description, tags } = tourData;
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const singleTour = userTours.find((tour) => tour._id === id);
      setTourData({ ...singleTour });
      // setPreviewUrl(singleTour.imageFile);
      setImage(singleTour.imageFile);
    }
  }, [id, userTours]);

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClear = () => {
    setTourData({ title: "", description: "", tags: [] });
    setImage(null);
    setMarkdownContent("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!tags.length) {
      setTagErrMsg("Please provide some tags");
    }
    if (image === null) {
      setFileErrMsg("Please provide an image");
    }
    if (title && description && 0 < tags.length && image) {
      const updatedTourData = { ...tourData, name: user?.result?.name };

      if (!id) {
        // it is render for add tour page
        dispatch(createTour({ updatedTourData, navigator, toast }));
        handleClear();
        navigate("/");
      } else {
        // it is render for edit tour page
        dispatch(updateTour({ id, updatedTourData, navigate, toast }));
        navigate("/");
      }
      // handleClear();
    }
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setFileToBase(file);
  };

  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setTourData({ ...tourData, imageFile: reader.result });
      setImage(reader.result);
      // console.log(reader.result);
    };
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setTourData({ ...tourData, [name]: value });
    if (name === "description") {
      setMarkdownContent(value);
    }
  };

  const handleAddTag = (tag) => {
    setTagErrMsg(null);
    setTourData({ ...tourData, tags: [...tourData.tags, tag] });
  };

  const handleDeleteTag = (deleteTag) => {
    setTourData({
      ...tourData,
      tags: tourData.tags.filter((tag) => tag !== deleteTag),
    });
  };

  const handleGoBack = () => {
    navigate("/dashboard");
  };

  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "900px",
        alignContent: "center",
        marginTop: "120px",
        marginBottom: "30px",
        boxShadow: "rgba(0, 0, 0, 0.4) 0px 30px 90px",
      }}
      className="container"
    >
      <HelmetProvider>
        <Helmet>
          <title>{id ? "Update" : "Add"} Tour</title>
        </Helmet>
      </HelmetProvider>
      <MDBCard alignment="center">
        <h5>{id ? "Update Tour" : "Add Tour"}</h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} className="row g-3" noValidate>
            <MDBValidationItem
              feedback="Please provide title."
              invalid
              className="col-md-12"
            >
              <MDBInput
                label="Enter Title"
                type="text"
                value={title}
                name="title"
                onChange={onInputChange}
                className="form-control"
                required
                invalid
                // validation="Please provide your email."
              />
            </MDBValidationItem>
            <MDBValidationItem
              feedback="Please provide Description."
              invalid
              className="col-md-12"
            >
              <MDBTextArea
                label="Enter Description"
                type="text"
                // style={{ height: "100px" }}
                value={description}
                name="description"
                onChange={onInputChange}
                className="form-control"
                required
                rows={6}
                // validation="Please provide your email."
              />
              {markdownContent && (
                <div className="col-12 text-start border border-primary mt-3 px-2 py-1">
                  <ReactMarkdown>{markdownContent}</ReactMarkdown>
                </div>
              )}
            </MDBValidationItem>
            <div className="col-md-12">
              <ChipInput
                name="tags"
                variant="filled"
                label="Enter Tag"
                fullWidth
                value={tags}
                onAdd={(tag) => handleAddTag(tag)}
                onDelete={(tag) => handleDeleteTag(tag)}
              />
              {tagErrMsg && <div className="tagErrMsg">{tagErrMsg}</div>}
            </div>
            <div className="d-flex justify-content-start">
              {/* <FileBase
                type="file"
                multiple={false}
                // onDone={({ base64 }) => {
                //   setTourData({ ...tourData, imageFile: base64 });
                //   setPreviewUrl(base64);
                // }}
                onDone={({ base64 }) => {
                  setFileToBase(base64);
                }}
                required
              /> */}
              <div className="form-outline mb-4">
                <input
                  type="file"
                  id="formupload"
                  onChange={handleImage}
                  name="image"
                  className="form-control"
                />
              </div>
            </div>
            {fileErrMsg && <div className="tagErrMsg">{fileErrMsg}</div>}
            <div className="col-12">
              {image && <img src={image} className="col-12" alt="Preview" />}
            </div>
            <div className="col-12">
              <MDBBtn style={{ width: "100%" }}>
                {id ? "Update" : "Submit"}
              </MDBBtn>
              <MDBBtn
                style={{ width: "100%" }}
                className="mt-2"
                color="danger"
                onClick={handleClear}
              >
                Clear
              </MDBBtn>
              <MDBBtn
                style={{ width: "100%" }}
                className="mt-2"
                color="info"
                onClick={handleGoBack}
              >
                Cancel
              </MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
};

export default AddEditTour;
