import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Backdrop, CircularProgress } from "@mui/material";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [success, setsuccess] = useState(false);

    const handleSendVerification = () => {
        setIsLoading(true);
        sendPasswordResetEmail(getAuth(), email)
            .then(() => {
                // Password reset email sent successfully
                // You can redirect the user to a success page or display a success message
            })
            .catch((error) => {
                // Handle errors
                setError(error.message);
            })
            .finally(() => {
                setIsLoading(false);
                setsuccess(true);
            });
    };

    return (
        <>
            <div className='signup_container'>
                <h2>Forgot Password</h2>
                <div className="form-floating mb-1">
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        className="form-control"
                        id="floatingInput"
                        placeholder="name@example.com"
                    />
                    <label htmlFor="floatingInput">Email address</label>
                </div>
                <Button
                    className='btn-primary'
                    onClick={handleSendVerification}
                    disabled={isLoading}
                >
                    Send Verification Link
                </Button>
                {isLoading && (<>
                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open
                        
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop></>)}
                {success && <div className="success_message">Verification link has been sent successfully.</div>}
                {error && <p className='error_message'>{error}</p>}
            </div>
        </>
    );
};

export default ForgotPassword;
