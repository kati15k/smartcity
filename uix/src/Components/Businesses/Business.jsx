import React, { useState, useEffect } from "react";
import "./Business.css";
import { BsArrowRightShort, BsDot } from "react-icons/bs";
import Aos from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";

const KYOTO_COORDINATES = { lat: 35.0116, lng: 135.7681 }; // Kyoto's coordinates

const Business = () => {
  const [businesses, setBusinesses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    Aos.init({ duration: 2000 });

    // Ensure the Google Maps script is loaded
    if (window.google && window.google.maps) {
      fetchBusinesses();
    } else {
      // If Google Maps library is not yet loaded, wait for it
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyA0B0dPiRx42_4LmTaXWH925TXTgTqsB_U&libraries=places&language=en`;
      script.onload = fetchBusinesses;
      document.head.appendChild(script);
    }
  }, []);

  // Function to fetch businesses using Google Places API without pagination
  const fetchBusinesses = () => {
    const service = new window.google.maps.places.PlacesService(
      document.createElement("div")
    );

    const request = {
      location: new window.google.maps.LatLng(KYOTO_COORDINATES.lat, KYOTO_COORDINATES.lng),
      radius: 50000, // Set the radius to 50 km
      type: "establishment", // Using 'establishment' for more general business results
      keyword: "business", // Add a keyword to filter for business results specifically
    };

    // Fetch the results without pagination
    service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        // Process the results and update the state
        const processedResults = results.map((place) => ({
          id: place.place_id,
          imgSrc: place.photos ? place.photos[0].getUrl() : "placeholder.jpg", // Placeholder image if no photo
          desTitle: place.name,
          location: place.vicinity,
          grade: "Business", // Placeholder text for grade
        }));

        // Update the businesses state with the fetched results
        setBusinesses(processedResults);
      } else {
        console.error("Failed to fetch data:", status);
      }
    });
  };

  // Function to handle card click
  const handleCardClick = (id) => {
    navigate(`/business/${id}`);
  };

  return (
    <section className="location section popular">
      <div className="locContainer">
        <div style={{ height: "90px" }}></div>
        <div className="locHeader flex">
          <div data-aos="fade-right" data-aos-duration="2500" className="text-Div">
            <h2 className="locTitle">Kyoto's Businesses</h2>
            <p>Explore top businesses and institutions in Kyoto.</p>
          </div>
          <div data-aos="fade-left" data-aos-duration="2500" className="icons-Div flex"></div>
        </div>

        <div className="locContent grid">
          {businesses.map(({ id, imgSrc, desTitle, location, grade }) => (
            <div key={id} data-aos="fade-up" className="singleDestinations" onClick={() => handleCardClick(id)}>
              <div className="dest-Image">
                <img src={imgSrc} alt={desTitle} />
                <div className="overlayInfos">
                  <h3>{desTitle}</h3>
                  <p>{location}</p>
                  <BsArrowRightShort className="icon" />
                </div>
              </div>
              <div className="dest-Footer">
                <div className="destText flex">
                  <h6>{grade}</h6>
                  <span className="flex">
                    <span className="dot">
                      <BsDot className="icon" />
                    </span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Business;
