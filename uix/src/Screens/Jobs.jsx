import React from "react";
import "../app.css"; 
import NavBar from "../Components/NavBar/NavBar"; 
import Footer from "../Components/Footer/Footer";
import Body from "../Components/JobsList/JobsList";

const Jobs = () => {
    return (
        <>
            <NavBar />
           <Body/>
           <Footer/>
            
        </>
    );
};

export default Jobs;
