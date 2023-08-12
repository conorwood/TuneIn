import { useState, useEffect } from "react"
import axios from "axios";
import './ReviewBox.css'
import stars from './stars.jpeg';

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

function AlbumRating() {
    return (
        <div className="albumRating">
            <h2>Rating: </h2>
            <img id="stars-placeholder" src={stars} alt="stars"></img>
        </div>
    )
}

export function ReviewBox ({ review, onReviewChange, onSaveReview, favTracks}) {
    return (
        <div className="reviewBox">
            <div className="review">
                <h2 id="review-header">Review: </h2>
                <textarea id="review-text" value={review} onChange={onReviewChange}></textarea>
                <button id='save-button' onClick={onSaveReview}>Save Review </button>
            </div>
            <AlbumRating />
            <FavoriteTracks favTracks={favTracks} />
        </div>
    )
}