import React from "react";
import "../app.css"; 
import NavBar from "../Components/NavBar/NavBar"; 
import Footer from "../Components/Footer/Footer";
import Details from "../Components/Details/Details";
import Review from "../Components/Review/Review";

const DetailsPage = () => {
    return (
        <>
            <NavBar />
           <Details/>
           <Review/>
           <Footer/>
            
        </>
    );
};

export default DetailsPage;
