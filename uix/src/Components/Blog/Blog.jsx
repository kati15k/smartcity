import React, { useEffect } from "react";
import "./Blog.css";
import { BsArrowRightShort } from "react-icons/bs";

import img from '../../Assets/tachibana_enhanced.png'; 
import img1 from '../../Assets/kyocera_enhanced.jpg'; 
import img2 from '../../Assets/market.jpg';
import img3 from '../../Assets/bamboo.webp'; 

import Aos from 'aos';
import 'aos/dist/aos.css';

// Categorized sections for School, Company, Business, and Tourist Attraction
const Categories = [

  {
    id: 1,
    imgSrc: img, // Replace with specific image
    title: 'Kyoto Tachibana University',
    description: 'A leading institution focused on arts and cultural studies, offering a wide range of undergraduate and graduate programs in the heart of Kyoto.',
    link: 'https://www.tachibana-u.ac.jp/english/', // Replace with link to Kyoto Institute of Technology
  },
  {
    id: 3,
    imgSrc: img2, 
    title: 'Kyoto Nishiki Market',
    description: 'Kyoto’s famous shopping district, often referred to as “Kyoto’s Kitchen.” It offers a variety of food, traditional goods, and unique culinary experiences.',
    link: 'https://www.kyoto-nishiki.or.jp/en/', 
  },
  {
    id: 2,
    imgSrc: img1, // Replace with specific image
    title: 'Kyocera Corporation',
    description: 'A leading multinational corporation specializing in electronics, industrial ceramics, and solar energy products, headquartered in Kyoto.',
    link: 'https://www.kyocera.com/', // Link to Kyocera Corporation website
  },
  {
    id: 4,
    imgSrc: img3, // Replace with specific image
    title: 'Arashiyama Bamboo Grove',
    description: 'A breathtaking bamboo forest located in the Arashiyama district of Kyoto. It is a peaceful and photogenic destination with towering bamboo stalks.',
    link: 'https://arashiyamabambooforest.com/', // Link to Arashiyama Bamboo Grove information
  },
];

const Blog = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <section className="blog container section">
      <div className="secContainer">
        <div className="secIntro">
          <h2 data-aos="fade-up" data-aos-duration="2000" className="secTitle">
            Explore Kyoto: Schools, Companies, Businesses & Tourist Attractions
          </h2>
                  
        </div>
        <div className="mainContainer grid">
          {
            Categories.map(({ id, imgSrc, title, description, link }) => {
              return (
                <div data-aos="fade-up" data-aos-duration="2000" className="singlePost grid" key={id}>
                  <div className="imgDiv">
                    <img src={imgSrc} alt={title} />
                  </div>
                  <div className="postDetails">
                    <h3 data-aos="fade-up" data-aos-duration="3000">
                     {title}
                    </h3>
                    <p data-aos="fade-up" data-aos-duration="4000">
                      {description}
                    </p>
                  </div>
                  <a href={link} target="_blank"className="flex" data-aos="fade-up" data-aos-duration="4500">
                    Visit Website
                    <BsArrowRightShort className="icon" />
                  </a>
                </div>
              );
            })
          }
        </div>
      </div>
    </section>
  );
};

export default Blog;
