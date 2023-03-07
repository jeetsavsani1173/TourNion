import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const LoadingToRedirect = () => {
    const [count, setCount] = useState(3);
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((currentCount) => --currentCount);
        },1000);
        // redirect once count is equal to 0
        0===count && navigate('/login');

        // cleanup
        // why cleanup? because we don't want to keep running the interval after the component is unmounted
        // so we want to clear the interval when the component is unmounted
        // when cleanup will run? when the component is unmounted or when the useEffect is run again
        return () => clearInterval(interval);
    },[count,navigate])
    // why navigate in the dependency array? because we want to run the useEffect again if the navigate changes

    return (
        <div style={{marginTop: '100px'}}>
            <h5>Redirecting you in {count} seconds</h5>
        </div>
    )
}

export default LoadingToRedirect
