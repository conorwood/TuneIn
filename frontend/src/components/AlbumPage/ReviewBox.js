import { useState, useEffect } from "react"
import axios from "axios";
import './ReviewBox.css'
import stars from './stars.jpeg';

function FavoriteTracks({ favTracks, onDeleteFavoriteTrack }) {

    return (
        <div className="w-1/3 text-2xl">
            <h2>Favorite Tracks:</h2>
            {favTracks.length > 0 ? (
                <ul>
                    {favTracks.map((track, idx) => (
                        <li className='flex items-center justify-center' key={idx}>
                            {track}
                            <button onClick={() => onDeleteFavoriteTrack(track)} className="bg-transparent text-black cursor-pointer ml-3 transition ease-in-out duration-300 transform hover:text-red-600 hover:scale-110">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" data-slot="icon" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </button> 
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No favorite tracks selected yet.</p>
            )}
        </div>
    );
}

function AlbumRating({rating, setRating}) {
 /*    const [rating, setRating] = useState(0); */
    const [hover, setHover] = useState(0); 

    const handleStarClick = (index) => {
        setRating(index);
    }

    return (
        <div className="flex-1 text-2xl">
            <h1>Rating: </h1>
            {[...Array(5)].map((star, index) => {
                index += 1;
                return (
                    <button
                        id="star-button"
                        type="button"
                        key={index}
                        className={index <= (hover || rating) ? "text-white" : "text-neutral-800"}
                        onClick={() => handleStarClick(index)}
                        onMouseEnter={() => setHover(index)}
                        onMouseLeave={() => setHover(rating)}
                    >
                        <span className="text-5xl">&#9733;</span>
                    </button>
                );
            })}
            <h2>{rating} / 5</h2>
        </div>
    );
}

export function ReviewBox ({ review, onReviewChange, onSaveReview, favTracks, handleDeleteFavoriteTrack, rating, setRating, onCancelReview}) {
    return (
        <div className="flex w-5/6 bg-gray-400 justify-between rounded-xl p-3 mx-auto mb-5 mt-5">
            <button onClick={onCancelReview} className="self-start transition ease-in-out duration-300 transform hover:text-red-600 hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" dataSlot="icon" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
            </button>
            <div className="flex flex-col w-2/5 ml-3">
                <h2 className="self-start text-2xl mb-1">Review: </h2>
                <textarea className="w-full h-36 self-start text-xl resize-none rounded-sm bg-slate-50" value={review} onChange={onReviewChange}></textarea>
                <button className="bg-white rounded-2xl w-1/3 self-center m-3 text-xl p-1 cursor-pointer transition duration-300 ease-in-out transform hover:bg-blue-700" onClick={onSaveReview}>Save Review </button>
            </div>
            <AlbumRating rating={rating} setRating={setRating}/>
            <FavoriteTracks favTracks={favTracks} onDeleteFavoriteTrack={handleDeleteFavoriteTrack}/>
        </div>
    )
}