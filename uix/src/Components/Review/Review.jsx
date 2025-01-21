import React, { useEffect, useState } from "react";
import "./Review.scss"; // Make sure to import the SCSS file
import axiosClient from "../../axios-client";

const Review = () => {
    // Use useState for setting state variables
    const [review, setReview] = useState([]); // State to store reviews
    const [reviewText, setReviewText] = useState(""); // State for the input value



    const AddReview = () => {
        // Send review (can be empty)
        
        axiosClient.post(`/info`, { review: reviewText })
            .then((data) => {
                console.log('AddReview: Review was successfully created');
                setReview([...review, data.data]); // Add new review to state
                setReviewText(""); // Clear the input field after submitting
            })
            .catch((err) => {
               // console.error('AddReview: Error creating review:', err);
            });
    };

    return (
        <div className="reviewCard">
            <div className="reviewDiv">
                <input
                    type="text"
                    value={reviewText} // Bind the value to the state
                    onChange={(e) => setReviewText(e.target.value)} // Update state on input change
                    placeholder="Enter Your Review..."
                />
            </div>
            <button className="btn" onClick={AddReview}>
                Submit
            </button>
        </div>
    );
};

export default Review;
