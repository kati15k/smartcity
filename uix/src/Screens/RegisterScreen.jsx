import React from "react";
import "../app.css";
import NavBar from "../Components/NavBar/NavBar";
import Register from "../Components/Register/Register";
import Footer from "../Components/Footer/Footer";
import { useStateContext } from "../Contexts/ContextProvider";
import { Navigate } from "react-router-dom";

const RegisterScreen = () => {
    const { user, token } = useStateContext();
    
    // If the user is authenticated, redirect to '/home'
    if (token) {
        return <Navigate to='/home' />;
    }

    // If not authenticated, show the RegisterScreen
    return (
        <>
            <NavBar />
            <Register />
            <Footer />
        </>
    );
};

export default RegisterScreen;
