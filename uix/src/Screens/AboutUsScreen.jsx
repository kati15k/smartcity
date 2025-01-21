import React from "react";
import "../app.css"; 
import NavBar from "../Components/NavBar/NavBar"; 
import Footer from "../Components/Footer/Footer";
import Body from "../Components/AboutUs/Body"; 
import { useStateContext } from "../Contexts/ContextProvider";
import { Navigate } from "react-router-dom";

const AboutUsScreen = () => {

   /* const { user, token } = useStateContext();
    if (!token) {
        return <Navigate to='/login' />;
    }*/
    return (
        <>
            <NavBar />
            <Body />
            <Footer />
        </>
    );
};

export default AboutUsScreen;
