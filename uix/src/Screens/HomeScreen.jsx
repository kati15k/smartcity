import React from "react";
import "../app.css";
import NavBar from "../Components/NavBar/NavBar";
import Home from "../Components/Home/Home";
import Popular from "../Components/Popular/Popular";
import Offers from "../Components/Offers/Offers";
import About from "../Components/About/About";
import Blog from "../Components/Blog/Blog";
import Footer from "../Components/Footer/Footer";
import { useStateContext } from "../Contexts/ContextProvider";
import { Navigate } from "react-router-dom";

const HomeScreen = () => {
    /*const { token } = useStateContext();
    if (token) {
        return <Navigate to='/home' />;
    }*/

    return (
        <>
        
            <NavBar />
            <Home />
            <Popular />
            <About />
            <Offers />
            <Blog />
            <Footer />
        </>
    );
};

export default HomeScreen;
