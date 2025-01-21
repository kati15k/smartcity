import React from "react";
import "../app.css"; 
import NavBar from "../Components/NavBar/NavBar"; 
import Card from "../Components/Card/Card";
import Footer from "../Components/Footer/Footer";
import { useStateContext } from "../Contexts/ContextProvider";
import { Navigate } from "react-router-dom";

const Welcome = () => {

    /*const { user, token } = useStateContext();
    if (!token) {
        return <Navigate to='/login' />;
    }*/

    return (
        <>
            <NavBar />
            <Card />
            <Footer />
        </>
    );
};

export default Welcome;
