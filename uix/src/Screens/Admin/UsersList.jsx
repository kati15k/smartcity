import React from "react";
import "../../../src/App.css"; 
import NavBar from "../../Components/AdminNavBar/NavbarAdmin";
import Footer from "../../Components/Footer/Footer";
import Body from "../../Components/UerList/UserList"; 
//import { useStateContext } from "../Contexts/ContextProvider";
///import { Navigate } from "react-router-dom";

const UserList = () => {

    return (
        <>
            <NavBar />
            <Body/>
            <Footer />
        </>
    );
};

export default UserList;
