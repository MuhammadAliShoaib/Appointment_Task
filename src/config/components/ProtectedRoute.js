import React, { useEffect, useState } from 'react'
import Login from '../../pages/form/login';
import { useNavigate } from 'react-router-dom';


//Component to check whether the user has access to incoming Component or not
export default function ProtectedRoute({ Component }) {

    const [check, setCheck] = useState(false);
    const navigate = useNavigate();


    //checks in localstorage whether user is logged in or not
    useEffect(() => {
        const result = localStorage.getItem('token');
        if (result) {
            setCheck(true);
        }else{
            navigate("/")
        }

    }, [])
    return <>
        {check && <Component />}
    </>
}
