import React, { useEffect, useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./user.css";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const isUser = auth.currentUser;

  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");

  useEffect(() => {
    if (!isUser) {
      navigate("/login"); // Redirect to login if user is not authenticated
    } else {
      // Pre-fill current user data if available
      setDisplayName(isUser.displayName || "");
      setPhotoURL(isUser.photoURL || "");
    }
  }, [isUser, navigate]);

  const handleUpdate = () => {
    if (isUser) {
      updateProfile(isUser, {
        displayName: displayName,
        photoURL: photoURL
      })
        .then(() => {
          alert("Profile updated successfully!");
          // Optionally, you can navigate or perform other actions
        })
        .catch((error) => {
          console.error("Error updating profile:", error.message);
          alert("Error updating profile: " + error.message);
        });
    }
  };

  return (
    <>
      <div className="loggedIn_header">
        <div className="loginAck">Winners never Quit, Quitters never win.</div>
        <div className="profileCompleteness">
          Your Profile is 64% complete.
        </div>
      </div>
      <div className="input_form_update">
        <div className="update_input_fields">
          Display Name: <input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
        </div>
        <div className="update_input_fields_1">
          Profile Photo URL: <input type="text" value={photoURL} onChange={(e) => setPhotoURL(e.target.value)} />
        </div>
        <div className="submit_button" onClick={handleUpdate}>Update</div>
      </div>
    </>
  );
};

export default UpdateProfile;
