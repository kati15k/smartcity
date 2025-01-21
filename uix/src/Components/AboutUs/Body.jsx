import React, { useEffect } from "react";
import "./Body.css";

import img from '../../Assets/pic8.jpg';
import img3 from '../../Assets/pic5.jpg';
import img4 from '../../Assets/pic6.jpg'; 
import img5 from '../../Assets/pic7.jpg'; 

import Aos from 'aos';
import 'aos/dist/aos.css';

const Body = () => {

    useEffect(() => {
        Aos.init({ duration: 2000 });
    }, []);

    return (
        <section className="about">
            <div className="aboutContainer container">

                <div className="aboutContent reverse">
                    <div data-aos="fade-up" className="imageLeft">
                        <img src={img3} alt="Another Travel Image" className="img" />
                    </div>
                    <div data-aos="fade-up" className="textRight">
                        <h2>Introduction</h2>
                        <p>
                            Welcome to our Smart City Web App! We provide easy access to essential services, real-time data, and a sustainable urban experience for residents, visitors, and city authorities.
                        </p>
                    </div>
                </div>

                <div className="aboutContent notreverse">
                    <div data-aos="fade-up" className="imageRight">
                        <img src={img} alt="Another Travel Image" className="img" />
                    </div>
                    <div data-aos="fade-up" className="textLeft">
                        <h2>Mission Statement</h2>
                        <p>
                            Our mission is to enhance Kyoto’s livability by blending innovation with tradition, promoting sustainability, and improving the quality of life for all.
                        </p>
                    </div>
                </div>

                <div className="aboutContent reverse">
                    <div data-aos="fade-up" className="imageLeft">
                        <img src={img4} alt="Another Travel Image" className="img" />
                    </div>
                    <div data-aos="fade-up" className="textRight">
                        <h2>The Team Behind the App</h2>
                        <p>
                            Built by a single developer,with a deep passion for Kyoto’s unique blend of tradition and innovation. this app harmonizes technology with Kyoto's rich culture.
                        </p>
                    </div>
                </div>

                <div className="aboutContent notreverse">
                    <div data-aos="fade-up" className="imageRight">
                        <img src={img5} alt="Another Travel Image" className="img" />
                    </div>
                    <div data-aos="fade-up" className="textLeft">
                        <h2>Privacy and Security</h2>
                        <p>
                        Your privacy is our top priority. We comply with GDPR regulations. Your crucial data is encrypted and securely processed, ensuring the highest level of protection.
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Body;
