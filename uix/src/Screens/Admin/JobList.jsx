import React from "react";
import NavBar from "../../Components/AdminNavBar/NavbarAdmin";
import Footer from "../../Components/Footer/Footer";
import Unis from "../../Components/AdminJobList/Jobs";

const PlacesList=()=>{

    return(
        <>
        <NavBar/>
        <Unis/>
        <Footer/>
        </>
    );
}
export default PlacesList