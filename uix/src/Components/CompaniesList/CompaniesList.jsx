import React, { useEffect, useState } from "react";
import axiosClient from "../../axios-client";
import { BsArrowRightShort, BsDot } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import "./CompaniesList.scss";

const CompaniesList = () => {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [weather, setWeather] = useState(null);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [favorites, setFavorites] = useState([]); // Renamed to favorites
  const [sortOption, setSortOption] = useState("nameAsc");
  const [searchQuery, setSearchQuery] = useState("");

  const api = {
    key: "6e9f6cc9d05425be89455c584989700a",
    base: "https://api.openweathermap.org/data/2.5",
  };

  useEffect(() => {
    fetchCompanies();
    fetchWeather();

    // Load favorites from localStorage when the component mounts
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  useEffect(() => {
    const filtered = companies.filter(companies =>
      companies.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCompanies(filtered);
  }, [searchQuery, companies]);

  const fetchCompanies = () => {
    setLoading(true);
    axiosClient
      .get(`/companies?page=${currentPage}`)
      .then(({ data }) => {
        setCompanies(data.data);
        setTotalPages(data.total_pages);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching companies:", error);
        setLoading(false);
      });
  };

  const fetchWeather = () => {
    fetch(`${api.base}/weather?q=Kyoto,jp&units=metric&appid=${api.key}`)
      .then((res) => res.json())
      .then((result) => setWeather(result))
      .catch((error) => console.error("Error fetching weather:", error));
  };

  const handleShare = (id, name) => {
    const url = `${window.location.origin}/info/companies/${id}`;
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
  };

  const handleFavorites = (id) => {
    const updatedFavorites = favorites.includes(id)
      ? favorites.filter((favId) => favId !== id)
      : [...favorites, id];

    // Save the updated favorites list in localStorage
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };

  const handleSort = (option) => {
    const sorted = [...filteredCompanies].sort((a, b) => {
      switch (option) {
        case "nameAsc":
          return a.name.localeCompare(b.name);
        case "nameDesc":
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });
    setFilteredCompanies(sorted);
    setSortOption(option);
  };

  const handlePrevPage = () => currentPage > 1 && setCurrentPage((prev) => prev - 1);
  const handleNextPage = () => currentPage < totalPages && setCurrentPage((prev) => prev + 1);
  const handleCardClick = (id) => navigate(`/info/companies/${id}`);

  return (
    <section className="location section">
      <div className="locContainer">
        <div className="locHeader flex">
          <div data-aos="fade-right" data-aos-duration="2500" className="text-Div">
            <h2 className="locTitle">Kyoto's Businesses Companies</h2>
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
                  placeholder="Search companies..."
                  className="search-bar"
                />
                <select
                  value={sortOption}
                  onChange={(e) => handleSort(e.target.value)}
                  className="sort-dropdown"
                >
                  <option value="nameAsc">Sort Name A-Z</option>
                  <option value="nameDesc">Sort Name Z-A</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="locContent grid">
          {loading ? (
            <p>Loading companies...</p>
          ) : filteredCompanies.length > 0 ? (
            filteredCompanies.map(({ id, name, location, description, image_path }) => (
              <div
                key={id}
                data-aos="fade-up"
                className="singleDestinations"
                onClick={() => handleCardClick(id)}
              >
                <div className="dest-Image">
                  <img
                    src={image_path ? `http://localhost:8000/${image_path}` : "https://via.placeholder.com/150"}
                    alt={name}
                  />
                  <div className="overlayInfos">
                    <h3>{name}</h3>
                    <div className="learnMoreLink">
                      <span
                        onClick={() => handleCardClick(id)} // Ensure the correct click event for navigation
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
                </div>
                <div className="dest-Footer">
                  <div className="destText flex">
                    <h6>Location: {location}</h6>
                    <span className="flex">
                      <span className="dot">
                        <BsDot className="icons" />
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No companies found.</p>
          )}
        </div>

        {totalPages > 1 && (
          <div className="pagination-controls">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="pagination-btn"
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="pagination-btn"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default CompaniesList;
