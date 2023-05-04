import { MDBBtn, MDBCardBody, MDBCol, MDBContainer, MDBInput, MDBRow, MDBSpinner, MDBTextArea, MDBValidation, MDBValidationItem } from 'mdb-react-ui-kit'
import React, { useEffect, useState } from 'react'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import { updateUserDetails } from '../redux/features/authSlice';
import { getToursByUser } from '../redux/features/tourSlice';

const initialState = {
    firstName: "",
    lastName: "",
    about: ""
};

const UserProfile = () => {
    const { id } = useParams();
    const { user } = useSelector((state) => ({ ...state.auth }));
    const { userTours } = useSelector((state) => ({ ...state.tour }));
    const [formValue, setFormValue] = useState(initialState);
    const userId = user?.result?._id;
    const { loading, error } = useSelector((state) => ({ ...state.auth }));

    const [isEditClick, setIsEditClick] = useState(false);
    const { firstName, lastName, about } = formValue;
    const [markdownAboutContent, setMarkdownAboutContent] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        initialState.firstName = user?.result?.name.split(" ")[0];
        initialState.lastName = user?.result?.name.split(" ")[1];
        initialState.about = user?.result?.about;
        setMarkdownAboutContent(user?.result?.about);
    }, []);
    useEffect(() => {
        if (userId) dispatch(getToursByUser(userId));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (firstName && lastName) {
            dispatch(updateUserDetails({ id, formValue, navigate, toast }));
            setIsEditClick(false);
        }
    };
    const onInputChange = (e) => {
        let { name, value } = e.target;
        setFormValue({ ...formValue, [name]: value });
        if (name === "about") setMarkdownAboutContent(value);
    };
    let recentsTours = [];
    if (userTours) {
        let i = 0;
        for (let tour of userTours) {
            i++;
            recentsTours.push(
                <div class="d-block w-50 mb-3 user-profile-img-stl-grow">
                    <Link to={`/tour/${tour._id}`}>
                        <img src={tour.imageFile}
                            alt={tour.name} class="w-75 rounded-3" />
                    </Link>
                </div>
            )
            if (4 === i) break;
        }
    }

    return (
        <MDBContainer className='border' style={{ marginTop: "100px" }}>
            <section class="h-100 gradient-custom-2">
                <div class="py-5 h-100">
                    <div class="row d-flex justify-content-center align-items-center h-100">
                        <div class="col col-lg-9 col-xl-10">
                            <div class="card">
                                <div class="rounded-top text-white d-flex flex-row" style={{ background: 'linear-gradient(0deg, rgba(251,251,251,1) 0%, rgba(240,230,234,1) 100%)', height: '200px' }}>
                                    <div class="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
                                        <img src="https://cdn-icons-png.flaticon.com/256/64/64572.png"
                                            alt="Generic placeholder" class="img-fluid img-thumbnail mt-4 mb-2"
                                            style={{ width: '150px', zIndex: '1' }} />
                                        {userId === id &&
                                            <button type="button" class="btn btn-outline-dark" data-mdb-ripple-color="dark"
                                                style={{ zIndex: '1' }} onClick={() => setIsEditClick(!isEditClick)}>
                                                Edit profile
                                            </button>
                                        }
                                    </div>
                                    <div class="ms-3" style={{ marginTop: '130px', color: 'black' }}>
                                        <h5>{user?.result?.name}</h5>
                                        {/* <p>Surat, Gujarat</p> */}
                                    </div>
                                </div>
                                <div class="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                                    <div class="d-flex justify-content-end text-center py-1">
                                        <div>
                                            <p class="mb-1 h5">0</p>
                                            <p class="small text-muted mb-0">Photos</p>
                                        </div>
                                        <div class="px-3">
                                            <p class="mb-1 h5">0</p>
                                            <p class="small text-muted mb-0">Followers</p>
                                        </div>
                                        <div>
                                            <p class="mb-1 h5">0</p>
                                            <p class="small text-muted mb-0">Following</p>
                                        </div>
                                    </div>
                                </div>
                                {isEditClick &&
                                    <>
                                        <h5 className='text-start mx-3 mt-2'>Edit Profile Name</h5>
                                        <MDBCardBody>
                                            <MDBValidation onSubmit={handleSubmit} className="row g-3">
                                                <MDBValidationItem
                                                    feedback="Please provide first Name."
                                                    invalid
                                                    className="col-md-6"
                                                >
                                                    <MDBInput
                                                        label="First Name"
                                                        type="text"
                                                        value={firstName}
                                                        name="firstName"
                                                        onChange={onInputChange}
                                                        required
                                                        invalid
                                                    // validation="Please provide your email."
                                                    />
                                                </MDBValidationItem>

                                                <MDBValidationItem
                                                    feedback="Please provide last Name."
                                                    invalid
                                                    className="col-md-6"
                                                >
                                                    <MDBInput
                                                        label="last Name"
                                                        type="text"
                                                        value={lastName}
                                                        name="lastName"
                                                        onChange={onInputChange}
                                                        required
                                                        invalid
                                                    // validation="Please provide your email."
                                                    />
                                                </MDBValidationItem>

                                                <MDBValidationItem
                                                    feedback="Please provide About"
                                                    invalid
                                                    className="col-12"
                                                >
                                                    <MDBTextArea
                                                        label="Enter about (Markdown Supported)"
                                                        type="text"
                                                        value={about}
                                                        name="about"
                                                        onChange={onInputChange}
                                                        className="form-control"
                                                        required
                                                        rows={6}
                                                    />
                                                </MDBValidationItem>
                                                {markdownAboutContent &&
                                                    <div className='text-start border border-primary rounded-5 mx-2'>
                                                        <ReactMarkdown>{markdownAboutContent}</ReactMarkdown>
                                                    </div>
                                                }
                                                <div className="col-12">
                                                    <MDBBtn style={{ width: "35%", backgroundColor: 'red' }} className="mt-2 mx-2 bg-secondary" onClick={() => setIsEditClick(false)}>
                                                        Cancel
                                                    </MDBBtn>
                                                    <MDBBtn style={{ width: "35%" }} className="mt-2 mx-2">
                                                        {loading && (
                                                            <MDBSpinner
                                                                size="sm"
                                                                role="status"
                                                                tag="span"
                                                                className="me-2"
                                                            />
                                                        )}
                                                        Update
                                                    </MDBBtn>
                                                </div>
                                            </MDBValidation>
                                        </MDBCardBody>
                                    </>
                                }
                                <div class="card-body p-4 text-black">
                                    <div class="mb-5">
                                        <p class="lead fw-normal mb-1 text-start">About</p>
                                        <div class="p-4 text-start" style={{ backgroundColor: '#f8f9fa' }}>
                                            <ReactMarkdown>{user?.result?.about}</ReactMarkdown>
                                        </div>
                                    </div>
                                    <div class="d-flex justify-content-between align-items-center mb-4">
                                        <p class="lead fw-normal mb-0">Recent photos</p>
                                        <p class="mb-0"><Link to={'/dashboard'} class="text-muted">Show all</Link></p>
                                    </div>
                                    <div className='container d-flex flex-wrap'>
                                        {recentsTours.map(tour => tour)}
                                    </div>
                                    {/* <div class="row g-2">
                                        <div class="col mb-2">
                                            <img src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp"
                                                alt="image1 1" class="w-100 rounded-3" />
                                        </div>
                                        <div class="col mb-2">
                                            <img src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(107).webp"
                                                alt="image1 1" class="w-100 rounded-3" />
                                        </div>
                                    </div>
                                    <div class="row g-2">
                                        <div class="col">
                                            <img src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(108).webp"
                                                alt="image1 1" class="w-100 rounded-3" />
                                        </div>
                                        <div class="col">
                                            <img src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(114).webp"
                                                alt="image1 1" class="w-100 rounded-3" />
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </MDBContainer>
    )
}

export default UserProfile
