import React, { useEffect, useState } from 'react';
import './List.scss';
import axiosClient from '../../axios-client';
import { useNavigate } from 'react-router-dom';

const CompanyList = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPlace, setCurrentPlace] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    image_path: '',
    position: '',
    size: '',
    description: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    getPlaces(currentPage);
  }, [currentPage]);

  const getPlaces = (page) => {
    setLoading(true);
    axiosClient
      .get(`/companies_list?page=${page}&per_page=10`)
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
      .delete(`/companies_list/${placeId}`)
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
      location: '',
      image_path: '',
      position: '',
      size: '',
      description: '',
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
        .put(`/companies_list/${currentPlace.id}`, dataToSend)
        .then(({ data }) => {
          setPlaces(places.map((place) => (place.id === currentPlace.id ? data : place)));
          setShowModal(false);
        })
        .catch((err) => console.error('Error updating place:', err));
    } else {
      axiosClient
        .post('/companies_list', dataToSend)
        .then(({ data }) => {
          setPlaces([{ ...data, ...formData }, ...places]);
          setShowModal(false);
        })
        .catch((err) => console.error('Error creating place:', err));
    }
  };

  return (
    <div className="user-container">
      <h1 className="user-Title">Academic Places Management</h1>
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
              <label>Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(ev) => setFormData({ ...formData, location: ev.target.value })}
                placeholder="Enter location"
              />
            </div>

            <div className="form-group">
              <label>Image Path</label>
              <input
                type="text"
                value={formData.image_path}
                onChange={(ev) => setFormData({ ...formData, image_path: ev.target.value })}
                placeholder="Enter image path"
              />
            </div>

            <div className="form-group">
              <label>Position</label>
              <input
                type="text"
                value={formData.position}
                onChange={(ev) => setFormData({ ...formData, position: ev.target.value })}
                placeholder="Enter position"
              />
            </div>

            <div className="form-group">
              <label>Size</label>
              <input
                type="text"
                value={formData.size}
                onChange={(ev) => setFormData({ ...formData, size: ev.target.value })}
                placeholder="Enter size"
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
          {places.map((place) => (
            <div key={place.id} className="user-card">
              <div>
                <img
                  src={place.image_path ? place.image_path : 'https://via.placeholder.com/150'}
                  alt={place.name || 'Place'}
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
              <h3>{place.name}</h3>
              <p>Location: {place.location}</p>
              <p>Position: {place.position}</p>
              <p>Size: {place.size}</p>
              <p>Description: {place.description}</p>
              <div className="actions">
                <button
                  onClick={() => {
                    setIsEditing(true);
                    setCurrentPlace(place);
                    setFormData(place);
                    setShowModal(true);
                  }}
                >
                  Edit
                </button>
                <button onClick={() => onDelete(place.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompanyList;
