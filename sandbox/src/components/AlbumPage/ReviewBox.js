import { useState, useEffect } from "react"
import axios from "axios";
import './ReviewBox.css'

export function ReviewBox ({ review, onReviewChange, onSaveReview }) {
 /*   const [review, setReview] = useState('');

     const handleReviewChange = (event) => {
        setReview(event.target.value);
    } 

    const handleSaveReview = () => {
        if (!review) {
            return;
        }

        const reviewData = { 
            reviewText: review,
            albumName: albumName
        };

        axios.post('localhost:8080/submitReview', reviewData)
            .then((response) => {
                window.alert('Review saved!');
            })
            .catch((error) => {
                console.error('Error saving: ', error);
            })
    }; */

    return (
        <div className="reviewBox">
            <h2>Write a Review: </h2>
            <textarea id="review-text" value={review} onChange={onReviewChange}></textarea>
            <button id='save-button' onClick={onSaveReview}>Save Review </button>
        </div>
    )
}