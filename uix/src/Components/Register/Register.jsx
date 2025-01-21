import React, { useEffect, useRef } from "react";
import "./Register.css";
import img from "../../Assets/tryhome_enhanced.jpg";
import Aos from "aos";
import "aos/dist/aos.css";
import axiosClient from "../../axios-client";
import { useStateContext } from "../../Contexts/ContextProvider";
import { Navigate, Link } from "react-router-dom";


const Register = () => {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    //const confirmPasswordRef = useRef();

    const { setUser, setToken } = useStateContext();

    useEffect(() => {
        Aos.init({ duration: 2000 });
    }, []);

    const onSubmit = async (ev) => {
        ev.preventDefault();
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            //confirm_password: confirmPasswordRef.current.value,
        };

        try {
            const { data } = await axiosClient.post('/register', payload);
            setUser(data.user);
            setToken(data.token);
            //console.log("User registered:", data.user);
            //console.log("Token set:", data.token);
        } catch (err) {
            if (err.response) {
                console.error("Error:", err.response.data);
                alert(err.response.data.message || "Registration failed.");
            } else {
                console.error("Error:", err);
                alert("An unexpected error occurred.");
            }
        }
    };

    return (
        <section className="form">
            <div className="contentForm">
                {/* Left Half: Image */}
                <div className="left">
                    <img src={img} className="image" alt="Descriptive Alt Text" />
                </div>

                {/* Right Half: Form */}
                <div className="right">
                    <div style={{ height: '100px' }}></div>
                    <h1 className="registerText">Please Register To acess More Details </h1>
                    <div className="formContainer">
                        <div className="formCard">
                            {/* Form with onSubmit handler */}
                            <form onSubmit={onSubmit}>
                                {/* Name Field */}
                                <div className="emailDiv" data-aos="fade-right" data-aos-duration="2500">
                                    <label>User Name</label>
                                    <input ref={nameRef} id="name" name="name" placeholder="UserName" required />
                                </div>

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
                                <button className="registerbtn" data-aos="fade-left" data-aos-duration="2000">
                                    Register
                                </button>
                            </form>
                            {/* Login Link */}
                            <p className="loginText">
                                Already have an account? <Link to="/login">Login here</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Register;
