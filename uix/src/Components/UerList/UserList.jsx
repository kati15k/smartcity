import React, { useEffect, useState } from 'react';
import './UserList.scss';
import axiosClient from '../../axios-client';
import { useParams, useNavigate } from 'react-router-dom';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  //const [notification, setNotifications] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: '' });
  const navigate = useNavigate();

  // Fetch users when the page changes
  useEffect(() => {
    console.log('useEffect: Current page:', currentPage);
    getUsers(currentPage);
  }, [currentPage]);

  const getUsers = (page) => {
    setLoading(true);
    console.log('getUsers: Fetching users for page:', page);

    axiosClient
      .get(`/users?page=${page}&per_page=10`)
      .then(({ data }) => {
        console.log('getUsers: Fetched users:', data);
        setUsers(data.data);
        setTotalPages(data.last_page);
        setLoading(false);
      })
      .catch((err) => {
        console.error('getUsers: Failed to fetch users:', err);
        setLoading(false);
      });
  };

  const onDelete = (userId) => {
    console.log("onDelete: Attempting to delete user with ID:", userId);
    if (!window.confirm("Are you sure you want to delete this user?")) {
      console.log("onDelete: User deletion cancelled.");
      return;
    }

    axiosClient
      .delete(`/users/${userId}`)
      .then(() => {
        console.log("onDelete: User deleted successfully.");
        setUsers(users.filter((user) => user.id !== userId));
      })
      .catch((err) => {
        console.error("onDelete: Failed to delete user:", err);
      });
  };

  const AddUser = () => {
    console.log("AddUser: Preparing to add a new user.");
    setFormData({ name: '', email: '', password: '', role: '' });
    setIsEditing(false);
    setShowModal(true);
    setCurrentUser(null);
  };

  const handlePageChange = (page) => {
    console.log("handlePageChange: Changing to page", page);
    setCurrentPage(page);
  };

  const renderPagination = () => {
    console.log('renderPagination: Rendering pagination for pages:', totalPages);
    let pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`pagination-btn ${i === currentPage ? 'active' : ''}`}
        >
          {i}
        </button>
      );
    }
    return <div className="pagination">{pageNumbers}</div>;
  };

  const onSubmit = (ev) => {
    ev.preventDefault();
    console.log('onSubmit: Form submitted with user data:', formData);

    if (currentUser && currentUser.id) {
      console.log('onSubmit: Editing user with ID:', currentUser.id);
      // If password is empty (on editing), remove it from the formData
      const updatedData = isEditing && !formData.password ? { ...formData, password: undefined } : formData;

      axiosClient
        .put(`/users/${currentUser.id}`, updatedData)
        .then(({ data }) => {
          console.log('onSubmit: User was successfully updated');
          // Update the user in the state immediately after editing
          setUsers(users.map((user) => (user.id === currentUser.id ? data : user)));
          setShowModal(false);
        })
        .catch((err) => {
          console.error('onSubmit: Error updating user:', err);
        });
    } else {
      console.log('onSubmit: Adding new user');
      axiosClient
        .post('/users', formData)
        .then(({ data }) => {
          console.log('onSubmit: User was successfully created');
          // Add the new user to the state immediately after creating
          const newUser = {
            id: data.id,
            name: formData.name,
            email: formData.email,
            role: formData.userrole,

            ...data
          };
          setUsers([newUser, ...users]);
          setShowModal(false);  // Close the modal
        })
        .catch((err) => {
          console.error('onSubmit: Error creating user:', err);
        });
    }
  };

  const closeModal = () => {
    console.log('closeModal: Closing modal');
    setShowModal(false);
    setCurrentUser(null);
  };

  return (
    <div className="user-container">
      <div style={{ height: '90px' }} />
      <h1 className="user-Title">User Management</h1>
      <button className="user-btn" onClick={AddUser}>Add New User</button>
      <div style={{ height: '20px' }} />
      {loading ? (
        <p>Loading users...</p>
      ) : users.length > 0 ? (
        <>
          <div className="user-grid">
            {users.map((user) => (
              <div key={user.id} className="user-card">
                <div className="info">
                  <h3>{user.name}</h3>
                  <p>Email: {user.email}</p>
                  <p>Role: {user.userrole}</p>
                </div>
                <div className="actions flex">
                  <button
                    className="user-btn"
                    onClick={() => {
                      console.log('Edit button clicked for user:', user);
                      setCurrentUser(user);
                      setFormData({ name: user.name, email: user.email, role: user.userrole });
                      setIsEditing(true);
                      setShowModal(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="user-btn delete"
                    onClick={() => onDelete(user.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {renderPagination()}
        </>
      ) : (
        <p>No users found.</p>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{isEditing ? 'Edit User' : 'Add New User'}</h2>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={(ev) => {
                  console.log('Name input changed:', ev.target.value);
                  setFormData({ ...formData, name: ev.target.value });
                }}
                placeholder="Enter user name"
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={(ev) => {
                  console.log('Email input changed:', ev.target.value);
                  setFormData({ ...formData, email: ev.target.value });
                }}
                placeholder="Enter user email"
              />
            </div>
            <div className="form-group">
              <label>Role</label>
              <input
                type="text"
                name="userrole"
                value={formData.userrole}
                
                onChange={(ev) => {
                  console.log('Role input changed:', ev.target.value);
                  setFormData({ ...formData, userrole: ev.target.value });
                }}
                placeholder="Enter user role"
              />
            </div>

            {!isEditing && (
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={(ev) => {
                    console.log('Password input changed:', ev.target.value);
                    setFormData({ ...formData, password: ev.target.value });
                  }}
                  placeholder="Enter user password"
                />
              </div>
            )}

            <div className="modal-actions flex">
              <button className="user-btn" onClick={onSubmit}>
                {isEditing ? 'Save' : 'Add User'}
              </button>
              <button className="user-btn delete" onClick={closeModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
