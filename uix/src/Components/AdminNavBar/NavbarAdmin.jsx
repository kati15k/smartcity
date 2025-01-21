import React, { useState } from "react";
import "./NavBarAdmin.scss";
import { FaStreetView } from "react-icons/fa";
import { AiFillCloseCircle } from "react-icons/ai";
import { TbGridDots } from "react-icons/tb";
import { Link } from "react-router-dom";
import { LuReceiptJapaneseYen } from "react-icons/lu";


const AdminNavBar = () => {

    //toggle and show navbar
    const [active, setActive] = useState('navBar')
    //show NavBar
    const showNav = () => {
        setActive('navBar activeNavBar')
    }
    //remove navabr
    const removeNav = () => {
        setActive('navBar')
    }

    //header background color
    const [transparent, setTransparent] = useState('header')
    const [dropdownOpen, setDropdownOpen] = useState(false); // Dropdown state
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen); // Toggle dropdown

    const addBg = () => {
        if (window.scrollY >= 10) {
            setTransparent('header activeHeader')
        } else {
            setTransparent('header activeHeader')
        }
    }
    window.addEventListener('scroll', addBg)

    return (
        <section className="navBarSection">
            <div className={transparent}>
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
                            <Link to="/users" className="navLink">Users List</Link>
                        </li>

                        <li className="navItem">
                            <Link to="/reviews" className="navLink">Reviews List</Link>
                        </li>

                        <li className="navItem">
                            <Link to="/places" className="navLink">Destinations List</Link>
                        </li><li className="navItem">
                            <Link to="/dashboard" className="navLink">Businesses List</Link>
                        </li>

                        <div className="headerBtns flex">
                            <button className="btn loginBtn">
                                <Link to="/login" className="navLink">Login</Link>
                            </button>
                        </div>
                        <div className="headerBtns flex">
                            <button className="btn loginBtn">
                                <Link to="/register" className="navLink">Register</Link>
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

    )
}
export default AdminNavBar