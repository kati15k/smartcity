import React, { useEffect } from "react";
import "./Popular.css";

import img from "../../Assets/train.webp";
import img1 from "../../Assets/park.png";
import img2 from "../../Assets/temple.jpg";
import img3 from "../../Assets/path.avif";

import Aos from "aos";
import "aos/dist/aos.css";

const data = [
  {
    id: "1",
    name: "Sagano Scenic Railway (嵯峨野トロッコ列車)",
    location: "https://goo.gl/maps/5xFpzTKdGH8wEu5X9",
    description: "The Sagano Scenic Railway offers a picturesque ride through the Hozugawa River Valley.",
    imageUrl: img,
  },
  {
    id: "2",
    name: "Maruyama Park (円山公園)",
    location: "https://goo.gl/maps/JmREkWgn8uH5joDE7",
    description: "A serene public park known for its weeping cherry trees and tranquil atmosphere.",
    imageUrl: img1,
  },
  {
    id: "3",
    name: "Kinkaku-ji (金閣寺 - Golden Pavilion)",
    location: "https://goo.gl/maps/7uxynV9Se8rJ96A39",
    description: "A Zen temple covered in gold leaf, beautifully reflecting on the surrounding pond.",
    imageUrl: img2,
  },
  {
    id: "4",
    name: "Philosopher’s Path (哲学の道)",
    location: "https://goo.gl/maps/4J3ywoeFwzi6P9Ba8",
    description: "A charming stone walkway that follows a canal lined with cherry trees.",
    imageUrl: img3,
  },
];

const Popular = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <section className="popular section popular">
      <div className="secContainer">
        <div className="secHeader flex">
          <div data-aos="fade-right" data-aos-duration="2500" className="textDiv">
            <h2 className="secTitle">Popular Destinations</h2>
            <p>From historical landmarks to natural wonders, explore the best of Kyoto!</p>
          </div>
          <div data-aos="fade-left" data-aos-duration="2500" className="iconsDiv flex">
          </div>
        </div>

        <div className="mainContent grid">
          {data.map(({ id, imageUrl, name, location, description }) => (
            <div key={id} data-aos="fade-up" className="singleDestination">
              <div className="destImage">
                <img src={imageUrl} alt={name} />
                <div className="overlayInfo">
                  <h3>{name}</h3>
                  <p>{description}</p>
                  <a href={location} target="_blank" rel="noopener noreferrer" className="learnMoreLink">
                  </a>
                </div>
              </div>

              <div className="destFooter">
                <div className="number">0{id}</div>
                <div className="destText flex">
                  <h6>{name}</h6>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Popular;
