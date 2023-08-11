import { useEffect, useState } from "react"
import axios from "axios"
import { LoginHeader } from "../LoginPage/LoginHeader";
import './ReviewsPage.css'
import { Link } from 'react-router-dom';

function ReviewPreview({albumName, albumId, reviewText}) {
    return (
        <div className="reviewPreview">
            <h2>{albumName}</h2>
            <p>{albumId}</p>
            <p>{reviewText}</p>
        </div>
    )
}

export default function ReviewsPage() {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/getReviews')
            .then((response) => {
                setReviews(response.data);
            })
            .catch((error) => {
                console.error(error);
            })
    }, []);

    return (
        <div className="reviewsPage">
            <LoginHeader />
            <div className="reviewsWrapper">
                <h1 id="header">Saved Reviews: </h1>
                <ul id="reviews" >
                    {reviews.map((review, idx) => (
                        <li key={idx}>
                            <Link to={`/album/${review.albumId}`} className='link'>
                                <ReviewPreview albumName={review.albumName} albumId={review.albumId} reviewText={review.reviewText} />
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}