import React, { useState, useEffect } from "react";
import "./Amusement.css";
import { BsArrowRightShort, BsDot, BsHeart, BsHeartFill } from "react-icons/bs";
import Aos from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../axios-client";

const Amusement = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [weather, setWeather] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortDirection, setSortDirection] = useState("asc"); // Default is ascending
  const [favorites, setFavorites] = useState([]);

  const api = {
    key: "6e9f6cc9d05425be89455c584989700a",
    base: "https://api.openweathermap.org/data/2.5",
  };

  const fetchWeather = () => {
    fetch(`${api.base}/weather?q=Kyoto,jp&units=metric&appid=${api.key}`)
      .then((res) => res.json())
      .then((result) => setWeather(result))
      .catch((error) => console.error("Error fetching weather:", error));
  };

  const getRecommendation = () => {
    if (!weather) return "";

    const temp = weather.main.temp;
    const weatherCondition = weather.weather[0].main.toLowerCase();

    if (temp <= 10) {
      return "The temperature is quite low today. Wear warm clothing, such as a thick coat, scarf, and gloves. ❄️";
    } else if (weatherCondition.includes("rain")) {
      return "Rain is expected. 🌧️ Carry an umbrella or wear a raincoat. ☂️";
    } else if (temp >= 30) {
      return "It's quite hot today. 🥵 Stay hydrated and apply sunscreen. 🌞";
    } else {
      return "The weather seems pleasant. 🌤️ Enjoy outdoor activities!";
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    Aos.init({ duration: 2000 });
    fetchPlaces();
    fetchWeather();
  }, []);

  const fetchPlaces = () => {
    setLoading(true);
    axiosClient
      .get("/amusement")
      .then(({ data }) => setPlaces(data.data || []))
      .catch((error) => console.error("Error fetching places:", error))
      .finally(() => setLoading(false));
  };

  const handleCardClick = (id) => {
    navigate(`/info/amusement_places/${id}`);
  };

  const handleShare = (id, name) => {
    const url = `${window.location.origin}/info/jobs/${id}`;
    if (navigator.share) {
      navigator.share({
        title: `Check out ${name}`,
        url: url,
      }).catch((error) => console.error("Error sharing:", error));
    } else {
      navigator.clipboard.writeText(url)
        .then(() => alert(`Link copied to clipboard: ${url}`))
        .catch((error) => console.error("Error copying link:", error));
    }
  };

  const totalPages = Math.ceil(places.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = places
    .filter((place) =>
      place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.location.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortDirection === "asc") {
        return a.name.localeCompare(b.name); // A-Z (ascending)
      } else {
        return b.name.localeCompare(a.name); // Z-A (descending)
      }
    })
    .slice(startIndex, startIndex + itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const toggleFavorite = (placeId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(placeId)
        ? prevFavorites.filter((id) => id !== placeId)
        : [...prevFavorites, placeId]
    );
  };

  return (
    <section className="location section popular">
      <div className="locContainer">
        <div style={{ height: "90px" }}></div>
        <div className="locHeader flex">
          <div data-aos="fade-right" data-aos-duration="2500" className="text-Div">
            <h2 className="locTitle">Kyoto's Amusement Places</h2>
            {weather ? (
              <div className="weather-info">
                <h4>Current Weather in Kyoto</h4>
                <p>🌡️ Temperature: {weather.main.temp}°C</p>
                <p>🌥️ Condition: {weather.weather[0].description}</p>
                <p>💡 {getRecommendation()}</p>
              </div>
            ) : (
              <p>Loading weather...</p>
            )}
          </div>
        </div>

        <div className="search-sort">
          <input
            type="text"
            placeholder="Search places..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select onChange={(e) => setSortDirection(e.target.value)} value={sortDirection}>
            <option value="asc">Sort by Name A-Z</option>
            <option value="desc">Sort by Name Z-A</option>
          </select>
        </div>

        <div className="locContent grid">
          {loading ? (
            <p>Loading amusement places...</p>
          ) : currentItems.length > 0 ? (
            currentItems.map((place) => (
              <div
                key={place.id}
                data-aos="fade-up"
                className="singleDestinations"
                onClick={() => handleCardClick(place.id)}
              >
                <div className="dest-Image">
                  <img
                    src={place.img_url ? `http://localhost:8000/${place.img_url}` : "https://via.placeholder.com/150"}
                    alt={place.name || "Amusement Place"}
                  />
                  <div className="overlayInfos">
                    <h3>{place.name || "Name not available"}</h3>
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCardClick(place.id);
                      }}
                      className="job-Link"
                    >
                      <BsArrowRightShort className="icons1" />
                      Learn More
                    </span>
                    <button onClick={(e) => {
                      e.stopPropagation();
                      handleFavorites(id);
                    }} className="favorite-button">
                      {favorites.includes(id) ? "❤️" : "♡"}
                    </button>
                    <button onClick={(e) => {
                      e.stopPropagation();
                      handleShare(id, name);
                    }} className="share-button">
                      Share
                    </button>
                  </div>
                </div>
                <div className="dest-Footer">
                  <div className="destText flex">
                    <h6>Location: {place.location || "No location available"}</h6>
                    <span className="flex">
                      <BsDot className="icon" />
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No amusement places found.</p>
          )}
        </div>

        {totalPages > 1 && (
          <div className="pagination-controls">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`pagination-btn ${currentPage === 1 ? "disabled" : ""}`}
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`pagination-btn ${currentPage === totalPages ? "disabled" : ""}`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Amusement;
