import React, {useEffect, useState} from "react";
import "./login.css";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { app } from "../firebase";
import {useNavigate} from "react-router-dom"


const Login = ()=>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
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
    


   
    const auth = getAuth(app);
    const handleLogin = () => {
signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    console.log("User Signed in successfully");
    
    navigate("/loggedin")
    // ...
  })
  .catch((error) => {
    setError(error.message);
    console.log("Error occured in login")
  });
}

    return(
    
        <>
        
            <div className='signup_container'>
                <h2>Login</h2>
                <div class="form-floating mb-1">
                    <input onChange={(e)=>setEmail(e.target.value)} type="email" class="form-control" id="floatingInput" placeholder="name@example.com" />
                    <label for="floatingInput">Email address</label>
                </div>
                <div class="form-floating mb-1">
                    <input onChange={(e)=>setPassword(e.target.value)} type="password" class="form-control" id="floatingPassword" 
                       placeholder="Password" />
                    <label for="floatingPassword">Password</label>
                </div>
    
                <Button onClick={handleLogin} class='btn-primary'>Login</Button>
                {error && <p className='error_message'>{error}</p>}
                <br/>
                <NavLink to="/forgotPassword">Forgot Password?</NavLink>
                
            </div>
            <div className='login_already_loginpage'>Don't Have Account? <NavLink to="/" >Signup</NavLink></div>
      
            </>
          


           
          
    
        );
    };
export default Login;
