import React, { useEffect } from "react";
import "./Card.scss";


import { BiSolidSchool } from "react-icons/bi";
import { IoBusinessSharp } from "react-icons/io5";
import { GrAttraction } from "react-icons/gr";
import { FaBusinessTime } from "react-icons/fa6";

import Aos from 'aos';
import 'aos/dist/aos.css';

const Card = () => {

    useEffect(() => {
        Aos.init({ duration: 2000 });
    }, []);

    return (
        <section className="card section">
            <div className="cardContainer">
                <div className="cardContent container grid">
                    <div data-aos="fade-up" data-aos-duration="2000" className="singleItems" onClick={() => ('/#')}>
                       <BiSolidSchool size={50} className="icon" />
                        <h3>50+ Universities</h3>
                        <p>
                            Discover 50 universities and academic institutions offering a wide range of programs. 
                            <a href="/universities" className="card-link"> Learn more</a>
                        </p>
                    </div>

                    <div data-aos="fade-up" data-aos-duration="2500" className="singleItems" onClick={() => ('/#')}>
                    <IoBusinessSharp size={50} className="icon" />
                    <h3>200+ Businesses</h3>
                        <p>
                            Explore more than 200 businesses ranging from startups to well-established corporations. 
                            <a href="/businesses" className="card-link"> Learn more</a>
                        </p>
                    </div>

                    <div data-aos="fade-up" data-aos-duration="3000" className="singleItems" onClick={() => ('/#')}>
                    <GrAttraction size={50} className="icon" />
                    <h3>100+ Tourist Attractions</h3>
                        <p>
                            Over 100 tourist attractions await you in Osaka, each offering unique cultural experiences. 
                            <a href="/tourist-attractions" className="card-link"> Learn more</a>
                        </p>
                    </div>

                    <div data-aos="fade-up" data-aos-duration="3500" className="singleItems" onClick={() => ('/#')}>
                    <FaBusinessTime size={50} className="icon" />
                    <h3>+500 Job Opportunities</h3>
                        <p>
                            Access a wide range of job opportunities and career resources across various industries. 
                            <a href="/job-opportunities" className="card-link"> Learn more</a>
                        </p>
                    </div>
                </div>

                {/* Link below all cards */}
                <div className="global-link-container" data-aos="fade-up" data-aos-duration="2000">
                    <a href="/all-features" className="global-link">See All Features</a>
                </div>
            </div>
        </section>
    );
};

export default Card;
