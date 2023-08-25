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
                        <li key={idx}>
                            {track}
                            <button>-</button> 
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No favorite tracks selected yet.</p>
            )}
        </div>
    );
}

function AlbumRating() {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    return (
        <div className="albumRating">
            <h1>Rating: </h1>
            {[...Array(5)].map((star, index) => {
                index += 1;
                return (
                    <button
                        id="star-button"
                        type="button"
                        key={index}
                        className={index <= (hover || rating) ? "on" : "off"}
                        onClick={() => setRating(index)}
                        onMouseEnter={() => setHover(index)}
                        onMouseLeave={() => setHover(rating)}
                    >
                        <span className="star">&#9733;</span>
                    </button>
                );
            })}
            <h2>{rating} / 5</h2>
        </div>
    );
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