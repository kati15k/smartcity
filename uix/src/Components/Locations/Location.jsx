import React, { useState, useEffect } from "react";
import "./Location.scss";
import { BsArrowRightShort } from "react-icons/bs";
import Aos from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
import axiosClient from '../../axios-client';

const Location = () => {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); 
  const [filteredSchools, setFilteredSchools] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [sortOption, setSortOption] = useState("nameAsc"); 
  const navigate = useNavigate();

  const api = {
    key: "6e9f6cc9d05425be89455c584989700a",
    base: "https://api.openweathermap.org/data/2.5",
  };

  useEffect(() => {
    Aos.init({ duration: 2000 });
    getPlaces();
    getWeather();

    // Load favorites from localStorage when the component mounts
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  const getPlaces = () => {
    setLoading(true);
    axiosClient.get('/academic')
      .then(({ data }) => {
        setSchools(data.data);
        setFilteredSchools(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  const getWeather = () => {
    fetch(`${api.base}/weather?q=Kyoto,jp&units=metric&appid=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
      })
      .catch((error) => console.error("Error fetching weather:", error));
  };

  const getRecommendation = () => {
    if (!weather) return "";
    const temp = weather.main.temp;
    const weatherCondition = weather.weather[0].main.toLowerCase();
    if (temp <= 10) {
      return "The temperature is quite low today. It is advisable to wear warm clothing, such as a thick coat, scarf, and gloves, to ensure your comfort. ❄️";
    } else if (weatherCondition.includes("rain")) {
      return "Rain is expected in the area. 🌧️ Please consider carrying an umbrella or wearing a raincoat. ☂️ ";
    } else if (temp >= 30) {
      return "The temperature is significantly high today. 🥵 It is highly recommended to carry a bottle of water to remain hydrated and apply sunscreen to protect your skin from UV exposure. 🌞 ";
    } else {
      return "The weather appears pleasant and moderate. 🌤️ You may enjoy outdoor activities without concern.";
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    const filtered = schools.filter(school =>
      school.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredSchools(filtered);
  };

  const handleFavorites = (id) => {
    const updatedFavorites = favorites.includes(id)
      ? favorites.filter(fav => fav !== id)
      : [...favorites, id];

    setFavorites(updatedFavorites);

    // Save updated favorites to localStorage
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const handleSort = (option) => {
    const sorted = [...filteredSchools].sort((a, b) => {
      switch (option) {
        case "nameAsc":
          return a.name.localeCompare(b.name);
        case "nameDesc":
          return b.name.localeCompare(a.name);
        case "yearAsc":
          return a.established_year - b.established_year;
        case "yearDesc":
          return b.established_year - a.established_year;
        default:
          return 0;
      }
    });
    setFilteredSchools(sorted);
    setSortOption(option);
  };

  const handleShare = (id, name) => {
    const url = `${window.location.origin}/info/universities/${id}`;
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

  const handleCardClick = (id) => {
    navigate(`/info/universities/${id}`);
  };

  return (
    <section className="location section popular">
      <div className="locContainer">
        <div style={{ height: "90px" }}></div>
        <div className="locHeader flex">
          <div data-aos="fade-right" data-aos-duration="2500" className="text-Div">
            <h2 className="locTitle">Academic Institutions in Kyoto</h2>
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
            <div className="sort-options">
              <div className="search-container">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearch}
                  placeholder="Search academic institutions..."
                  className="search-bar"
                />
                <select
                  value={sortOption}
                  onChange={(e) => handleSort(e.target.value)}
                  className="sort-dropdown"
                >
                  <option value="nameAsc">Sort Name A-Z</option>
                  <option value="nameDesc">Sort Name Z-A</option>
                  <option value="yearAsc">Sort Year Ascending</option>
                  <option value="yearDesc">Sort Year Descending</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="locContent grid">
          {loading ? (
            <p>Loading...</p>
          ) : (
            filteredSchools.map(({ id, name, img_url, established_year, website }) => (
              <div key={id} data-aos="fade-up" className="singleDestinations" onClick={() => handleCardClick(id)}>
                <div className="dest-Image">
                  <img
                    src={img_url ? `http://localhost:8000/${img_url}` : "https://via.placeholder.com/150"}
                    alt={name}
                  />
                  <div className="overlayInfos">
                    <h3>{name}</h3>
                    <p>
                      <a href={website} target="_blank" rel="noopener noreferrer" className="website-link">
                        {website}
                      </a>
                    </p>
                    <span className="job-Link">
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
                  <h6>Established: {established_year}</h6>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Location;
