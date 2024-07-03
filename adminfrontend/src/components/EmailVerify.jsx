import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from '../api/axios';


const EmailVerify = () => {
    const [validUrl, setValidUrl] = useState(true);
    const { id, token } = useParams(); // Destructure id and token from params

    useEffect(() => {
        const verifyEmailUrl = async () => {
            try {
                const url = `/${id}/verify/${token}`; // Correct URL construction
                const { data } = await axios.get(url);
                console.log(data);
                setValidUrl(true);
            } catch (error) {
                console.log(error);
                setValidUrl(false);
            }
        };
        verifyEmailUrl();
    }, [id, token]); // Ensure useEffect dependencies are correct

    return (
        <div>
            {validUrl ? (
                <div>
                    <h1>Email verified successfully</h1>
                    <Link to="/">
                        <button>Login</button>
                    </Link>
                </div>
            ) : (
                <h1>404 Not Found</h1>
            )}
        </div>
    );
};

export default EmailVerify;
