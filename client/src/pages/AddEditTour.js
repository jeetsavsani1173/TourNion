import React, { useState } from "react";
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
import { useNavigate } from "react-router-dom";

const initialState = {
  title: "",
  description: "",
  tags: [],
};

const AddEditTour = () => {
  const [tourData, setTourData] = useState(initialState);
  const { title, description, tags } = tourData;

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setTourData({ ...tourData, [name]: value });
  };
  const handleAddTag = (tag) => {
    setTourData({ ...tourData, tags: [...tourData.tags, tag] });
  };
  const handleDeleteTag = (deleteTag) => {
    setTourData({
      ...tourData,
      tags: tourData.tags.filter((tag) => tag !== deleteTag),
    });
  };
  const handleClear = () => {
    setTourData({ title: "", description: "", tags: [] });
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
        <h5>Add Tour</h5>
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
                style={{ height: "100px" }}
                value={description}
                name="description"
                onChange={onInputChange}
                className="form-control"
                required
                invalid
                // validation="Please provide your email."
              />
            </MDBValidationItem>
            {/* <div className="col-md-12">
              <textarea
                placeholder="Enter Description"
                type="text"
                style={{ height: "100px" }}
                value={description}
                name="description"
                onChange={onInputChange}
                className="form-control"
                required
                invalid
                validation="please Provide description"
              />
            </div> */}
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
            </div>
            <div className="d-flex justify-content-start">
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) =>
                  setTourData({ ...tourData, imageFile: base64 })
                }
              />
            </div>
            <div className="col-12">
              <MDBBtn style={{ width: "100%" }}>Submit</MDBBtn>
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
