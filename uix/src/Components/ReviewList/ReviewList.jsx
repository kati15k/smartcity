import React, { useEffect, useState } from 'react';
import './ReviewList.css';
import axiosClient from '../../axios-client';

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch reviews when the page changes
  useEffect(() => {
    console.log('useEffect: Fetching reviews for page:', currentPage);
    getReviews(currentPage);
  }, [currentPage]);

  const getReviews = (page) => {
    setLoading(true);
    axiosClient
      .get(`/reviews?page=${page}`)
      .then(({ data }) => {
        console.log('getReviews: Successfully fetched reviews:', data);
        if (data && Array.isArray(data.data)) {
          setReviews(data.data);
          setTotalPages(data.meta?.total_pages || 1);
        } else {
          console.error('getReviews: Invalid data structure:', data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('getReviews: Error fetching reviews:', err);
        setLoading(false);
      });
  };

  const onDelete = (id) => {
    console.log('onDelete: Attempting to delete review with ID:', id);
    if (!id) {
      console.error('onDelete: Missing review ID.');
      return;
    }

    if (!window.confirm('Are you sure you want to delete this review?')) {
      console.log('onDelete: Deletion canceled by user.');
      return;
    }

    axiosClient
      .delete(`/reviews/${id}`)
      .then(() => {
        console.log('onDelete: Review deleted successfully. ID:', id);
        setReviews(reviews.filter((review) => review.id !== id));
      })
      .catch((err) => {
        console.error('onDelete: Error deleting review with ID:', id, err);
      });
  };

  const handlePageChange = (page) => {
    console.log('handlePageChange: Switching to page:', page);
    setCurrentPage(page);
  };

  const renderPagination = () => {
    console.log('renderPagination: Total pages:', totalPages);
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

  return (
    <div className="review-container">
      <div style={{ height: '90px' }} />
      <h1 className="review-Title">Review Management</h1>
      <div style={{ height: '20px' }} />

      {loading ? (
        <p>Loading reviews...</p>
      ) : reviews.length > 0 ? (
        <>
          <div className="review-grid">
            {reviews.map((review) => {
              console.log('Rendering review with ID:', review.id);
              if (!review.id) {
                console.error('Rendering error: Review missing ID:', review);
                return null;
              }
              return (
                <div key={review.id} className="review-card">
                  <div className="info">
                    <h3>{review.content}</h3>
                  </div>
                  <div className="actions flex">
                    <button
                      className="user-btn delete"
                      onClick={() => {
                        console.log('Delete button clicked for review ID:', review.id);
                        onDelete(review.id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {renderPagination()}
        </>
      ) : (
        <p>No reviews found.</p>
      )}
    </div>
  );
};

export default ReviewList;
