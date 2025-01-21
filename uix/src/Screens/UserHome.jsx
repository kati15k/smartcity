import React from "react";
import "../app.css"; 
import NavBar from "../Components/NavBar/NavBar"; 
import Footer from "../Components/Footer/Footer";
import Location from "../Components/Locations/Location";
import {Navigate } from "react-router-dom";
import { useStateContext } from "../Contexts/ContextProvider";

const UserHome = () => {
    /*const { user, token } = useStateContext();
    if (!token) {
        return <Navigate to='/login' />;

    }*/
    
    return (
        <>
            <NavBar />
            <Location />
            <Footer />
        </>
    );
};

export default UserHome;
