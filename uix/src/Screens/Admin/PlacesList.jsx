import React from "react";
import NavBar from "../../Components/AdminNavBar/NavbarAdmin";
import Footer from "../../Components/Footer/Footer";
import Places from "../../Components/Places/Places";

const PlacesList=()=>{

    return(
        <>
        <NavBar/>
        <Places/>
        <Footer/>
        </>
    );
}
export default PlacesList