import React, { useEffect, useState } from 'react';
import './Places.scss';
import axiosClient from '../../axios-client';
import { useNavigate } from 'react-router-dom';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '300px',
};

const defaultCenter = { lat: 35.0116, lng: 135.7681 }; // Kyoto, Japan

const UserManagement = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPlace, setCurrentPlace] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    img_url: '',
    description: '',
    phone_number: '',
    location: '', 
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
      .get(`/places?page=${page}&per_page=10`)
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
      .delete(`/places/${placeId}`)
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
      img_url: '',
      description: '',
      phone_number: '',
      location: '', // Start with an empty location field
    });
    setIsEditing(false);
    setShowModal(true);
    setCurrentPlace(null);
  };

  const onSubmit = (ev) => {
    ev.preventDefault();

    const dataToSend = { ...formData };

    if (isEditing && currentPlace?.id) {
      axiosClient
        .put(`/places/${currentPlace.id}`, dataToSend)
        .then(({ data }) => {
          setPlaces(places.map((place) => (place.id === currentPlace.id ? data : place)));
          setShowModal(false);
        })
        .catch((err) => console.error('Error updating place:', err));
    } else {
      axiosClient
        .post('/places', dataToSend)
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
      <h1 className="user-Title">Place Management</h1>
      <button className="user-btn" onClick={AddPlace}>Add New Place</button>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{isEditing ? 'Edit Place' : 'Add New Place'}</h2>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(ev) => setFormData({ ...formData, name: ev.target.value })}
                placeholder="Enter place name"
              />
            </div>

            <div className="form-group">
              <label>Location (Click on map to select)</label>
              <input
                type="text"
                value={formData.location}
                readOnly
                placeholder="Location will be displayed here after map click"
              />
              {renderMap()}
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="text"
                value={formData.phone_number}
                onChange={(ev) => setFormData({ ...formData, phone_number: ev.target.value })}
                placeholder="Enter phone number"
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                value={formData.description}
                onChange={(ev) => setFormData({ ...formData, description: ev.target.value })}
                placeholder="Enter description"
              />
            </div>

            <div className="form-group">
              <label>Image URL</label>
              <input
                type="text"
                value={formData.img_url}
                onChange={(ev) => setFormData({ ...formData, img_url: ev.target.value })}
                placeholder="Enter image URL"
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
            // If the img_url is a relative URL, prepend the full base URL
            const imageUrl = place.img_url ? 
            (place.img_url.startsWith('http') ? place.img_url : `http://localhost:8000/${place.img_url}`) 
            : 'https://via.placeholder.com/150';
            return (
              <div key={place.id} className="user-card">
                <div>
                  <img
                    src={imageUrl}
                    alt={place.name || 'Amusement Place'}
                    style={{ width: '100%', height: 'auto' }}
                  />
                </div>
                <h3>{place.name}</h3>
                <p>Location: {place.location}</p>
                <p>Phone: {place.phone_number}</p>
                <div className="actions">
                  <button
                    onClick={() => {
                      setIsEditing(true);
                      setCurrentPlace(place);
                      setFormData({
                        ...place,
                        location: place.location,
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

export default UserManagement;
