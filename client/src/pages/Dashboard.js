import React, { useEffect } from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBBtn, MDBCardGroup, MDBCardImage, MDBCardText, MDBCardTitle, MDBIcon} from 'mdb-react-ui-kit';
import { useDispatch, useSelector } from 'react-redux';
import { getToursByUser } from '../redux/features/tourSlice';

const Dashboard = () => {
    const {user} = useSelector(state => ({...state.auth}));
    const {userTours, loading} = useSelector(state => ({...state.tour}))
    const userId = user?.result?._id;
    const dispatch = useDispatch();


    useEffect(() => {
        if(userId)
            dispatch(getToursByUser(userId))
    },[userId]) 

    return (
        <div >
            dashboard
        </div>
    )
}

export default Dashboard
