import React, { useEffect, useState } from 'react';
import './Jobs.scss';
import axiosClient from '../../axios-client';
import { useNavigate } from 'react-router-dom';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '300px',
};

const defaultCenter = { lat: 35.0116, lng: 135.7681 }; // Kyoto, Japan

const JobList = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPlace, setCurrentPlace] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    position: '', // New field
    salary: '', // New field
    job_requirements: '', // New field
    job_link: '', // New field
  });

  const navigate = useNavigate();
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyA0B0dPiRx42_4LmTaXWH925TXTgTqsB_U', // Replace with your API key
    libraries: ['places'], // Make sure places library is included
  });

  useEffect(() => {
    getPlaces(currentPage);
  }, [currentPage]);

  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    const locationString = `Latitude: ${lat.toFixed(4)}, Longitude: ${lng.toFixed(4)}`;
    setFormData({ ...formData, location: locationString });
  };

  const renderMap = () => {
    if (loadError) return <p>Error loading map</p>;
    if (!isLoaded) return <p>Loading map...</p>;

    return (
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={defaultCenter}
        zoom={12}
        onClick={handleMapClick}
      >
        <Marker position={defaultCenter} label={formData.location} />
      </GoogleMap>
    );
  };

  const getPlaces = (page) => {
    setLoading(true);
    axiosClient
      .get(`/job_list?page=${page}&per_page=10`)
      .then(({ data }) => {
        setPlaces(data.data);
        setTotalPages(data.last_page);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch places:', err);
        setLoading(false);
      });
  };

  const onDelete = (placeId) => {
    if (!window.confirm('Are you sure you want to delete this place?')) return;
    axiosClient
      .delete(`/job_list/${placeId}`)
      .then(() => {
        setPlaces(places.filter((place) => place.id !== placeId));
      })
      .catch((err) => {
        console.error('Failed to delete place:', err);
      });
  };

  const AddPlace = () => {
    setFormData({
      name: '',
      position: '',
      salary: '',
      job_requirements: '',
      job_link: '',
    });
    setIsEditing(false);
    setShowModal(true);
    setCurrentPlace(null);
  };

  const onSubmit = (ev) => {
    ev.preventDefault();

    const dataToSend = {
      name: formData.name,
      position: formData.position,
      salary: formData.salary,
      job_requirements: formData.job_requirements,
      job_link: formData.job_link,
    };

    if (isEditing && currentPlace?.id) {
      axiosClient
        .put(`/job_list/${currentPlace.id}`, dataToSend)
        .then(({ data }) => {
          setPlaces(places.map((place) => (place.id === currentPlace.id ? data : place)));
          setShowModal(false);
        })
        .catch((err) => console.error('Error updating place:', err));
    } else {
      axiosClient
        .post('/job_list', dataToSend)
        .then(({ data }) => {
          setPlaces([{ ...data, ...formData }, ...places]);
          setShowModal(false);
        })
        .catch((err) => console.error('Error creating place:', err));
    }
  };

  return (
    <div className="user-container">
      <div style={{ height: '100px' }}></div>
      <h1 className="user-Title">Academic Places Management</h1>
      <button className="user-btn" onClick={AddPlace}>Add New Place</button>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{isEditing ? 'Edit Place' : 'Add New Place'}</h2>

            {/* Name */}
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(ev) => setFormData({ ...formData, name: ev.target.value })}
                placeholder="Enter name"
              />
            </div>

            {/* Position */}
            <div className="form-group">
              <label>Position</label>
              <input
                type="text"
                value={formData.position}
                onChange={(ev) => setFormData({ ...formData, position: ev.target.value })}
                placeholder="Enter position"
              />
            </div>

            {/* Salary */}
            <div className="form-group">
              <label>Salary</label>
              <input
                type="text"
                value={formData.salary}
                onChange={(ev) => setFormData({ ...formData, salary: ev.target.value })}
                placeholder="Enter salary"
              />
            </div>

            {/* Job Requirements */}
            <div className="form-group">
              <label>Job Requirements</label>
              <textarea
                value={formData.job_requirements}
                onChange={(ev) => setFormData({ ...formData, job_requirements: ev.target.value })}
                placeholder="Enter job requirements"
              />
            </div>

            {/* Job Link */}
            <div className="form-group">
              <label>Job Link</label>
              <input
                type="text"
                value={formData.job_link}
                onChange={(ev) => setFormData({ ...formData, job_link: ev.target.value })}
                placeholder="Enter job link"
              />
            </div>

            <div className="modal-actions flex">
              <button className="user-btn" onClick={onSubmit}>
                {isEditing ? 'Save' : 'Add Place'}
              </button>
              <button className="user-btn delete" onClick={() => setShowModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <p>Loading places...</p>
      ) : (
        <div className="user-grid">
          {places.map((place) => {
            return (
              <div key={place.id} className="user-card">
                <h3>{place.name}</h3>
                <p>Position: {place.position}</p>
                <p>Salary: {place.salary}</p>
                <p>Job Requirements: {place.job_requirements}</p>
                <p>Job Link: <a href={place.job_link} target="_blank" rel="noopener noreferrer">{place.job_link}</a></p>
                <div className="actions">
                  <button
                    onClick={() => {
                      setIsEditing(true);
                      setCurrentPlace(place);
                      setFormData({
                        ...place,
                      });
                      setShowModal(true);
                    }}
                  >
                    Edit
                  </button>
                  <button onClick={() => onDelete(place.id)}>Delete</button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default JobList;
