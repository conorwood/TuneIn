import { useEffect, useState } from "react"
import axios from "axios"
import { LoginHeader } from "../LoginPage/LoginHeader";
import './ReviewsPage.css'
import { Link } from 'react-router-dom';

function ReviewPreview({albumName, albumId, reviewText, coverArtUrl, favoriteTracks}) {
    return (
        <div className="reviewPreview" review-album-id={albumId}>
            <h2>{albumName}</h2>
            <img src={coverArtUrl}></img>
            <p>{reviewText}</p>
            <ul id="previewFavoriteTracks">
                {favoriteTracks.map((track, idx) => (
                    <li key={idx}>
                        {track}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default function ReviewsPage() {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/review/getReviews')
            .then((response) => {
                setReviews(response.data);
            })
            .catch((error) => {
                console.error(error);
            })
    }, []);


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
            <LoginHeader />
            <div className="reviewsWrapper">
                <h1 id="header">Saved Reviews: </h1>
                <ul id="reviews" >
                    {reviews.map((review, idx) => (
                        <li key={idx}>
                            <Link to={`/album/${review.albumId}`} className='link'>
                                <ReviewPreview albumName={review.albumName} albumId={review.albumId} reviewText={review.reviewText} coverArtUrl={review.coverArtUrl} favoriteTracks={review.favoriteSongs} handleDeleteReview={handleDeleteReview}/>
                            </Link>
                            <button className="deleteReviewButton" onClick={() => handleDeleteReview(review.albumId)} review-album-id={review.albumId}>
                                Delete Review 
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}