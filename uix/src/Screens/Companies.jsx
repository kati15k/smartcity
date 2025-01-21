import React from "react";
import "../app.css"; 
import NavBar from "../Components/NavBar/NavBar"; 
import Footer from "../Components/Footer/Footer";
import Body from "../Components/CompaniesList/CompaniesList";

const Companies = () => {
    return (
        <>
            <NavBar />
            <Body/>
            <Footer />
        </>
    );
};

export default Companies;
