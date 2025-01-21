import React,{useEffect} from "react";
import "./Home.scss";

import Aos from 'aos'
import 'aos/dist/aos.css'
import { Link } from "react-router-dom";

const Home = () => {
    
    useEffect(()=>{
        Aos.init({duration:2000})
    },[])

    return (
        <section className="home">
            <div className="secContainer container"> 
                <div className="homeText">
                    <h1 data-aos="fade-up" className="title">
                    A New Way to Experience Kyoto
                    </h1>
                    <p data-aos="fade-up" data-aos-duration="2500" className="subTitle">
                 Connect to the city and get closer to the very pulse of Kyoto                   
                        </p>
                    <button data-aos="fade-up" data-aos-duration="2000"  className="btn">
                       <Link to={'/login'}> Explore Now </Link>
                    </button>
                </div>
                <div className="homeCard "> 
                    <div  data-aos="fade-right" data-aos-duration="2500" className="locationDiv">
                        <label htmlFor="location">Enter a Destination</label>
                        <input type="text" placeholder="Dream Destination" />
                    </div>
                   
                    <button data-aos="fade-left" data-aos-duration="2000" className="btn">
                    <Link to={'/login'}> Search Destination </Link>
                    </button>
                </div>
            </div>
        </section>
    );
}
export default Home;
