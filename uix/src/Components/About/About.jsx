import React, { useEffect } from "react";
import "./about.scss";

import vid from '../../Assets/bgvideo.mp4';
import img from '../../Assets/thumpic.webp';

import Aos from 'aos'
import 'aos/dist/aos.css'

const About = () => {

    useEffect(() => {
        Aos.init({ duration: 2000 })
    }, [])
    return (
        <section className="about section">
            <div className="secContainer">
                <div className="title">
                    Why Kyoto?
                </div>
                <div className="mainContent container grid">
                    <div data-aos="fade-up" data-aos-duration="2000" className="singleItem">
                        <h3>
                            Rich Cultural Heritage
                        </h3>
                        <p>
                            Kyoto is home to over 1,600 temples and shrines, making it the heart of Japan's cultural and religious history.
                        </p>
                    </div>      

                    <div data-aos="fade-up" data-aos-duration="3000" className="singleItem">
                        <h3>
                            Unique Kyoto Cuisine
                        </h3>
                        <p>
                            Kyoto is famous for its delicate kaiseki meals, matcha-based sweets, and traditional tea ceremonies.
                        </p>
                    </div>
                    <div data-aos="fade-up" data-aos-duration="3000" className="singleItem">
                        <h3>
                        Traditional Festivals
                        </h3>
                        <p>
                            Kyoto hosts world-famous festivals like the Gion Matsuri, showcasing the city's vibrant traditions, parades, and performances.
                        </p>
                    </div>

                </div>

                <div className="videoCard container">
                    <div className="cardContent grid">
                        <div data-aos="fade-right" data-aos-duration="2000" className="cardText">
                            <h2>
                               Experience Kyoto's Charm
                            </h2>
                            
                          
                        </div>
                        <div data-aos="fade-left" data-aos-duration="2500" className="cardVideo">
                            <video src={vid} autoPlay loop muted
                                type="video/mp4"> </video>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    )
}
export default About