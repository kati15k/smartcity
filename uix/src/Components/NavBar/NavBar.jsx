import React, { useState } from "react";
import "./NavBar.scss";
import { FaStreetView } from "react-icons/fa";
import { AiFillCloseCircle } from "react-icons/ai";
import { TbGridDots } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { LuReceiptJapaneseYen } from "react-icons/lu";
import { useStateContext } from "../../Contexts/ContextProvider";

const NavBar = () => {
    const [active, setActive] = useState('navBar');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { setUser, setToken } = useStateContext();
    const navigate = useNavigate();

    const showNav = () => {
        setActive('navBar activeNavBar');
    };

    const removeNav = () => {
        setActive('navBar');
    };

    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    const handleLogout = () => {
        if (window.confirm("Are you sure you want to logout?")) {
            setUser(null);
            setToken(null);
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            navigate("/login");
        }
    };

    return (
        <section className="navBarSection">
            <div className="header activeHeader">
                <div className="logoDiv">
                    <a href="/" className="logo">
                        <h1 className="flex">
                            <LuReceiptJapaneseYen className="icon" />
                            KyotoKeen
                        </h1>
                    </a>
                </div>

                <div className={active}>
                    <ul className="navLists flex">
                        <li className="navItem">
                            <Link to="/academic" className="navLink">Academics</Link>
                        </li>
                        <li className="navItem">
                            <Link to="/amusement" className="navLink">Destinations</Link>
                        </li>
                        <li className="navItem">
                            <Link to="/text" className="navLink">Communication</Link>
                        </li>
                        <li className="navItem">
                            <Link to="/companies" className="navLink">Businesses</Link>
                        </li>
                        <li className="navItem">
                            <Link to="/manners" className="navLink">Culture</Link>
                        </li>
                        <li className="navItem">
                            <Link to="/jobs" className="navLink">Jobs</Link>
                        </li>
                        <li className="navItem">
                            <Link to="/about" className="navLink">About Us</Link>
                        </li>
                        <div className="headerBtns flex">
                            <button className="btn loginBtn" onClick={handleLogout}>
                                Logout
                            </button>
                        </div>
                    </ul>
                    <div onClick={removeNav} className="closeNavBar">
                        <AiFillCloseCircle className="icon" />
                    </div>
                </div>

                <div onClick={showNav} className="toggleNavBar">
                    <TbGridDots className="icon" />
                </div>
            </div>
        </section>
    );
};

export default NavBar;
