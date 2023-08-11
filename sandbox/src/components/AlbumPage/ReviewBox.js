import { useState, useEffect } from "react"
import axios from "axios";
import './ReviewBox.css'

function FavoriteTracks({ favTracks }) {
    return (
        <div className="favTracks">
            <h2>Favorite Tracks:</h2>
            {favTracks.length > 0 ? (
                <ul>
                    {favTracks.map((track, idx) => (
                        <li key={idx}>{track}</li>
                    ))}
                </ul>
            ) : (
                <p>No favorite tracks selected yet.</p>
            )}
        </div>
    );
}

export function ReviewBox ({ review, onReviewChange, onSaveReview, favTracks}) {
    return (
        <div className="reviewBox">
            <h2 id="review-header">Write a Review: </h2>
            <textarea id="review-text" value={review} onChange={onReviewChange}></textarea>
            <button id='save-button' onClick={onSaveReview}>Save Review </button>
            <FavoriteTracks favTracks={favTracks} />
        </div>
    )
}