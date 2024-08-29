import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import User from "./user";

const LoggedIn = ({Component})=>{
    const [isAuthenticated, setAuthenticate] = useState(false);
    const navigate = useNavigate();
    const isUser = getAuth().currentUser;
    useEffect(() => {
        const isUser = getAuth().currentUser;
        if (isUser) {
            setAuthenticate(true);
        } else {
            navigate("/login");
        }
    }, [navigate]);

    return isAuthenticated ? (<User/>) : null;
     
}

export default LoggedIn;