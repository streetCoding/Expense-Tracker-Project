import React, { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { app } from '../firebase';
import { FloatingLabel, Form, Button } from 'react-bootstrap';
import "./signup.css";
import { NavLink, useNavigate } from 'react-router-dom';




const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setsuccess] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = getAuth().onAuthStateChanged((user) => {
            if (user) {
                // User is logged in
                navigate("/loggedin");
            }
        });

        // Cleanup function to unsubscribe from the listener
        return () => unsubscribe();
    }, [navigate]);

    const handleSignUp = () => {
        setError(null);
        setsuccess(null);
        if (!email || !password || !confirmPassword) {
            setError("Please fill in all fields");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        const auth = getAuth(app);

        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                console.log("user signed up successfully")
                setsuccess("Signed up successfully!!");
                return getAuth().signOut();
            }).then(()=>{
                alert("Signed Up Successfully. Please Login")
            })
            .catch((error) => {
                setError(error.message);
                console.log("error has occurred");
            });
    };

    return (
        <>
            <div className='signup_container'>
                <h2>Sign Up</h2>
                <div class="form-floating mb-1">
                    <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <label for="floatingInput">Email address</label>
                </div>
                <div class="form-floating mb-1">
                    <input type="password" class="form-control" id="floatingPassword" value={password}
                        onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                    <label for="floatingPassword">Password</label>
                </div>
                <div class="form-floating mb-4">
                    <input type="password" class="form-control" id="floatingConfirmPassword" value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" />
                    <label for="floatingConfirmPassword">Confirm Password</label>
                </div>

                <Button className='.btn-primary' onClick={handleSignUp}>Sign Up</Button>
                {error ? <p className='error_message'>{error}</p> : <p className='success_message'>{success}</p>}

            </div>
            <div className='login_already'>Already Have Account?<NavLink className="login_route_link" to="/login">Login</NavLink></div>
        </>

    );
};

export default SignUp;
