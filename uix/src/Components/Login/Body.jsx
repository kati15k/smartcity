import React, { useEffect, useRef, useState } from "react";
import "./Body.css";
import img from "../../Assets/tryhome_enhanced.jpg";
import Aos from "aos";
import "aos/dist/aos.css";
import axiosClient from "../../axios-client";
import { useStateContext } from "../../Contexts/ContextProvider";
import { Navigate, Link } from "react-router-dom";


const Body = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { setUser, setToken } = useStateContext();

    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        Aos.init({ duration: 2000 });
    }, []);

    // On submit function to handle form submission
    const onSubmit = async (ev) => {
        ev.preventDefault();
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };

        try {
            const { data } = await axiosClient.post('/login', payload);
            setUser(data.user);
            setToken(data.token);
            setRedirect(true);  // Set state to trigger redirection
            console.log("User logged in:", data.user);
            console.log("Token set:", data.token);
        } catch (err) {
            if (err.response) {
                console.error("Error:", err.response.data);
                alert(err.response.data.message || "Login failed.");
            } else {
                console.error("Error:", err);
                alert("An unexpected error occurred.");
            }
        }
    };

    // If redirect state is true, navigate to '/home'
    if (redirect) {
        return <Navigate to="/academic" />;
    }

    return (
        <section className="form">
            <div className="contentForm">
                {/* Left Half: Image */}
                <div className="left">
                    <img src={img} className="image" alt="Descriptive Alt Text" />
                </div>

                {/* Right Half: Form */}
                <div className="right">
                    <div style={{height:'100px'}}></div>
                <h1 className="registerText">Please Login To acess More Details </h1>
                    <div className="formContainer">
                   
                        <div className="formCard">
                           
                            {/* Form with onSubmit handler */}
                            <form onSubmit={onSubmit}>
                                {/* Email Field */}
                                <div className="emailDiv" data-aos="fade-right" data-aos-duration="2500">
                                    <label htmlFor="email">Email</label>
                                    <input ref={emailRef} type="email" id="email" name="email" placeholder="Email" required />
                                </div>

                                {/* Password Field */}
                                <div className="passDiv" data-aos="fade-right" data-aos-duration="3000">
                                    <label htmlFor="password">Password</label>
                                    <input ref={passwordRef} type="password" id="password" name="password" placeholder="Password" required />
                                </div>

                                {/* Submit Button */}
                                <button className="loginbtn" data-aos="fade-left" data-aos-duration="2000">
                                    Login
                                </button>
                            </form>
                            {/* Register Link */}
                            <p className="loginText">
                                Don't have an account? <Link to="/register">Register here</Link>
                            </p>
                        
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Body;
