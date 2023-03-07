import React, { useEffect } from 'react'
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBBtn,
    MDBCardGroup,
    MDBCardImage,
    MDBCardText,
    MDBCardTitle,
    MDBIcon,
} from 'mdb-react-ui-kit';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteTour, getToursByUser } from '../redux/features/tourSlice';
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';

const Dashboard = () => {
    const { user } = useSelector(state => ({ ...state.auth }));
    const { userTours, loading } = useSelector(state => ({ ...state.tour }))
    const userId = user?.result?._id;
    const dispatch = useDispatch();


    useEffect(() => {
        if (userId)
            dispatch(getToursByUser(userId))
    }, [userId])

    const excerpt = (str) => {
        if (str.length > 45) {
            str = str.substring(0, 45) + "...";
        }
        return str;
    };

    const handleDelete = (id) => {
        console.log(id);
        if(window.confirm('Are you sure you want to delete this tour?')){
            dispatch(deleteTour({id,toast}));
        }
    }

    // spinner
    if (loading) {
        return <Spinner />;
    }

    return (
        <div style={{ margin: 'auto', padding: '120px', maxWidth: '900px', alignContent: 'center' }}>
            <h4 className='text-center'>Dashboard: {user?.result?.name}</h4>
            <hr style={{ maxWidth: '570px' }} />

            {userTours && userTours.map((item) => {
                return <MDBCardGroup>
                    <MDBCard style={{ maxWidth: '600px' }} key={item._id} className='mt-2'>
                        <MDBRow className='g-0'>
                            <MDBCol md='4'>
                                <MDBCardImage
                                    className='rounded'
                                    src={item.imageFile}
                                    alt={item.title}
                                    fluid
                                />
                            </MDBCol>
                            <MDBCol md='8'>
                                <MDBCardBody>
                                    <MDBCardTitle className='text-start'>{item.title}</MDBCardTitle>
                                    <MDBCardText className='text-start'>
                                        <small className='text-muted'>{excerpt(item.description)}</small>
                                    </MDBCardText>
                                    <div style={{ marginLeft: '5px', float: 'right', marginTop: '-60px' }}>
                                        <MDBBtn className='mt-1' tag='a' color='none'> 
                                            <MDBIcon fas icon='trash' style={{ color: '#dd4b39' }} size='lg' onClick={() => handleDelete(item._id)}/>
                                        </MDBBtn>
                                        <Link to={`/editTour/${item._id}`}>
                                            <MDBIcon fas icon='edit' style={{ color: '#55acee', marginLeft: '10px' }} size='lg' />
                                        </Link>
                                    </div>
                                </MDBCardBody>
                            </MDBCol>
                        </MDBRow>
                    </MDBCard>
                </MDBCardGroup>
            })}
        </div>
    )
}

export default Dashboard
