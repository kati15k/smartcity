import React, { useEffect, useState } from "react";
import axiosClient from "../../axios-client";
import { BsArrowRightShort, BsHeart, BsHeartFill } from "react-icons/bs"; // Import heart icons for favorites
import { useNavigate } from "react-router-dom";
import './JobsList.scss';

const JobsList = () => {
  // State to hold jobs and pagination info
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState(""); 
  const [sortOrder, setSortOrder] = useState("asc"); 
  const [favorites, setFavorites] = useState([]); 

  const navigate = useNavigate();

  // Fetch jobs data when component mounts or when page changes
  useEffect(() => {
    setLoading(true);
    axiosClient
      .get(`/jobs?page=${currentPage}`)
      .then(({ data }) => {
        setJobs(data.data);
        setTotalPages(data.total_pages);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
        setLoading(false);
      });
  }, [currentPage]);

  // Handle pagination
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prevPage) => prevPage + 1);
  };

  // Handle click on a job card
  const handleCardClick = (id) => {
    if (id) {
      navigate(`/info/jobs/${id}`);
    } else {
      console.error("Job ID is undefined");
    }
  };

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Handle sorting
  const handleSortChange = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  // Toggle favorite status
  const handleFavoriteToggle = (id) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(id)) {
        return prevFavorites.filter((favoriteId) => favoriteId !== id);
      } else {
        return [...prevFavorites, id];
      }
    });
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

  // Filter jobs based on search query
  const filteredJobs = jobs.filter(
    (job) =>
      job.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.position.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort jobs based on the selected order
  const sortedJobs = filteredJobs.sort((a, b) => {
    if (sortOrder === "asc") {
      return a.position.localeCompare(b.position);
    } else {
      return b.position.localeCompare(a.position);
    }
  });

  return (
    <section className="job section popular">
      <div className="jobContainer">
        <div style={{ height: "90px" }}></div>
        <div className="jobHeader flex">
          <div
            data-aos="fade-right"
            data-aos-duration="2500"
            className="job-Div"
          >
            <h2 className="jobTitle">Available Job Listings</h2>

            {/* Search bar */}
            <input
              type="text"
              placeholder="Search jobs..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="search-bar"
            />
            {/* Sort button */}
            <button onClick={handleSortChange} className="sort-btn">
              Sort by Position ({sortOrder === "asc" ? "Ascending" : "Descending"})
            </button>
          </div>
        </div>

        <div className="jobContent grid">
          {loading ? (
            <p>Loading jobs...</p>
          ) : sortedJobs.length > 0 ? (
            sortedJobs.map((job) => {
              const { id, name, position, job_link, location = "Kyoto, Japan" } = job;
              const isFavorite = favorites.includes(id);
              return (
                <div
                  key={id}
                  data-aos="fade-up"
                  className="singleJob card"
                  onClick={() => handleCardClick(id)}
                >
                  <div className="job-Content">
                    <h3 className="job-Post">{position}</h3>
                    <p className="job-Position">{name}</p>
                    <span
                      onClick={() => handleCardClick(id)}
                      className="job-Link"
                    >
                      <BsArrowRightShort className="icons1" />
                      {job_link ? "Learn More" : "No Link Available"}
                    </span>
                    <div className="job-Location">
                      <h6>Location: {location}</h6>
                    </div>
                    {/* Favorite button */}
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFavoriteToggle(id);
                      }}
                      className="favorite-btn"
                    >
                      <button className="favorite-button">
                        {isFavorite ? <BsHeartFill /> : <BsHeart />}
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleShare(id, name);
                        }}
                        className="share-button"
                      >
                        Share
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p>No jobs found.</p>
          )}
        </div>

        {/* Pagination Controls */}
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

export default JobsList;
