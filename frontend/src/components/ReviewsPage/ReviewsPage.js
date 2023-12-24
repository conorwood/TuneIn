import { useEffect, useState } from "react"
import axios from "axios"
import { LoginHeader } from "../LoginPage/LoginHeader";
import './ReviewsPage.css'
import { Link } from 'react-router-dom';
import NavBar from '../NavBar/NavBar'
import { UserAuth } from "../../context/AuthContext";

function ReviewPreview({albumName, albumId, reviewText, coverArtUrl, favoriteTracks}) {
    return (
        <div className="flex items-stretch w-full text-white divide-x" review-album-id={albumId}>
            <div className="flex flex-col items-center">
                <h2 className="text-4xl mb-3">{albumName}</h2>
                <img className="max-h-96 rounded-lg" alt="Album Cover Art" src={coverArtUrl}></img>
            </div>
            <div className="flex flex-col items-center ml-6 p-4 w-1/3">
                <h2 className="text-3xl font-semibold">Review:</h2>
                <p>{reviewText}</p>
            </div>
            <div className="flex flex-col items-center ml-6 p-4">
                <h2 className="text-3xl font-semibold" >Favorite Tracks:</h2>
                <ul id="previewFavoriteTracks">
                    {favoriteTracks.map((track, idx) => (
                        <li key={idx}>
                            {track}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default function ReviewsPage() {
    const [reviews, setReviews] = useState([]);
    const { user } = UserAuth();

    useEffect(() => {
        if (user.accessToken) {
            const headers = {
                'Authorization': `Bearer ${user.accessToken}`,
            };
    
            axios.get(`http://localhost:8080/review/getUserReviews`, { headers: headers })
                .then((response) => {
                    setReviews(response.data);
                })
                .catch((error) => {
                    console.error(error);
                })
        }
    }, [user]);


    const handleDeleteReview = (id) => {
        //const Id = event.currentTarget.getAttribute('review-album-id');

        axios.delete(`http://localhost:8080/review/deleteReview?albumId=${id}`)
            .then((response) => {
                setReviews((prevReviews) => prevReviews.filter((review) => review.albumId !== id));
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div className="reviewsPage">
            <NavBar />
            <div className="reviewsWrapper">
                <h1 className="text-white font-semibold text-5xl text-start m-5">Reviews: </h1>
                <ul id="reviews" >
                    {reviews.map((review, idx) => (
                        <li className="m-10 flex bg-gray-800 w-4/5 p-3 relative rounded-lg" key={idx}>
                            <ReviewPreview albumName={review.albumName} albumId={review.albumId} reviewText={review.reviewText} coverArtUrl={review.coverArtUrl} favoriteTracks={review.favoriteSongs} handleDeleteReview={handleDeleteReview}/>
                            <div className="flex flex-col items-center mx-auto justify-center">
                                <button className="flex w-full rounded-2xl bg-gray-100 text-neutral-800 p-4 text-center transition ease-in-out duration-300 hover:scale-110 hover:bg-red-700" onClick={() => handleDeleteReview(review.albumId)} review-album-id={review.albumId}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-3">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                    Delete Review
                                </button>
                                <Link className="m-4 w-full" to={`/album/${review.albumId}`}>
                                    <button className="mx-auto w-full flex rounded-2xl bg-gray-100 text-neutral-800 p-4 text-center transition ease-in-out duration-300 hover:scale-110 hover:bg-blue-700" review-album-id={review.albumId}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-3">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                        </svg>
                                        Edit Review
                                    </button>
                                </Link>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}