import React, { useEffect, useState } from "react";
import { getAuth, signOut, sendEmailVerification } from "firebase/auth";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Expenses from "./expenses";
import "./user.css";

const User = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const isUser = auth.currentUser;
  const [isAuthenticated, setAuthenticate] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);

  useEffect(() => {
    if (isUser) {
      setAuthenticate(true);
      setEmailVerified(isUser.emailVerified);
    } else {
      navigate("/login");
    }
  }, [isUser, navigate]);

  const handleVerifyEmail = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        alert("Verification email sent successfully!");
      })
      .catch((error) => {
        console.error("Error sending verification email:", error.message);
        alert("Error sending verification email: " + error.message);
      });
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Redirect to login page after logout
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error signing out:", error.message);
        alert("Error signing out: " + error.message);
      });
  };

  return (
    <div>
      <div className="loggedIn_header">
        <div className="loginAck">You have logged in successfully</div>
        {isUser && isUser.displayName ? (
          <div className="profileCompleteness">Your Profile is 100% Complete</div>
        ) : (
          <div className="profileCompleteness">
            Your Profile is incomplete.
            <NavLink to="/updateProfile">Complete Now</NavLink>
          </div>
        )}
        <div className="logout_button" onClick={handleLogout}>
          <div>
            <i className="fa-solid fa-right-from-bracket"></i> Logout
          </div>
        </div>
      </div>
      {!emailVerified ? (
        <div className="verify_Email_button" onClick={handleVerifyEmail}>Verify Email</div>
      ) : (
        <div className="user_verified_message">
          <i className="fa-solid fa-check"></i> &nbsp; Your Email is verified
        </div>
      )}
      {emailVerified && <Expenses />}
    </div>
  );
};

export default User;
