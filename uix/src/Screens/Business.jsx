import React from "react";
import "../app.css"; 
import NavBar from "../Components/NavBar/NavBar"; 
import Footer from "../Components/Footer/Footer";
import Business from "../Components/Businesses/Business";

const DetailsPage = () => {
    return (
        <>
            <NavBar />
           <Business/>
            <Footer />
        </>
    );
};

export default DetailsPage;
