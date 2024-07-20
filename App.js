import React from "react"
import SignUp from "./components/signup/signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login/login";
import LoggedIn from "./components/loggedin/loggedin";
import UpdateProfile from "./components/loggedin/UpdateProfile";
import ForgotPassword from "./components/forgotPassword/forgotPassword";

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<SignUp />} />
                    <Route path="/login" element={<Login/>} />
                     <Route path = "/loggedin" element={<LoggedIn/>}/>
                     <Route path = "/updateProfile" element={<UpdateProfile/>}/>
                     <Route path= "/forgotPassword" element={<ForgotPassword/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App;