import React from "react";
import "../app.css"; 
import NavBar from "../Components/NavBar/NavBar"; 
import Body from "../Components/Login/Body";
import Footer from "../Components/Footer/Footer";
import { useStateContext } from "../Contexts/ContextProvider";
import { Navigate } from "react-router-dom";

const LoginScreen = () => {

    const { user, token } = useStateContext();
    
// If the user is authenticated, redirect to '/home'
if (token) {
    return <Navigate to='/home' />;
}
    return (
        <>
            <NavBar />
            <Body />
            <Footer />
        </>
    );
};

export default LoginScreen;
