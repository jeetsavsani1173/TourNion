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
import FileBase from "react-file-base64";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createTour, updateTour } from "../redux/features/tourSlice";

const initialState = {
  title: "",
  description: "",
  tags: [],
};

const AddEditTour = () => {
  const [tourData, setTourData] = useState(initialState);
  const [tagErrMsg, setTagErrMsg] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const { error, loading, userTours } = useSelector((state) => ({
    ...state.tour,
  }));
  const { user } = useSelector((state) => ({ ...state.auth }));
  const { title, description, tags } = tourData;
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const singleTour = userTours.find((tour) => tour._id === id);
      setTourData({ ...singleTour });
    }
  }, [id]);

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClear = () => {
    setTourData({ title: "", description: "", tags: [] });
    setPreviewUrl(null);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!tags.length) {
      setTagErrMsg("Please provide some tags");
    }
    if (title && description && tags) {
      const updatedTourData = { ...tourData, name: user?.result?.name };

      if (!id) {
        // it is render for add tour page
        dispatch(createTour({ updatedTourData, navigator, toast }));
        handleClear();
        navigate("/");
      } else {
        // it is render for edit tour page
        dispatch(updateTour({ id, updatedTourData, navigate, toast }));
      }
      // navigate("/");
    }
  };
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setTourData({ ...tourData, [name]: value });
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
  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "500px",
        alignContent: "center",
        marginTop: "120px",
        boxShadow: "rgba(0, 0, 0, 0.4) 0px 30px 90px",
      }}
      className="container"
    >
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
                invalid
                rows={4}
                // validation="Please provide your email."
              />
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
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) => {
                  setTourData({ ...tourData, imageFile: base64 });
                  setPreviewUrl(base64);
                }}
              />
            </div>
            <div className="col-12">
              {previewUrl && (
                <img src={previewUrl} className="col-12" alt="Preview" />
              )}
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
            </div>
          </MDBValidation>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
};

export default AddEditTour;
