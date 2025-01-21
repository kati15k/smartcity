import React from "react";
import NavBar from "../../Components/AdminNavBar/NavbarAdmin";
import Footer from "../../Components/Footer/Footer";
import Places from "../../Components/AdminCompaniesList/AdminCompaniesList";

const List=()=>{

    return(
        <>
        <NavBar/>
        <Places/>
        <Footer/>
        </>
    );
}
export default List