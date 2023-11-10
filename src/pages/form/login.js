import React, { useEffect, useState } from 'react'
import './login.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addData } from '../../config/redux/reducer/appointmentSlice';
import { useNavigate } from 'react-router-dom';

export default function Login() {

    const [token, setToken] = useState(null);
    const [flag, setFlag] = useState(false);
    const [user,setUser] = useState({})



    const dispatch = useDispatch();
    const navigate = useNavigate();

    const api = "https://hiring-test-task.vercel.app/api/login";
    const api2 = "https://hiring-test-task.vercel.app/api/refresh-token";
    const api3 = "https://hiring-test-task.vercel.app/api/appointments"


    //use to retrive token from login api
    const getData = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(api, user);
            setToken(res.data.token);
            setFlag(true)
        } catch (err) {
            console.log(err);
        }
    };

    //if token retrieved then authorization done
    useEffect(() => {
        check();
    }, [flag]);

    const check = async () => {
        if (!token) return;

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        };

        try {
            const res = await axios.post(api2, null, config);
            setToken(res.data.newToken);
            getAppointment()
        } catch (err) {
            if (err.response.status === 401) {
                // Handle token refresh here
                console.log("Token expired. Refreshing...");
                await refreshToken(config);
            } else {
                console.log(err);
            }
        }
    };

    // refresher token if token gets expired
    const refreshToken = async (config) => {
        try {
            const res = await axios.post(api2, null, config);
            setToken(res.data.newToken);
            getAppointment()
        } catch (err) {
            console.log("Error refreshing token:", err);
        }
    };


    //retrieves all the appointments of the user
    let getAppointment = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            };

            const res = await axios.get(api3, config);
            localStorage.setItem("token",token);
            dispatch(addData(res.data))
            navigate('/appointment')
        } catch (err) {
            console.log("Error getting data:", err);
        }
    }


    return (
        <div className='login'>
            <div className="login-container">
                <div className='logo'>
                    <svg width="120" height="51" viewBox="0 0 145 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M60.358 11.6151V39.9787H68.2244V23.9318C68.2244 22.7746 68.483 21.7528 69 20.8665C69.5294 19.9801 70.2434 19.2907 71.1421 18.7983C72.053 18.2936 73.0871 18.0412 74.2443 18.0412C74.786 18.0412 75.3831 18.0843 76.0355 18.1705C76.688 18.2566 77.1989 18.3551 77.5682 18.4659V11.4858C77.2235 11.3996 76.8234 11.3319 76.3679 11.2827C75.9124 11.2334 75.4877 11.2088 75.0938 11.2088C73.5057 11.2088 72.1023 11.6643 70.8835 12.5753C69.6648 13.474 68.7969 14.8035 68.2798 16.5639H67.9844V11.6151H60.358ZM81.6353 11.6151V39.9787H89.5018V11.6151H81.6353ZM82.5771 6.79545C83.4142 7.57102 84.4175 7.95881 85.587 7.95881C86.7565 7.95881 87.7537 7.57102 88.5785 6.79545C89.4156 6.00758 89.8342 5.06581 89.8342 3.97017C89.8342 2.88684 89.4156 1.95739 88.5785 1.18182C87.7537 0.39394 86.7565 0 85.587 0C84.4175 0 83.4142 0.39394 82.5771 1.18182C81.7523 1.95739 81.3399 2.88684 81.3399 3.97017C81.3399 5.06581 81.7523 6.00758 82.5771 6.79545ZM95.8033 11.6151V50.6151H103.67V35.4361H103.91C104.267 36.224 104.784 37.0057 105.461 37.7812C106.138 38.5445 107.006 39.1785 108.065 39.6832C109.136 40.188 110.434 40.4403 111.961 40.4403C114.115 40.4403 116.06 39.8864 117.796 38.7784C119.544 37.6581 120.923 36.0147 121.933 33.848C122.954 31.669 123.465 28.9976 123.465 25.8338C123.465 22.5838 122.942 19.8816 121.896 17.7273C120.849 15.5606 119.452 13.9418 117.704 12.8707C115.956 11.7874 114.048 11.2457 111.979 11.2457C110.391 11.2457 109.062 11.5166 107.991 12.0582C106.932 12.5876 106.07 13.2524 105.406 14.0526C104.753 14.8404 104.255 15.616 103.91 16.3793H103.559V11.6151H95.8033ZM104.205 30.2102C103.737 28.9545 103.504 27.4834 103.504 25.7969C103.504 24.1103 103.737 22.6454 104.205 21.402C104.673 20.1586 105.344 19.1984 106.218 18.5213C107.104 17.8442 108.188 17.5057 109.468 17.5057C110.761 17.5057 111.85 17.8565 112.737 18.5582C113.623 19.2599 114.294 20.2325 114.749 21.4759C115.205 22.7192 115.433 24.1596 115.433 25.7969C115.433 27.4465 115.199 28.9053 114.731 30.1733C114.275 31.429 113.604 32.4138 112.718 33.1278C111.832 33.8295 110.748 34.1804 109.468 34.1804C108.2 34.1804 107.123 33.8357 106.237 33.1463C105.35 32.4446 104.673 31.4659 104.205 30.2102ZM143.796 17.5241V11.6151H138.46V4.8196H130.593V11.6151H126.715V17.5241H130.593V32.2969C130.581 34.1558 130.969 35.6946 131.756 36.9134C132.544 38.1321 133.646 39.0308 135.062 39.6094C136.49 40.188 138.152 40.4403 140.048 40.3665C141.069 40.3295 141.937 40.2249 142.651 40.0526C143.365 39.8925 143.919 39.7509 144.313 39.6278L143.076 33.7742C142.879 33.8111 142.596 33.8665 142.227 33.9403C141.857 34.0019 141.488 34.0327 141.119 34.0327C140.589 34.0327 140.121 33.9527 139.715 33.7926C139.321 33.6326 139.014 33.3556 138.792 32.9617C138.57 32.5554 138.46 31.9891 138.46 31.2628V17.5241H143.796ZM14.0765 40.1613C11.1439 40.1613 8.62568 39.5245 6.52186 38.2508C4.43078 36.9772 2.81785 35.218 1.68306 32.9734C0.56102 30.7162 0 28.1184 0 25.1802C0 22.2294 0.573771 19.6254 1.72131 17.3681C2.86885 15.0982 4.48816 13.3328 6.57923 12.0718C8.68306 10.7981 11.1694 10.1613 14.0383 10.1613C16.4226 10.1613 18.5328 10.5964 20.3689 11.4665C22.2177 12.324 23.6903 13.5409 24.7869 15.1172C25.8834 16.6808 26.5082 18.5093 26.6612 20.6027H20.0437C19.776 19.2029 19.1384 18.0365 18.1311 17.1033C17.1366 16.1575 15.8042 15.6846 14.1339 15.6846C12.7186 15.6846 11.4754 16.0629 10.4044 16.8196C9.33333 17.5636 8.49818 18.6354 7.89891 20.0352C7.31239 21.4349 7.01913 23.1121 7.01913 25.0667C7.01913 27.0465 7.31239 28.7489 7.89891 30.1739C8.48543 31.5863 9.30783 32.6771 10.3661 33.4463C11.4372 34.2029 12.6931 34.5812 14.1339 34.5812C15.1539 34.5812 16.0656 34.3921 16.8689 34.0138C17.6849 33.6228 18.367 33.0617 18.9153 32.3303C19.4636 31.5989 19.8397 30.7098 20.0437 29.6632H26.6612C26.4954 31.7187 25.8834 33.5409 24.8251 35.1298C23.7668 36.7061 22.326 37.9419 20.5027 38.8372C18.6794 39.7199 16.5373 40.1613 14.0765 40.1613ZM41.9235 40.1613C44.8561 40.1613 47.3743 39.5245 49.4781 38.2508C51.5692 36.9772 53.1821 35.218 54.3169 32.9734C55.439 30.7162 56 28.1184 56 25.1802C56 22.2294 55.4262 19.6254 54.2787 17.3681C53.1311 15.0982 51.5118 13.3328 49.4208 12.0718C47.3169 10.7981 44.8306 10.1613 41.9617 10.1613C39.5774 10.1613 37.4672 10.5964 35.6311 11.4665C33.7823 12.324 32.3096 13.5409 31.2131 15.1172C30.1166 16.6808 29.4918 18.5093 29.3388 20.6027H35.9563C36.224 19.2029 36.8616 18.0365 37.8688 17.1033C38.8634 16.1575 40.1958 15.6846 41.8661 15.6846C43.2814 15.6846 44.5246 16.0629 45.5956 16.8196C46.6667 17.5636 47.5018 18.6354 48.1011 20.0352C48.6876 21.4349 48.9809 23.1121 48.9809 25.0667C48.9809 27.0465 48.6876 28.7489 48.1011 30.1739C47.5146 31.5863 46.6922 32.6771 45.6339 33.4463C44.5628 34.2029 43.3069 34.5812 41.8661 34.5812C40.8461 34.5812 39.9344 34.3921 39.1311 34.0138C38.3151 33.6228 37.633 33.0617 37.0847 32.3303C36.5364 31.5989 36.1603 30.7098 35.9563 29.6632H29.3388C29.5046 31.7187 30.1166 33.5409 31.1749 35.1298C32.2332 36.7061 33.6739 37.9419 35.4973 38.8372C37.3206 39.7199 39.4627 40.1613 41.9235 40.1613Z" fill="#0AA36E" />
                    </svg>
                </div>
                <form className="login-form">
                    <div className="form-group">
                        <label>Username:</label>
                        <input onChange={(e)=>setUser({...user,username:e.target.value})} type="text" id="username" name="username" placeholder='Enter username' />
                    </div>

                    <div className="form-group">
                        <label>Password:</label>
                        <input onChange={(e)=>setUser({...user,password:e.target.value})} type="password" id="password" name="password" placeholder='Enter password' />
                    </div>

                    <div className="form-group">
                        <button onClick={getData} type="submit">Sign in</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
