import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { GoogleMap, Marker } from "@react-google-maps/api";
import axios from "axios";
import "./Details.css";

const Details = () => {
  const location = useLocation();
  const { tableName, id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mapCenter, setMapCenter] = useState({});
  const [view, setView] = useState("details");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/info/${tableName}/${id}`);
        setData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Data not found');
        setLoading(false);
      }
    };

    fetchData();
  }, [tableName, id]);

  const geocodeAddress = async (name, address) => {
    const geocoder = new window.google.maps.Geocoder();

    // Construct a more specific query with the name, and address or description
    const query = `${name}, ${address}`; // Adding address for better results
    console.log('Geocoding query:', query);

    geocoder.geocode({
      address: query,
      componentRestrictions: { country: "JP" }
    }, (results, status) => {
      if (status === "OK" && results.length > 0) {
        const { lat, lng } = results[0].geometry.location;
        
  
        setMapCenter({ lat: lat(), lng: lng() });
      } else {
        console.error("Geocode was not successful for the following reason: " + status);
        setMapCenter({ lat: 35.0116, lng: 135.7681 }); // Default to Kyoto if geocoding fails
      }
    });
  };

  useEffect(() => {
    if (data && data.name && data.location) {
      geocodeAddress(data.name, data.location);
    }
  }, [data]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!data) {
    return <p>No data available for this {tableName}</p>;
  }

  const { name, description, location: address, img_url, image_path, established_year, website, salary, position, job_requirements, job_link, phone_number } = data;

  const isUniversity = window.location.pathname.includes("universities");
  const isAmusementPlace = window.location.pathname.includes("amusement_places");
  const isJob = window.location.pathname.includes("jobs");
  const isCompany = window.location.pathname.includes("companies");

  const markerIcon = {
    url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
    scaledSize: new window.google.maps.Size(50, 50),
  };

  return (
    <section className="details container section">
      <div className="detailsContainer">
        <div className="viewToggle">
          <button onClick={() => setView("details")} className={view === "details" ? "active" : ""}>
            Details View
          </button>
          <button onClick={() => setView("map")} className={view === "map" ? "active" : ""}>
            Map View
          </button>
        </div>

        {view === "details" && (
          <div className="detailsIntro">
            {isUniversity && (
              <div>
                <h2 className="detailsTitle" style={{ color: "var(--blackColor)" }}>{name}</h2>
                <img
                  src={img_url ? `http://localhost:8000/${img_url}` : "https://via.placeholder.com/150"}
                  alt={name}
                  className="detailImage"
                />
                <p><strong>Established:</strong> {established_year}</p>
                <p><strong>Website:</strong> <a href={website} target="_blank" rel="noopener noreferrer">{website}</a></p>
                <p><strong>Description:</strong> {description}</p>
              </div>
            )}

            {isAmusementPlace && (
              <div>
                <h2 className="detailsTitle" style={{ color: "var(--blackColor)" }}>{name}</h2>
                <img
                  src={img_url ? `http://localhost:8000/${img_url}` : "https://via.placeholder.com/150"}
                  alt={name}
                  className="detailImage"
                />
                <p><strong>Phone Number:</strong> {phone_number}</p>
                <p><strong>Description:</strong> {description}</p>
                <p><strong>Location:</strong> {address}</p>
              </div>
            )}

            {isJob && (
              <div>
                <h2 className="detailsTitle" style={{ color: "var(--blackColor)" }}>{position}</h2>
                <p><strong>Company:</strong> {name}</p>
                <p><strong>Salary Range:</strong> {salary}</p>
                <p><strong>Description:</strong> {job_requirements}</p>
                <p><strong>Apply On Recruiter's Site:</strong> <a href={job_link} className="primary-link" target="_blank" rel="noopener noreferrer">{job_link}</a></p>

              </div>
            )}

            {isCompany && (
              <div>
                <h2 className="detailsTitle" style={{ color: "var(--blackColor)" }}>{name}</h2>
                <img
                  src={image_path ? `http://localhost:8000/${image_path}` : "https://via.placeholder.com/150"}
                  alt={name}
                  className="detailImage"
                />
                <p><strong>Description:</strong> {description}</p>
                <p><strong>Location:</strong> {address}</p>
              </div>
            )}
          </div>
        )}

        {view === "map" && (
          <div className="mapSection">
            <GoogleMap
              center={mapCenter || { lat: 35.0116, lng: 135.7681 }}
              zoom={18}
              mapContainerStyle={{
                width: "100%",
                height: "400px",
                borderRadius: "8px",
              }}
            >
              {mapCenter && <Marker position={mapCenter} icon={markerIcon} />}
            </GoogleMap>
          </div>
        )}
      </div>
    </section>
  );
};

export default Details;
