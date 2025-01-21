import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Screens/HomeScreen";
import Login from "./Screens/LoginScreen";
import Register from "./Screens/RegisterScreen";
import Welcome from "./Screens/Welcome";
import AboutUs from "./Screens/AboutUsScreen";
import UserHome from "./Screens/UserHome";
import DetailsPage from "./Screens/DetailsPage";

const App =() => {
    return (
        <Router>
            <Routes>
                {/* Define Home as the default route */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Register/>} />
                <Route path="/welcome" element={<Welcome/>} />
                <Route path="/about" element={<AboutUs/>} />
                <Route path="/user" element={<UserHome/>} />
                <Route path="/details/:id" element={<DetailsPage />} />
            </Routes>
        </Router>
    );
};

export default App;
